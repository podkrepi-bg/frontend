import { act, renderHook } from '@testing-library/react'
import {
  CampaignApplicationExisting,
  CampaignApplicationRequest,
  CreateCampaignApplicationResponse,
} from 'gql/campaign-applications'
import { Person } from 'gql/person'
import { rest } from 'msw'
import { startResponseHandler } from 'test/response-handler/response-handler'
import { useCreateOrEditApplication } from '../../service/campaign-application'
import { Providers as AllTheProviders } from '../test-utils'
import { isPromise } from 'formik'
import { SetupServer } from 'msw/node'
import { ApiErrors } from 'service/apiErrors'

describe('Campaign application create or update logic', () => {
  let server: SetupServer
  let requests: string[]

  beforeEach(() => {
    ;[server, requests] = startResponseHandler()
  })
  afterEach(() => {
    if (typeof server?.close === 'function') {
      server.close()
    }
  })

  test('should be called and return the initial state and the create or edit function', () => {
    const { result } = setup()
      .withPerson({
        firstName: 'test',
        lastName: 'm',
        phone: '01234569',
        email: 'test@test.com',
      })
      .run()
    expect(result?.current).toBeDefined()

    const {
      createOrUpdateSuccessful: applicationCreated,
      submitting,
      campaignApplicationResult,
      initialValues,
      uploadedFiles,
      deletedFiles,
      error,
      files,
      setFiles,
      createOrUpdateApplication,
    } = result.current

    expect(applicationCreated).toBe(false)
    expect(campaignApplicationResult).not.toBeDefined()
    expect(submitting).toBe(false)
    expect(uploadedFiles).toEqual({ successful: [], failed: [] })
    expect(deletedFiles).toEqual({ successful: [], failed: [] })
    expect(error).not.toBeDefined()
    expect(files).toEqual([])
    expect(typeof setFiles === 'function').toBe(true)
    expect(typeof createOrUpdateApplication === 'function').toBe(true)
    expect(initialValues).toEqual({
      applicationBasic: {
        beneficiaryNames: '',
        campaignEnd: 'funds',
        campaignEndDate: undefined,
        campaignType: '',
        funds: 0,
        title: '',
      },
      applicationDetails: {
        cause: '',
        currentStatus: '',
        description: '',
        organizerBeneficiaryRelationship: undefined,
      },
      organizer: {
        acceptTermsAndConditions: false,
        email: 'test@test.com',
        name: 'test m',
        personalInformationProcessingAccepted: false,
        phone: '01234569',
        transparencyTermsAccepted: false,
      },
    })
  })

  test('when create called it should call the create mutation and fill in applicationCreated and campaignApplicationResult state', async () => {
    // arrange
    server.use(handleCreate({ campaignName: 'test' }))
    const { result } = setup()
      .withPerson({
        firstName: 'test',
        lastName: 'm',
        phone: '01234569',
        email: 'test@test.com',
      })
      .run()

    // act
    await act(async () => result.current.createOrUpdateApplication({}))

    // assert
    expect(requests).toEqual(['POST http://localhost/api/campaign-application/create {}'])

    expect(result.current.error).not.toBeDefined()
    expect(result.current.createOrUpdateSuccessful).toBe(true)
    expect(result.current.submitting).toBe(false)
    expect(result.current.campaignApplicationResult).toEqual({
      campaignName: 'test',
      id: '1234',
    })
  })

  test('when create called multiple times it should only call the create mutation once', async () => {
    // arrange
    let resolveCampaign: (c: Partial<CreateCampaignApplicationResponse>) => void = () => {
      return
    }
    const responsePromise = new Promise<Partial<CreateCampaignApplicationResponse>>((res) => {
      resolveCampaign = res
    })
    server.use(handleCreate(responsePromise))
    const { result } = setup().run()

    const createPromise: Promise<CampaignApplicationRequest | undefined>[] = []
    // act
    await act(() => createPromise.push(result.current.createOrUpdateApplication({})))

    expect(result.current.submitting).toBe(true)
    await act(() => createPromise.push(result.current.createOrUpdateApplication({})))

    resolveCampaign({ id: '42' })
    await act(() => Promise.all(createPromise))
    expect(result.current.submitting).toBe(false)
    // assert
    expect(requests.length).toBe(1) // only one request sent
    expect(requests).toEqual(['POST http://localhost/api/campaign-application/create {}'])
  })

  test('when create called and an error occurs it should convey that via the error state and then clear it up when create called again', async () => {
    // arrange
    server.use(
      handleCreateError({
        error: '',
        message: [
          {
            property: 't',
            constraints: { test: 'error in the test' },
          },
        ],
        statusCode: 1,
      }),
    )
    const { result } = setup().run()

    // act
    await act(() => result.current.createOrUpdateApplication({}))

    // assert
    expect(result.current.error).toEqual(['error in the test'])
    expect(result.current.submitting).toBe(false)

    // act  clean up error on a new attempt
    server.use(handleCreate({}))
    await act(() => result.current.createOrUpdateApplication({}))
    expect(result.current.error).not.toBeDefined()
  })

  test('when create called and files added it should call the uploadFiles mutation as many times as there are files and fill in the files upload result', async () => {
    // arrange
    server.use(handleCreate({ campaignName: 'test' }))
    server.use(handleFileUpload)
    const { result } = setup().run()
    await act(() => result.current.setFiles([new File([], '123.txt'), new File([], '456.txt')]))

    // act
    await act(async () => result.current.createOrUpdateApplication({}))

    // assert
    expect(requests).toEqual([
      'POST http://localhost/api/campaign-application/create {}',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
    ])
    expect(result.current.uploadedFiles).toEqual({
      failed: [],
      successful: ['123.txt', '456.txt'],
    })
  })

  test('when create called and files added it should call the uploadFiles mutation as many times as there are files and fill in the files upload result including failed ones', async () => {
    // arrange
    server.use(handleCreate({ campaignName: 'test' }))
    let fileCount = 0
    server.use(
      handleFileUploadWith((req, res, ctx) => {
        fileCount += 1
        return res(ctx.status(fileCount > 1 ? 400 : 200), ctx.json({}))
      }),
    )
    const { result } = setup().run()
    await act(() => result.current.setFiles([new File([], '123.txt'), new File([], '456.txt')]))

    // act
    await act(async () => result.current.createOrUpdateApplication({}))

    // assert
    expect(requests).toEqual([
      'POST http://localhost/api/campaign-application/create {}',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
    ])
    expect(result.current.uploadedFiles).toEqual({
      failed: ['456.txt'],
      successful: ['123.txt'],
    })
  })

  test('when update called and isEdit it should call the edit mutation and fill in applicationCreated and campaignApplicationResult state', async () => {
    // arrange
    server.use(handleEdit({ campaignName: 'test' }))
    const { result } = setup()
      .withCampaignApplication({
        id: '4321',
        beneficiary: 'test bene',
      })
      .withIsEdit(true)
      .run()

    // act
    await act(async () => result.current.createOrUpdateApplication({}))

    // assert
    expect(requests).toEqual(['PATCH http://localhost/api/campaign-application/4321 {}'])

    expect(result.current.createOrUpdateSuccessful).toBe(true)
    expect(result.current.submitting).toBe(false)
    expect(result.current.campaignApplicationResult).toEqual({
      campaignName: 'test',
      id: '1234',
    })
  })

  test.only('when edit called and files added and removed it should call the uploadFiles/deleteFiles mutation as many times as there are files and fill in the files upload/deleted result including failed ones', async () => {
    // arrange
    server.use(handleEdit())

    let fileCount = 0
    server.use(
      handleFileUploadWith((req, res, ctx) => {
        fileCount += 1
        return res(ctx.status(fileCount > 1 ? 400 : 200), ctx.json({}))
      }),
    )
    let deleteFileCount = 0
    server.use(
      handleFileDeleteWith((req, res, ctx) => {
        deleteFileCount += 1
        return res(ctx.status(deleteFileCount > 1 ? 400 : 200), ctx.json({}))
      }),
    )
    const { result } = setup()
      .withCampaignApplication({
        id: '1234',
        documents: [
          { filename: 'my.txt', id: 'my' },
          { filename: 'my1.txt', id: 'my1' },
        ],
      })
      .withIsEdit(true)
      .run()

    await act(() =>
      result.current.setFiles([
        new File(['my file'], '123.txt'),
        new File(['your file'], '456.txt'),
      ]),
    )

    // act
    await act(async () => result.current.createOrUpdateApplication({}))

    // assert
    expect(requests).toEqual([
      'PATCH http://localhost/api/campaign-application/1234 {}',
      'DELETE http://localhost/api/campaign-application/fileById/my ',
      'DELETE http://localhost/api/campaign-application/fileById/my1 ',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
      'POST http://localhost/api/campaign-application/uploadFile/1234 ',
    ])
    expect(result.current.uploadedFiles).toEqual({
      failed: ['456.txt'],
      successful: ['123.txt'],
    })
    expect(result.current.deletedFiles).toEqual({
      failed: ['my1.txt'],
      successful: ['my.txt'],
    })
  })
})

