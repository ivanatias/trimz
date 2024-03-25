// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_main_layout from './routes/(main)/_layout.tsx'
import * as $_main_middleware from './routes/(main)/_middleware.ts'
import * as $_main_index from './routes/(main)/index.tsx'
import * as $_main_my_urls from './routes/(main)/my-urls.tsx'
import * as $_404 from './routes/_404.tsx'
import * as $_app from './routes/_app.tsx'
import * as $callback from './routes/callback.ts'
import * as $sign_in_provider_ from './routes/sign-in/[provider].tsx'
import * as $sign_in_index from './routes/sign-in/index.tsx'
import * as $sign_out from './routes/sign-out.tsx'

import { type Manifest } from '$fresh/server.ts'

const manifest = {
  routes: {
    './routes/(main)/_layout.tsx': $_main_layout,
    './routes/(main)/_middleware.ts': $_main_middleware,
    './routes/(main)/index.tsx': $_main_index,
    './routes/(main)/my-urls.tsx': $_main_my_urls,
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/callback.ts': $callback,
    './routes/sign-in/[provider].tsx': $sign_in_provider_,
    './routes/sign-in/index.tsx': $sign_in_index,
    './routes/sign-out.tsx': $sign_out,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest

export default manifest
