import { IMAGE_MAX_SIZE } from '@/constants'
import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
import { initEdgeStoreClient } from '@edgestore/server/core'

const es = initEdgeStore.create()

/**
 * This is the main router for the Edge Store buckets.
 */
export const edgeStoreRouter = es.router({
  publicFiles: es
    .imageBucket({
      maxSize: IMAGE_MAX_SIZE
    })
})

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
})

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter
})
