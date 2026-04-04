import { createClient } from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'

let client = null
let context = null

// Only create client if API key is available
if (process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
  client = createClient({
    publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY,
    throttle: 16 // 60fps cursor updates
  })

  context = createRoomContext(client)
}

export const RoomProvider = context?.RoomProvider
export const useOthers = context?.useOthers
export const useMyPresence = context?.useMyPresence
export const useUpdateMyPresence = context?.useUpdateMyPresence
