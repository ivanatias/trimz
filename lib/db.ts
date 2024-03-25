import { nanoid } from 'nanoid'

const kv = await Deno.openKv()

export type StoredUrlData = {
  urlId: string
  originalUrl: string
  visits: number
}

type UserId = string | number

const GUEST_USER_ID = 'guest'

export async function shortenUrl(
  { originalUrl, userId = GUEST_USER_ID }: {
    originalUrl: string
    userId?: UserId
  },
) {
  const urlsPrimaryKey = ['urls', userId, originalUrl]
  const stored = await kv.get<StoredUrlData>(urlsPrimaryKey)

  if (stored.value !== null) {
    console.log(`URL ${originalUrl} for user with ID ${userId} already exists.`)
    return stored.value.urlId
  }

  const urlId = nanoid(5)
  const byUserAndUrlIdKey = ['urls', userId, urlId]
  const byUrlIdKey = ['urls', urlId]

  const toCreate = {
    urlId,
    originalUrl,
    visits: 0,
  }
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000
  const expireIn = userId === GUEST_USER_ID ? threeDaysMs : undefined

  const res = await kv.atomic()
    .set(urlsPrimaryKey, toCreate, { expireIn })
    .set(byUserAndUrlIdKey, urlsPrimaryKey, { expireIn })
    .set(byUrlIdKey, urlsPrimaryKey, { expireIn })
    .commit()

  if (!res.ok) {
    throw new Error(
      `Failed to shorten URL ${originalUrl} for user with ID ${userId}`,
    )
  }

  console.info(
    `URL ${originalUrl} for user with ID ${userId} did not exist. Created it.`,
  )

  return urlId
}

export async function getUrlById(urlId: string) {
  const index = await kv.get<string[]>(['urls', urlId])
  if (index.value === null) return null
  const url = await kv.get<StoredUrlData>(index.value)
  return url.value
}

export async function updateUrl(data: StoredUrlData) {
  const index = await kv.get<string[]>(['urls', data.urlId])
  if (index.value === null) {
    throw new Error(`URL with ID ${data.urlId} not found`)
  }
  await kv.set(index.value, data)
}

export async function getUserUrls(userId: string | number) {
  const iterator = kv.list<StoredUrlData>({ prefix: ['urls', userId] })
  const urls: StoredUrlData[] = []
  for await (const { value } of iterator) {
    if (!Array.isArray(value)) urls.push(value)
  }
  return urls
}

export type User = {
  login: string
  avatar_url: string
  name: string
  id: UserId
  sessionId: string
}

export async function createOrUpdateUser(user: User) {
  const byUserIdKey = ['users', 'github', user.id]
  const bySessionIdKey = ['users', 'github', user.sessionId]

  const res = await kv.atomic()
    .set(byUserIdKey, user)
    .set(bySessionIdKey, user)
    .commit()

  if (!res.ok) {
    throw new Error(
      `Failed to create or update user ${user.login} with ID: ${user.id}`,
    )
  }
}

export async function getUser(
  options: { by: 'userId'; userId: UserId } | {
    by: 'sessionId'
    sessionId: string
  },
) {
  const user = await kv.get<User>([
    'users',
    'github',
    options.by === 'userId' ? options.userId : options.sessionId,
  ])
  return user.value
}

export async function deleteUserBySessionId(sessionId: string) {
  await kv.delete(['users', 'github', sessionId])
}
