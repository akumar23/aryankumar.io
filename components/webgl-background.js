import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Check if WebGL is supported and performant
const useWebGLSupport = () => {
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    // Check for WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setSupported(false)
        return
      }

      // Check for mobile/low-power devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (isMobile || prefersReducedMotion) {
        setSupported(false)
      }
    } catch (e) {
      setSupported(false)
    }
  }, [])

  return supported
}

// Gradient mesh shader material
const GradientMaterial = ({ colorMode }) => {
  const meshRef = useRef()
  const materialRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(colorMode === 'dark' ? '#0A0A0A' : '#FAFAFA') },
    uColor2: { value: new THREE.Color(colorMode === 'dark' ? '#1a1a2e' : '#F5F5F5') },
    uColor3: { value: new THREE.Color('#8B5CF6') }, // Primary violet
    uColor4: { value: new THREE.Color('#F97316') }, // Secondary coral
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1, 1) }
  }), [colorMode])

  // Update colors when color mode changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value = new THREE.Color(
        colorMode === 'dark' ? '#0A0A0A' : '#FAFAFA'
      )
      materialRef.current.uniforms.uColor2.value = new THREE.Color(
        colorMode === 'dark' ? '#1a1a2e' : '#F5F5F5'
      )
    }
  }, [colorMode])

  const { size } = useThree()

  useFrame(({ clock, pointer }) => {
    if (!materialRef.current) return

    // Slow time progression for subtle animation
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime() * 0.05

    // Smooth mouse following
    const targetX = pointer.x * 0.5 + 0.5
    const targetY = pointer.y * 0.5 + 0.5
    materialRef.current.uniforms.uMouse.value.x += (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.02
    materialRef.current.uniforms.uMouse.value.y += (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.02

    // Update resolution
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
  })

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec3 uColor4;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Simplex noise functions
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
        -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m; m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;

      // Multi-octave noise for organic movement
      float noise1 = snoise(uv * 1.5 + uTime) * 0.5 + 0.5;
      float noise2 = snoise(uv * 2.5 - uTime * 0.7) * 0.5 + 0.5;
      float noise3 = snoise(uv * 0.8 + uTime * 0.3) * 0.5 + 0.5;

      // Mouse influence - creates a soft glow around cursor position
      float mouseDistance = distance(uv, uMouse);
      float mouseInfluence = smoothstep(0.5, 0.0, mouseDistance);

      // Base gradient from bottom to top
      vec3 color = mix(uColor1, uColor2, uv.y + noise1 * 0.15);

      // Add primary color accent based on noise
      float primaryMask = noise2 * 0.15 + mouseInfluence * 0.2;
      color = mix(color, uColor3, primaryMask * 0.4);

      // Add secondary color in corners/edges
      float edgeMask = (1.0 - uv.x) * uv.y * noise3;
      color = mix(color, uColor4, edgeMask * 0.1);

      // Subtle vignette
      float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.5);
      color *= 0.9 + vignette * 0.1;

      gl_FragColor = vec4(color, 1.0);
    }
  `

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  )
}

// CSS fallback gradient for non-WebGL devices
const CSSFallback = ({ colorMode }) => {
  const bgStyle = colorMode === 'dark'
    ? 'linear-gradient(135deg, #0A0A0A 0%, #171717 50%, #1a1a2e 100%)'
    : 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 50%, #EDE9FE 100%)'

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: bgStyle,
        pointerEvents: 'none'
      }}
    />
  )
}

// Main WebGL Background Component
const WebGLBackground = ({ colorMode = 'dark' }) => {
  const isSupported = useWebGLSupport()

  if (!isSupported) {
    return <CSSFallback colorMode={colorMode} />
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.5]}
        gl={{
          alpha: false,
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        style={{ background: 'transparent' }}
      >
        <GradientMaterial colorMode={colorMode} />
      </Canvas>
    </div>
  )
}

export default WebGLBackground
