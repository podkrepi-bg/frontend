import { act, renderHook } from '@testing-library/react'
import {
  CampaignApplicationExisting,
  CreateCampaignApplicationResponse,
} from 'gql/campaign-applications'
import { Person } from 'gql/person'
import { rest } from 'msw'
import { startResponseHandler } from 'test/response-handler/response-handler'
import { useCreateOrEditApplication } from '../../service/campaign-application'
import { Providers as AllTheProviders } from '../test-utils'

describe('Campaign application create or update logic', () => {
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
      applicationCreated,
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

  test('when create called it should call the create mutation', async () => {
    // arrange
    const [requests] = startResponseHandler([handleCreate({ campaignName: 'test' })])
    const { result } = setup()
      .withPerson({
        firstName: 'test',
        lastName: 'm',
        phone: '01234569',
        email: 'test@test.com',
      })
      .run()

    // act
    await act(() => result.current.createOrUpdateApplication({}, []))

    // assert
    expect(requests).toEqual(['POST http://localhost/api/campaign-application/create {}'])

    expect(result.current.error).not.toBeDefined()
    expect(result.current.applicationCreated).toBe(true)
    expect(result.current.submitting).toBe(false)
    expect(result.current.campaignApplicationResult).toEqual({
      campaignName: 'test',
      id: '1234',
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

export const handleCreate = (response: Partial<CreateCampaignApplicationResponse>) =>
  rest.post('**/campaign-application/create', (req, res, ctx) => {
    const r = {
      id: '1234',
      ...response,
    }

    return res(ctx.status(200, 'ok'), ctx.json(r))
  })
