import { createApiRoute } from './Constants'

const parseResponse = (response) =>
  response.headers.get('Content-Type').startsWith('application/json')
    ? response.json()
    : response.text()

export default (path: string, options?: { [key: string]: unknown }) =>
  fetch(createApiRoute(path), options)
    .then((response) => (!response.ok ? Promise.reject(response) : response))
    .then((response) => parseResponse(response))
    .catch((response) => parseResponse(response))
