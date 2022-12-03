import { NextApiRequest, NextApiResponse } from 'next'

import FormData from 'form-data'

import Fetcher from '@utils/Fetcher'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query

  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await Fetcher(`/games/${id}`))
      } catch (error) {
        response.status(500).json({ message: error.message })
      }
      break
    case 'POST':
      try {
        const formData = new FormData()

        Object.entries(request.body).map(([key, value]) =>
          formData.append(key, value)
        )

        const data = await Fetcher(`/games/${id}`, {
          method: 'POST',
          headers: formData.getHeaders(),
          body: formData
        })

        response.status(200).json(data)
      } catch (error) {
        response.status(500).json({ message: error.message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
