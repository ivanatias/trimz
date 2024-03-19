// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_main_layout from './routes/(main)/_layout.tsx'
import * as $_main_index from './routes/(main)/index.tsx'
import * as $_404 from './routes/_404.tsx'
import * as $_app from './routes/_app.tsx'
import * as $sign_in_provider_index from './routes/sign-in/[provider]/index.tsx'
import * as $sign_in_index from './routes/sign-in/index.tsx'

import { type Manifest } from '$fresh/server.ts'

const manifest = {
  routes: {
    './routes/(main)/_layout.tsx': $_main_layout,
    './routes/(main)/index.tsx': $_main_index,
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/sign-in/[provider]/index.tsx': $sign_in_provider_index,
    './routes/sign-in/index.tsx': $sign_in_index,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest

export default manifest
