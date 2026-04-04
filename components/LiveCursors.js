import { useEffect, useCallback, useState } from 'react'
import Cursor from './Cursor'

// Dynamically import liveblocks hooks (may be undefined if no API key)
let RoomProvider, useOthers, useUpdateMyPresence
try {
  const liveblocks = require('../liveblocks.config')
  RoomProvider = liveblocks.RoomProvider
  useOthers = liveblocks.useOthers
  useUpdateMyPresence = liveblocks.useUpdateMyPresence
} catch (e) {
  // Liveblocks not configured
}

// 90s neon color palette for cursors
const CURSOR_COLORS = [
  '#FF1493', // Hot pink
  '#00FFFF', // Cyan
  '#FF00FF', // Magenta
  '#00FF00', // Lime green
  '#FFFF00', // Yellow
  '#0000FF', // Blue
  '#FF69B4', // Light pink
  '#00CED1', // Dark turquoise
  '#FFD700', // Gold
  '#FF4500'  // Orange red
]

function CursorsOverlay() {
  // Return null if hooks are not available
  if (!useOthers || !useUpdateMyPresence) {
    return null
  }

  const others = useOthers()
  const updateMyPresence = useUpdateMyPresence()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handlePointerMove = useCallback(
    (e) => {
      const x = e.clientX
      const y = e.clientY
      updateMyPresence({ cursor: { x, y } })
    },
    [updateMyPresence]
  )

  const handlePointerLeave = useCallback(() => {
    updateMyPresence({ cursor: null })
  }, [updateMyPresence])

  useEffect(() => {
    if (!isClient) return

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [handlePointerMove, handlePointerLeave, isClient])

  if (!isClient) return null

  return (
    <>
      {others.map(({ connectionId, presence }) => {
        if (!presence?.cursor) return null

        // Assign a consistent color based on connectionId
        const colorIndex = connectionId % CURSOR_COLORS.length
        const color = CURSOR_COLORS[colorIndex]

        // Generate a simple visitor name
        const visitorNumber = (connectionId % 999) + 1
        const name = `Visitor ${visitorNumber}`

        return (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
            color={color}
            name={name}
          />
        )
      })}
    </>
  )
}

export default function LiveCursors({ children }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render on server
  if (!isClient) {
    return <>{children}</>
  }

  // Check if Liveblocks is configured
  const hasApiKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
  const isLiveblocksReady = hasApiKey && RoomProvider

  // If no API key or RoomProvider not available, just render children without cursor sharing
  if (!isLiveblocksReady) {
    if (typeof window !== 'undefined' && !hasApiKey) {
      console.warn('Liveblocks API key not found. Cursor sharing disabled.')
    }
    return <>{children}</>
  }

  return (
    <RoomProvider
      id="portfolio-visitors"
      initialPresence={{ cursor: null }}
    >
      <CursorsOverlay />
      {children}
    </RoomProvider>
  )
}
