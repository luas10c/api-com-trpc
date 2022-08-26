import express from 'express'
import * as trpc from '@trpc/server/adapters/express'
import { expressHandler } from 'trpc-playground/handlers/express'
import './dotenv'

import routes from './routes'

async function bootstrap() {
  const app = express()
  app.use(express.json())
  app.use(
    '/trpc',
    trpc.createExpressMiddleware({
      router: routes
    })
  )
  app.use(
    '/playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/',
      router: routes
    })
  )

  const PORT = process.env.PORT || 4800

  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

bootstrap()
