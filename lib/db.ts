import { nanoid } from 'nanoid'

const kv = await Deno.openKv()

export type StoredUrlData = {
  urlId: string
  originalUrl: string
  visits: number
}

type UserId = string | number

const GUEST_USER_ID = 'guest'
const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

export async function shortenUrl(
  { inputUrl, userId = GUEST_USER_ID }: {
    inputUrl: string
    userId?: UserId
  },
) {
  const isGuest = userId === GUEST_USER_ID

  if (!isGuest) {
    const userUrls = await getUserUrls(userId)
    const foundUrl = userUrls.find((url) => url.originalUrl === inputUrl)
    if (foundUrl !== undefined) return foundUrl.urlId
  }

  const urlId = nanoid(5)

  const primaryKey = isGuest
    ? ['urls', inputUrl]
    : ['urls', String(userId), urlId]

  const byUrlIdKey = ['urls', urlId]

  const toCreate = {
    urlId,
    originalUrl: inputUrl,
    visits: 0,
  }

  const expireIn = isGuest ? THREE_DAYS_MS : undefined

  const res = await kv.atomic()
    .check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, toCreate, { expireIn })
    .set(byUrlIdKey, primaryKey, { expireIn })
    .commit()

  const isNewUrl = res.ok

  if (!isNewUrl) {
    const storedUrl = await kv.get<StoredUrlData>(primaryKey)
    return storedUrl.value?.urlId as string
  }

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

  let res = { ok: false }
  while (!res.ok) {
    const url = await kv.get<StoredUrlData>(index.value)
    res = await kv.atomic()
      .check(url)
      .set(index.value, data)
      .commit()
  }
}

export async function getUserUrls(userId: UserId) {
  const iterator = kv.list<StoredUrlData>({ prefix: ['urls', String(userId)] })
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
