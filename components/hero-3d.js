import { useRef, useEffect, useState, Suspense, memo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Check if device can handle 3D graphics
const useCanRender3D = () => {
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setCanRender(false)
        return
      }

      // Check for mobile/low-power devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Check for low-end GPU indicators
      const renderer = gl.getParameter(gl.RENDERER)
      const isLowEndGPU = /SwiftShader|llvmpipe|Software/i.test(renderer)

      if (prefersReducedMotion || isLowEndGPU) {
        setCanRender(false)
        return
      }

      // Allow on tablets and desktops
      setCanRender(!isMobile || window.innerWidth >= 768)
    } catch (e) {
      setCanRender(false)
    }
  }, [])

  return canRender
}

// Playful floating blob shape - simplified and cartoonish
const HeroShape = ({ mouse, scrollProgress }) => {
  const meshRef = useRef()
  const materialRef = useRef()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
      const handler = (e) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return

    const time = clock.getElapsedTime()

    // Slow, playful wobble rotation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
    meshRef.current.rotation.y = time * 0.1
    meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.15

    // Gentle mouse tracking
    const targetRotX = mouse.current.y * 0.15
    const targetRotY = mouse.current.x * 0.15
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.03
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.03

    // Scale based on scroll
    const targetScale = 2.5 - scrollProgress * 0.5
    meshRef.current.scale.setScalar(
      meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1
    )

    // Playful wobbly distortion
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1}
      rotationIntensity={prefersReducedMotion ? 0 : 0.3}
      floatIntensity={prefersReducedMotion ? 0 : 0.8}
      floatingRange={prefersReducedMotion ? [0, 0] : [-0.3, 0.3]}
    >
      <mesh ref={meshRef} scale={2.5}>
        {/* Simple sphere for playful blob look */}
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#E54B4B"
          envMapIntensity={0.2}
          clearcoat={0.3}
          clearcoatRoughness={0.5}
          metalness={0}
          roughness={0.6}
          distort={0.4}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

// Playful smaller floating shapes - simpler geometries
const OrbitingShape = ({ radius, speed, offset, color, size, geometry }) => {
  const meshRef = useRef()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!meshRef.current || prefersReducedMotion) return

    const time = clock.getElapsedTime() * speed + offset

    // Playful bouncy orbital movement
    meshRef.current.position.x = Math.cos(time) * radius
    meshRef.current.position.y = Math.sin(time * 0.5) * radius * 0.6 + Math.sin(time * 2) * 0.2
    meshRef.current.position.z = Math.sin(time) * radius * 0.4

    // Slow tumbling rotation
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.015
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />
      case 'star':
        return <octahedronGeometry args={[size]} />
      case 'donut':
        return <torusGeometry args={[size * 0.6, size * 0.25, 8, 16]} />
      default:
        return <sphereGeometry args={[size, 12, 12]} />
    }
  }

  return (
    <mesh ref={meshRef}>
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        metalness={0}
        roughness={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Playful confetti-like particle field
const ParticleField = () => {
  const particlesRef = useRef()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)
    }
  }, [])

  const particleCount = 30 // Fewer, larger particles for playful feel
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  // Playful color palette - coral, cream, dark
  const playfulColors = [
    new THREE.Color('#E54B4B'), // Coral
    new THREE.Color('#FFFEF5'), // Cream
    new THREE.Color('#1A1A1A'), // Ink
    new THREE.Color('#FF8A80'), // Light coral
  ]

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8

    const color = playfulColors[Math.floor(Math.random() * playfulColors.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame(({ clock }) => {
    if (!particlesRef.current || prefersReducedMotion) return

    // Slow gentle drift
    particlesRef.current.rotation.y = clock.getElapsedTime() * 0.01
    particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.005) * 0.05
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// Playful scene composition with warm lighting
const Scene = ({ mouse, scrollProgress }) => {
  return (
    <>
      {/* Warm, soft lighting */}
      <ambientLight intensity={0.6} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.2}
        penumbra={1}
        intensity={0.8}
        color="#FFFEF5"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#E54B4B" />
      <pointLight position={[10, -5, 5]} intensity={0.3} color="#FF8A80" />

      {/* Main playful blob */}
      <HeroShape mouse={mouse} scrollProgress={scrollProgress} />

      {/* Playful orbiting shapes */}
      <OrbitingShape
        radius={3.5}
        speed={0.3}
        offset={0}
        color="#FFFEF5"
        size={0.2}
        geometry="star"
      />
      <OrbitingShape
        radius={4}
        speed={0.2}
        offset={Math.PI}
        color="#1A1A1A"
        size={0.15}
        geometry="box"
      />
      <OrbitingShape
        radius={3}
        speed={0.4}
        offset={Math.PI / 2}
        color="#FF8A80"
        size={0.18}
        geometry="donut"
      />

      {/* Confetti particles */}
      <ParticleField />

      {/* Softer environment for less reflective look */}
      <Environment preset="sunset" />
    </>
  )
}

// Playful loading fallback
const Loader = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(245, 158, 11, 0.6)',
        fontFamily: "'Caveat', cursive",
        fontSize: '1.2rem'
      }}
    >
      loading...
    </div>
  )
}

// Playful CSS fallback blob
const CSSFallback = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Wobbly coral blob as fallback */}
      <div
        style={{
          width: '70%',
          height: '70%',
          maxWidth: '280px',
          maxHeight: '280px',
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
          background: 'rgba(245, 158, 11, 0.2)',
          filter: 'blur(30px)',
          animation: 'wobble 6s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes wobble {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          33% {
            transform: scale(1.05) rotate(5deg);
            border-radius: 40% 60% 70% 30% / 30% 70% 40% 60%;
          }
          66% {
            transform: scale(0.95) rotate(-5deg);
            border-radius: 70% 30% 40% 60% / 70% 40% 60% 30%;
          }
        }
      `}</style>
    </div>
  )
}

// Main component
const Hero3D = memo(({ className, style }) => {
  const containerRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const canRender3D = useCanRender3D()

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mouse tracking
  useEffect(() => {
    if (!isClient) return

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isClient])

  // Scroll progress tracking
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollTop / (docHeight * 0.3), 1) // First 30% of scroll
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  if (!isClient) {
    return <Loader />
  }

  // Show CSS fallback if 3D isn't supported
  if (!canRender3D) {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          ...style
        }}
      >
        <CSSFallback />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style
      }}
    >
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            // Performance optimizations
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Scene mouse={mouse} scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  )
})

Hero3D.displayName = 'Hero3D'

export default Hero3D
