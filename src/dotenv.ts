import dotenv from 'dotenv'

console.log(process.env.NODE_ENV)
dotenv.config({
  path: '.env.development'
})
