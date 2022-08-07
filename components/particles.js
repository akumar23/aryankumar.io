import { useEffect, useState, useRef } from 'react'
import * as three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ParticleContainer, ParticleSpin } from './particle-loader'
import { TextGeometry, FontLoader } from 'three'
import { BMFont } from 'three-text-geometry' 

const Particles = () => {

    const refContainer = useRef()
    const loading = useState(true)

    useEffect(() => { 
        // Canvas
        const canvas = document.getElementById('webgl')

        // Scene
        const scene = new three.Scene()

        // Objects
        const geometry = new three.TorusGeometry( .7, .2, 16, 100 );

        const particlesGeometry = new three.BufferGeometry;
        const partcileCount = 4600;

        const pos = new Float32Array(partcileCount*3);

        for (let i=0; i<partcileCount*3; i++) {
            pos[i] = (Math.random()-0.5) * (Math.random()*5)
        }

        particlesGeometry.setAttribute('position', new three.BufferAttribute(pos, 3))

        // Materials

        const material = new three.PointsMaterial({size: 0.005})
        const particleMaterial = new three.PointsMaterial({
            size: 0.005,
            color: 'grey'
        })
        material.color = new three.Color(0xffff00)


        // Mesh
        const sphere = new three.Points(geometry,material)
        const particle = new three.Points(particlesGeometry, particleMaterial)
     
        //Add text

        // add to scene
        scene.add(sphere, particle)

   

        // Lights

        const pointLight = new three.PointLight(0xffffff, 0.1)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        scene.add(pointLight)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
  
        /**
         * Camera
         */
        // Base camera
        const camera = new three.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 2
        scene.add(camera)

        // Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true

        /**
         * Renderer
        */
        const renderer = new three.WebGLRenderer({
            canvas: canvas
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(new three.Color('#202023'), 1)

        //mouse
        document.addEventListener('mousemove', animateParticle)

        let mouseX = 0;
        let mouseY = 0;

        function animateParticle(event) {
            mouseY = event.clientY;
            mouseX = event.clientX;
        }

        /**
         * Animate
         */

        const clock = new three.Clock()

        const tick = () =>
        {

            const elapsedTime = clock.getElapsedTime()

            //rotate based on mouse position
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.005;
            sphere.rotation.z += 0.01;
          
            particle.rotation.y = -.1 * elapsedTime

            if (mouseX > 0) {
                particle.rotation.x = -mouseY * (elapsedTime * 0.00008)
            }
            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
    })

    return (
        <ParticleContainer ref={refContainer}>{loading && <ParticleSpin />} </ParticleContainer>
    )

}
export default Particles