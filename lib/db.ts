import { nanoid } from 'nanoid'

const kv = await Deno.openKv()

type StoredUrlData = {
  urlId: string
  originalUrl: string
  visits: number
}

export async function shortenUrl(
  { originalUrl, username = 'guest' }: {
    originalUrl: string
    username?: string
  },
) {
  const stored = await kv.get<StoredUrlData>(['urls', username, originalUrl])

  if (stored.value !== null) {
    console.log(`URL ${originalUrl} for user ${username} already exists.`)
    return stored.value.urlId
  }

  const urlId = nanoid(5)
  const byOriginalUrlKey = ['urls', username, originalUrl]
  const byIdKey = ['urls', username, urlId]
  const toCreate = {
    urlId,
    originalUrl,
    visits: 0,
  }
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000
  const expireIn = username === 'guest' ? threeDaysMs : undefined

  await Promise.all([
    kv.set(byOriginalUrlKey, toCreate, {
      expireIn,
    }),
    kv.set(byIdKey, byOriginalUrlKey, { expireIn }),
  ])

  console.info(
    `URL ${originalUrl} for user ${username} did not exist. Created it.`,
  )

  return urlId
}

export async function getUserUrls(username: string) {
  const iterator = kv.list({ prefix: ['urls', username] })
  const urls = []
  for await (const { value } of iterator) {
    if (!Array.isArray(value)) urls.push(value)
  }
  return urls
}
