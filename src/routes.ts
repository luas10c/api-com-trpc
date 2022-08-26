import * as trpc from '@trpc/server'
import { randomUUID } from 'crypto'
import zod from 'zod'

const database = new Map()

database.set('users', [])

const routes = trpc
  .router()
  .query('getUsers', {
    output: zod.array(
      zod.object({
        id: zod.string(),
        name: zod.string()
      })
    ),
    resolve() {
      const users = database.get('users')
      return users
    }
  })
  .mutation('setUser', {
    input: zod.object({
      name: zod.string()
    }),
    output: zod.object({
      id: zod.string(),
      name: zod.string()
    }),
    resolve(request) {
      const id = randomUUID()
      const { name } = request.input
      const users = database.get('users')
      database.set('users', [...users, { id, name }])
      return {
        id,
        name
      }
    }
  })

export default routes
