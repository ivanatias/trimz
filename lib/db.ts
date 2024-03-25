import { nanoid } from 'nanoid'

const kv = await Deno.openKv()

export type StoredUrlData = {
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
  const urlsPrimaryKey = ['urls', username, originalUrl]
  const stored = await kv.get<StoredUrlData>(urlsPrimaryKey)

  if (stored.value !== null) {
    console.log(`URL ${originalUrl} for user ${username} already exists.`)
    return stored.value.urlId
  }

  const urlId = nanoid(5)
  const byUserAndUrlIdKey = ['urls', username, urlId]
  const byUrlIdKey = ['urls', urlId]

  const toCreate = {
    urlId,
    originalUrl,
    visits: 0,
  }
  const threeDaysMs = 3 * 24 * 60 * 60 * 1000
  const expireIn = username === 'guest' ? threeDaysMs : undefined

  const res = await kv.atomic()
    .set(urlsPrimaryKey, toCreate, { expireIn })
    .set(byUserAndUrlIdKey, urlsPrimaryKey, { expireIn })
    .set(byUrlIdKey, urlsPrimaryKey, { expireIn })
    .commit()

  if (!res.ok) {
    throw new Error(
      `Failed to shorten URL ${originalUrl} for user ${username}`,
    )
  }

  console.info(
    `URL ${originalUrl} for user ${username} did not exist. Created it.`,
  )

  return urlId
}

export async function getUserUrls(username: string) {
  const iterator = kv.list<StoredUrlData>({ prefix: ['urls', username] })
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
  id: number
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
  options: { by: 'userId'; userId: number } | {
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
