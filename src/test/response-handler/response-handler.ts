import { DefaultBodyType, MockedRequest, rest } from 'msw'
import { setupServer } from 'msw/node'

export const defaultHandlers = [
  // me
  rest.post('**/me', (req, res, ctx) => {
    return res(
      ctx.status(200, 'ok'),
      ctx.json({
        status: 'authenticated',
        person: {
          id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
          firstName: 'John',
          lastName: 'Maverick',
          email: 'john@podkrepi.bg',
          phone: '01234567',
          newsletter: false,
          address: 'string',
          emailConfirmed: true,
        },
      }),
    )
  }),
]

/**
 * Starts the mock response handler.
 *
 * I M P O R T A N T - clean up the server after use (afterEach)
 * @param handlers
 * @returns a tuple of 3 - [SetupServer, string[], Array<Events of request:start>]
 */
export function startResponseHandler(handlers: typeof defaultHandlers = []) {
  const server = setupServer(...defaultHandlers, ...handlers)

  server.listen()

  const rawEvents: MockedRequest<DefaultBodyType>[] = []
  const urlMethodAndBody: string[] = []
  server.events.on('request:start', async (e) => {
    rawEvents.push(e)
    urlMethodAndBody.push(`${e.method} ${e.url.toString()} ${await e.text().catch(() => '')}`)
  })

  return [server, urlMethodAndBody, rawEvents] as const
}
