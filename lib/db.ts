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
  const primaryKey = ['urls', userId, originalUrl]

  let urlId = nanoid(5)
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
    .check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, toCreate, { expireIn })
    .set(byUserAndUrlIdKey, primaryKey, { expireIn })
    .set(byUrlIdKey, primaryKey, { expireIn })
    .commit()

  const isNewUrl = res.ok

  if (!isNewUrl) {
    const storedUrl = await kv.get<StoredUrlData>(primaryKey)
    urlId = storedUrl.value?.urlId as string
  }

  const logMsg = isNewUrl
    ? `URL ${originalUrl} for user with ID ${userId} did not exist. Created it.`
    : `URL ${originalUrl} for user with ID ${userId} already exists.`

  console.info(logMsg)
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
  // should be atomic operation in a loop
  // to avoid race conditions if the url data has been modified
  // while the update is in progress
  await kv.set(index.value, data)
}

export async function getUserUrls(userId: UserId) {
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
