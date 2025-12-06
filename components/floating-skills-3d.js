import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useColorModeValue } from '@chakra-ui/react'

// Skill data organized by category with colors
const SKILLS_DATA = {
  languages: {
    skills: ['TypeScript', 'Python', 'Java', 'Go', 'SQL', 'JS'],
    color: '#3178C6', // TypeScript blue
    geometry: 'box'
  },
  frontend: {
    skills: ['React', 'Next.js', 'Tailwind', 'Chakra'],
    color: '#61DAFB', // React cyan
    geometry: 'sphere'
  },
  backend: {
    skills: ['Node.js', 'Flask', 'Django', 'Spring'],
    color: '#6DB33F', // Spring green
    geometry: 'octahedron'
  },
  devops: {
    skills: ['Docker', 'K8s', 'AWS', 'Terraform'],
    color: '#326CE5', // Kubernetes blue
    geometry: 'icosahedron'
  },
  ai: {
    skills: ['PyTorch', 'HF', 'LLM', 'ML'],
    color: '#FF6F00', // AI orange
    geometry: 'tetrahedron'
  }
}

// Individual skill mesh component
const SkillMesh = ({
  position,
  skill,
  geometry,
  color,
  theme,
  mousePosition,
  index
}) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setPrefersReducedMotion(mediaQuery.matches)

      const handler = (e) => setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  // Animation loop with mouse tracking
  useFrame((state) => {
    if (!meshRef.current || prefersReducedMotion) return

    const time = state.clock.getElapsedTime()

    // Subtle rotation
    meshRef.current.rotation.x = time * 0.2 + index * 0.3
    meshRef.current.rotation.y = time * 0.15 + index * 0.2

    // Mouse tracking parallax effect
    const parallaxStrength = 0.5
    const targetX = mousePosition.current.x * parallaxStrength * (index % 2 === 0 ? 1 : -1)
    const targetY = mousePosition.current.y * parallaxStrength * (index % 3 === 0 ? 1 : -1)

    meshRef.current.position.x += (position[0] + targetX - meshRef.current.position.x) * 0.05
    meshRef.current.position.y += (position[1] + targetY - meshRef.current.position.y) * 0.05

    // Hover scale effect
    const targetScale = hovered ? 1.3 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })

  // Render different geometry based on type
  const renderGeometry = () => {
    const size = 0.4
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[size, size, size]} />
      case 'sphere':
        return <sphereGeometry args={[size * 0.6, 32, 32]} />
      case 'octahedron':
        return <octahedronGeometry args={[size * 0.7]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[size * 0.7]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size * 0.8]} />
      default:
        return <boxGeometry args={[size, size, size]} />
    }
  }

  // Adjust color brightness for theme
  const materialColor = theme === 'dark' ? color : new THREE.Color(color).multiplyScalar(0.8).getHex()
  const emissiveColor = theme === 'dark' ? color : '#000000'
  const emissiveIntensity = theme === 'dark' ? (hovered ? 0.5 : 0.3) : (hovered ? 0.2 : 0.1)

  return (
    <Float
      speed={prefersReducedMotion ? 0 : 1.5}
      rotationIntensity={prefersReducedMotion ? 0 : 0.5}
      floatIntensity={prefersReducedMotion ? 0 : 0.5}
      floatingRange={prefersReducedMotion ? [0, 0] : [-0.1, 0.1]}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {renderGeometry()}
        <meshStandardMaterial
          color={materialColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={hovered ? 1 : 0.9}
        />

        {/* Skill name on hover */}
        {hovered && (
          <Html distanceFactor={10}>
            <div
              style={{
                background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)',
                color: theme === 'dark' ? '#fff' : '#000',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                userSelect: 'none',
                border: `1px solid ${color}`
              }}
            >
              {skill}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  )
}

// Main scene component
const SkillsScene = ({ theme }) => {
  const mousePosition = useRef({ x: 0, y: 0 })
  const groupRef = useRef()

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

  // Generate positions in a spherical/orbital pattern
  const skillPositions = useMemo(() => {
    const positions = []
    let index = 0

    Object.entries(SKILLS_DATA).forEach(([category, { skills, color, geometry }]) => {
      skills.forEach((skill) => {
        // Create positions in a sphere-like distribution
        const radius = 3
        const phi = Math.acos(-1 + (2 * index) / 24) // Golden angle distribution
        const theta = Math.sqrt(24 * Math.PI) * phi

        const x = radius * Math.sin(phi) * Math.cos(theta)
        const y = radius * Math.sin(phi) * Math.sin(theta)
        const z = radius * Math.cos(phi)

        positions.push({
          position: [x, y, z],
          skill,
          color,
          geometry,
          index: index++
        })
      })
    })

    return positions
  }, [])

  // Slow group rotation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={theme === 'dark' ? 0.8 : 1} />
      <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.3 : 0.5} color="#88ccca" />
      <spotLight
        position={[0, 10, 0]}
        intensity={theme === 'dark' ? 0.5 : 0.3}
        angle={0.6}
        penumbra={1}
        color="#88ccca"
      />

      {/* Skills group */}
      <group ref={groupRef}>
        {skillPositions.map(({ position, skill, color, geometry, index }) => (
          <SkillMesh
            key={skill}
            position={position}
            skill={skill}
            geometry={geometry}
            color={color}
            theme={theme}
            mousePosition={mousePosition}
            index={index}
          />
        ))}
      </group>

      {/* Limited orbit controls for manual rotation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={2 * Math.PI / 3}
        rotateSpeed={0.5}
      />
    </>
  )
}

// Main component export
const FloatingSkills3D = ({ height = '600px' }) => {
  const colorMode = useColorModeValue('light', 'dark')
  const bgColor = useColorModeValue('transparent', 'transparent')

  return (
    <div style={{ height, width: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          background: bgColor
        }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <SkillsScene theme={colorMode} />
      </Canvas>

      {/* Instruction text */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: colorMode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
          fontSize: '12px',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        Hover over shapes to see skills • Drag to rotate
      </div>
    </div>
  )
}

export default FloatingSkills3D
