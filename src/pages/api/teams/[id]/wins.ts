import { NextApiRequest, NextApiResponse } from 'next'

import Fetcher from '@utils/Fetcher'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await Fetcher(`/teams/${id}/wins`))
      } catch (error) {
        response.status(500).json({ message: error.message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
