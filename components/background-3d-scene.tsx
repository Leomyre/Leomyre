"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function Background3DScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!containerRef.current) return

    const isDark = theme === "dark"

    const colors = {
      dark: {
        background: 0x000000,
        particleColor: 0xff003c,
        particleOpacity: 0.8,
        wireframeColor: 0x0066cc,
        wireframeOpacity: 0.1,
        light1Color: 0xff003c,
        light1Intensity: 1,
        light2Color: 0x0066cc,
        light2Intensity: 0.8,
        ambientIntensity: 0.2,
      },
      light: {
        background: 0xf0f4ff,
        particleColor: 0x6366f1,
        particleOpacity: 0.5,
        wireframeColor: 0xc084fc,
        wireframeOpacity: 0.06,
        light1Color: 0xec4899,
        light1Intensity: 0.4,
        light2Color: 0x06b6d4,
        light2Intensity: 0.3,
        ambientIntensity: 0.5,
      },
    }

    const config = isDark ? colors.dark : colors.light

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 100

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(config.background, 1)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const particleCount = 5
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 200
      positions[i3 + 1] = (Math.random() - 0.5) * 200
      positions[i3 + 2] = (Math.random() - 0.5) * 200

      velocities[i3] = (Math.random() - 0.5) * 0.5
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.5
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.5
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometryRef.current = geometry

    const material = new THREE.PointsMaterial({
      color: config.particleColor,
      size: 1,
      sizeAttenuation: true,
      transparent: true,
      opacity: config.particleOpacity,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    const boxGeometry = new THREE.IcosahedronGeometry(50, 4)
    const wireframeMatrix = new THREE.LineSegments(
      boxGeometry,
      new THREE.LineBasicMaterial({
        color: config.wireframeColor,
        transparent: true,
        opacity: config.wireframeOpacity,
      }),
    )
    wireframeMatrix.position.z = -100
    scene.add(wireframeMatrix)

    const light1 = new THREE.PointLight(config.light1Color, config.light1Intensity, 300)
    light1.position.set(50, 50, 50)
    scene.add(light1)

    const light2 = new THREE.PointLight(config.light2Color, config.light2Intensity, 300)
    light2.position.set(-50, -50, 50)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, config.ambientIntensity)
    scene.add(ambientLight)

    // Mouse tracking
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Update particle positions
      const pos = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3

        // Update velocities with some randomness
        velocities[i3] += (Math.random() - 0.5) * 0.02
        velocities[i3 + 1] += (Math.random() - 0.5) * 0.02
        velocities[i3 + 2] += (Math.random() - 0.5) * 0.02

        // Limit velocity
        const speed = Math.sqrt(velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2)
        if (speed > 1) {
          velocities[i3] /= speed
          velocities[i3 + 1] /= speed
          velocities[i3 + 2] /= speed
        }

        // Update positions
        pos[i3] += velocities[i3]
        pos[i3 + 1] += velocities[i3 + 1]
        pos[i3 + 2] += velocities[i3 + 2]

        // Wrap around
        if (Math.abs(pos[i3]) > 150) velocities[i3] *= -1
        if (Math.abs(pos[i3 + 1]) > 150) velocities[i3 + 1] *= -1
        if (Math.abs(pos[i3 + 2]) > 150) velocities[i3 + 2] *= -1
      }
      geometry.attributes.position.needsUpdate = true

      // Rotate wireframe mesh
      wireframeMatrix.rotation.x += 0.0001
      wireframeMatrix.rotation.y += 0.0002

      // Apply mouse influence to camera
      camera.position.x = mouse.x * 20
      camera.position.y = mouse.y * 20
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      geometry.dispose()
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  )
}
