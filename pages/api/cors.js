import Cors from 'cors'

const initMiddleware =(middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

export default async function handler(req, res) {
  await cors(req, res)

  res.json({ message: 'Hello Everyone!' })
}