function setup() {
  let person: Person
  let campaignApplication: CampaignApplicationExisting
  let isEdit = false

  const runner = {
    withCampaignApplication(c: Partial<CampaignApplicationExisting>) {
      campaignApplication = c as CampaignApplicationExisting
      return runner
    },
    withPerson(p: Partial<Person>) {
      person = p as Person
      return runner
    },
    withIsEdit(is: boolean) {
      isEdit = is
      return runner
    },
    default() {
      return runner
    },
    run() {
      return renderHook(
        () =>
          useCreateOrEditApplication({
            person,
            campaignApplication,
            isEdit,
          }),
        {
          wrapper: AllTheProviders,
        },
      )
    },
  }

  return runner
}

export const handleCreate = (
  response:
    | Partial<CreateCampaignApplicationResponse>
    | Promise<Partial<CreateCampaignApplicationResponse>>,
) =>
  rest.post('**/campaign-application/create', async (req, res, ctx) => {
    const r = {
      id: '1234',
      ...(isPromise(response) ? await response : response),
    }

    return res(ctx.status(200, 'ok'), ctx.json(r))
  })

export const handleCreateError = (response: ApiErrors) =>
  rest.post('**/campaign-application/create', async (req, res, ctx) => {
    return res(ctx.status(400, 'Not ok'), ctx.json(response))
  })

export const handleFileUpload = rest.post(
  '**/campaign-application/uploadFile/**',
  async (req, res, ctx) => res(ctx.status(200, 'ok'), ctx.json({})),
)

export const handleFileUploadWith = (handler: Parameters<typeof rest.post>[1]) =>
  rest.post('**/campaign-application/uploadFile/**', handler)

export const handleFileDeleteWith = (handler: Parameters<typeof rest.delete>[1]) =>
  rest.delete('**/campaign-application/fileById/**', handler)

export const handleEdit = (
  response:
    | Partial<CreateCampaignApplicationResponse>
    | Promise<Partial<CreateCampaignApplicationResponse>> = {},
) =>
  rest.patch('**/campaign-application/**', async (req, res, ctx) => {
    const r = {
      id: '1234',
      ...(isPromise(response) ? await response : response),
    }

    return res(ctx.status(200, 'ok'), ctx.json(r))
  })
