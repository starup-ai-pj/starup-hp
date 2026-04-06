'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CultureVisionVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ww = container.offsetWidth
    let wh = container.offsetHeight
    let particles: THREE.Points | null = null
    let previousTime = 0
    let phase: 'gather' | 'scatter' = 'gather'
    let phaseStart = 0
    const GATHER_DURATION = 8000
    const SCATTER_DURATION = 4000

    const centerVector = new THREE.Vector3(0, 0, 0)

    // Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(ww, wh)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xffffff, 1)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, ww / wh, 0.1, 10000)
    camera.position.set(0, 0, 220)
    camera.lookAt(centerVector)
    scene.add(camera)

    // Load map texture
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = ''
    loader.load(
      '/images/culture/map.png',
      (texture) => {
        const image = texture.image as HTMLImageElement
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        ctx.drawImage(image, 0, 0)
        const imagedata = ctx.getImageData(0, 0, image.width, image.height)

        drawMap(imagedata)
      },
      undefined,
      () => {
        // Fallback: generate random dot field if image not found
        drawFallback()
      }
    )

    const drawMap = (imagedata: ImageData) => {
      const geometry = new THREE.BufferGeometry()
      const positions: number[] = []
      const destinations: number[] = []
      const speeds: number[] = []

      for (let y = 0; y < imagedata.height; y += 3) {
        for (let x = 0; x < imagedata.width; x += 3) {
          if (imagedata.data[(x * 4 + y * 4 * imagedata.width) + 3] > 128) {
            // Random start position
            positions.push(
              Math.random() * 1000 - 500,
              Math.random() * 1000 - 500,
              -Math.random() * 500
            )
            // Destination: map shape
            destinations.push(
              x - imagedata.width / 2,
              -y + imagedata.height / 2,
              0
            )
            speeds.push(Math.random() / 200 + 0.015)
          }
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('destination', new THREE.Float32BufferAttribute(destinations, 3))
      geometry.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1))

      const material = new THREE.PointsMaterial({
        size: 2.5,
        color: 0xb0b8c8,
        sizeAttenuation: false,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      frameRef.current = requestAnimationFrame(render)
    }

    const drawFallback = () => {
      const geometry = new THREE.BufferGeometry()
      const positions: number[] = []
      const destinations: number[] = []
      const speeds: number[] = []
      const count = 8000

      for (let i = 0; i < count; i++) {
        positions.push(
          Math.random() * 1000 - 500,
          Math.random() * 1000 - 500,
          -Math.random() * 500
        )
        destinations.push(
          Math.random() * 400 - 200,
          Math.random() * 200 - 100,
          0
        )
        speeds.push(Math.random() / 200 + 0.015)
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
      geometry.setAttribute('destination', new THREE.Float32BufferAttribute(destinations, 3))
      geometry.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1))

      const material = new THREE.PointsMaterial({
        size: 2,
        color: 0xb0b8c8,
        sizeAttenuation: false,
      })

      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      frameRef.current = requestAnimationFrame(render)
    }

    // Store original random positions for scatter
    const scatterPositions: number[] = []

    const initScatter = (count: number) => {
      scatterPositions.length = 0
      for (let i = 0; i < count; i++) {
        scatterPositions.push(
          Math.random() * 1000 - 500,
          Math.random() * 1000 - 500,
          -Math.random() * 500
        )
      }
    }

    const render = (time: number) => {
      frameRef.current = requestAnimationFrame(render)

      if (!particles) return

      const posAttr = particles.geometry.getAttribute('position') as THREE.BufferAttribute
      const destAttr = particles.geometry.getAttribute('destination') as THREE.BufferAttribute
      const speedAttr = particles.geometry.getAttribute('speed') as THREE.BufferAttribute
      const count = posAttr.count

      // Initialize scatter positions on first run
      if (scatterPositions.length === 0) {
        initScatter(count)
        phaseStart = time
      }

      const elapsed = time - phaseStart

      // Phase switching
      if (phase === 'gather' && elapsed > GATHER_DURATION) {
        phase = 'scatter'
        phaseStart = time
        initScatter(count)
      } else if (phase === 'scatter' && elapsed > SCATTER_DURATION) {
        phase = 'gather'
        phaseStart = time
      }

      for (let i = 0; i < count; i++) {
        const speed = speedAttr.getX(i)
        if (phase === 'gather') {
          // Move toward map destination
          posAttr.setX(i, posAttr.getX(i) + (destAttr.getX(i) - posAttr.getX(i)) * speed)
          posAttr.setY(i, posAttr.getY(i) + (destAttr.getY(i) - posAttr.getY(i)) * speed)
          posAttr.setZ(i, posAttr.getZ(i) + (destAttr.getZ(i) - posAttr.getZ(i)) * speed)
        } else {
          // Move toward random scatter positions
          const si = i * 3
          posAttr.setX(i, posAttr.getX(i) + (scatterPositions[si] - posAttr.getX(i)) * speed * 0.5)
          posAttr.setY(i, posAttr.getY(i) + (scatterPositions[si + 1] - posAttr.getY(i)) * speed * 0.5)
          posAttr.setZ(i, posAttr.getZ(i) + (scatterPositions[si + 2] - posAttr.getZ(i)) * speed * 0.5)
        }
      }

      // Randomly swap during gather phase
      if (phase === 'gather' && time - previousTime > 150) {
        const idx1 = Math.floor(Math.random() * count)
        const idx2 = count - 1 - idx1
        if (idx1 !== idx2 && idx1 < count && idx2 >= 0) {
          const tempX = destAttr.getX(idx1)
          const tempY = destAttr.getY(idx1)
          destAttr.setX(idx1, destAttr.getX(idx2))
          destAttr.setY(idx1, destAttr.getY(idx2))
          destAttr.setX(idx2, tempX)
          destAttr.setY(idx2, tempY)
        }
        previousTime = time
      }

      posAttr.needsUpdate = true

      // Gentle camera sway
      camera.position.x = Math.sin(time / 6000) * 50
      camera.lookAt(centerVector)

      renderer.render(scene, camera)
    }

    const onResize = () => {
      ww = container.offsetWidth
      wh = container.offsetHeight
      renderer.setSize(ww, wh)
      camera.aspect = ww / wh
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      rendererRef.current = null
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-visible"
      style={{ background: '#ffffff' }}
    />
  )
}
