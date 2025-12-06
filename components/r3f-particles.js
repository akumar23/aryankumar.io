import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleField = ({ theme }) => {
  const ref = useRef()
  const mousePosition = useRef({ x: 0, y: 0 })

  // Generate random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3)

    for (let i = 0; i < 5000; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 10
      positions[i3 + 1] = (Math.random() - 0.5) * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 10
    }

    return positions
  }, [])

  // Mouse tracking with cleanup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event) => {
        mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
        mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1
      }
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Animation loop with spring physics
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime()

      // Smooth rotation
      ref.current.rotation.x = time * 0.05
      ref.current.rotation.y = time * 0.075

      // Mouse tracking with spring physics
      const targetRotationY = mousePosition.current.x * 0.3
      const targetRotationX = mousePosition.current.y * 0.3

      ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.05
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.05
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color={theme === 'dark' ? '#88ccca' : '#5a9a98'}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </points>
    </group>
  )
}

const R3FParticles = ({ theme = 'dark' }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: false
      }}
    >
      <ParticleField theme={theme} />
    </Canvas>
  )
}

export default R3FParticles
