import { NextApiRequest, NextApiResponse } from 'next'

import FormData from 'form-data'

import Fetcher from '@utils/Fetcher'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  switch (request.method) {
    case 'GET':
      try {
        response.status(200).json(await Fetcher('/arenas'))
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

        const data = await Fetcher('/arenas', {
          method: 'POST',
          headers: formData.getHeaders(),
          body: formData
        })

        response.status(201).json(data)
      } catch (error) {
        response.status(500).json({ message: error.message })
      }
      break
    default:
      response.status(405).end('Method Not Allowed')
      break
  }
}
