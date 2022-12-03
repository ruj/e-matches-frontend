import useSWR from 'swr'

export function useFetch (url: string, options?: any) {
  url = '/api' + url

  return useSWR(
    url,
    async (url) =>
      await fetch(url, options).then((response) => response.json())
  )
}
