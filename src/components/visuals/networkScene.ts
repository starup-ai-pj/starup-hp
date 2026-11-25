// トップのヒーロー背景（青いニューラルネットワーク）
// 元: public/html/network-background.html
//
// 元からの変更点
// - FilmPass は強さ 0 で何も描いていなかった（全画面の処理だけ走っていた）ので外した
// - スマホ相当ではブルームを切って、そのまま描く
// - pixelRatio の上限 2 → 1.5
// - 見えていない間は描画を止める（core.createRenderLoop）

import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { createRenderLoop, isLowPowerDevice, observeSize, pixelRatio, type VisualController } from "./core"
import { NetNode, buildNetworkMeshes, createPulseTrigger, disposeObject } from "./network-common"

const palette = [
  new THREE.Color(0x0ea5e9),
  new THREE.Color(0x0284c7),
  new THREE.Color(0x0369a1),
  new THREE.Color(0x075985),
  new THREE.Color(0x38bdf8),
]

function createStarfield() {
  const count = 5000
  const pos: number[] = []
  for (let i = 0; i < count; i++) {
    const r = THREE.MathUtils.randFloat(40, 120)
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2))
    const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
    pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi))
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3))
  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    sizeAttenuation: true,
    depthWrite: false,
    opacity: 0.45,
    transparent: true,
  })
  return new THREE.Points(geo, mat)
}

function generateNetwork(): NetNode[] {
  const nodes: NetNode[] = []
  const root = new NetNode(new THREE.Vector3(0, 0, 0), 0, 0)
  root.size = 1.5
  nodes.push(root)
  const dimensions = 4
  const nodesPerDimension = 40
  const maxRadius = 20
  const dimVecs = [
    new THREE.Vector3(1, 1, 1).normalize(),
    new THREE.Vector3(-1, 1, -1).normalize(),
    new THREE.Vector3(1, -1, -1).normalize(),
    new THREE.Vector3(-1, -1, 1).normalize(),
  ]
  const dimNodesAll: NetNode[][] = []
  for (let d = 0; d < dimensions; d++) {
    const dimNodes: NetNode[] = []
    for (let i = 0; i < nodesPerDimension; i++) {
      const distance = maxRadius * Math.pow(Math.random(), 0.7)
      const rnd = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1),
        THREE.MathUtils.randFloatSpread(1),
        THREE.MathUtils.randFloatSpread(1),
      ).normalize()
      const biased = new THREE.Vector3()
        .addVectors(dimVecs[d].clone().multiplyScalar(0.6 + Math.random() * 0.4), rnd.multiplyScalar(0.3))
        .normalize()
      const pos = biased.multiplyScalar(distance)
      const isLeaf = Math.random() < 0.4 || distance > maxRadius * 0.8
      const level = Math.floor(distance / (maxRadius / 4)) + 1
      const n = new NetNode(pos, level, isLeaf ? 1 : 0)
      n.distanceFromRoot = distance
      nodes.push(n)
      dimNodes.push(n)
      if (distance < maxRadius * 0.3) root.addConnection(n, 0.7)
    }
    dimNodesAll.push(dimNodes)
  }
  for (const dimNodes of dimNodesAll) {
    dimNodes.sort((a, b) => a.distanceFromRoot - b.distanceFromRoot)
    const layers = 4
    const per = Math.ceil(dimNodes.length / layers)
    for (let layer = 0; layer < layers; layer++) {
      const s = layer * per
      const e = Math.min(s + per, dimNodes.length)
      for (let i = s; i < e; i++) {
        const node = dimNodes[i]
        const cnt = 1 + Math.floor(Math.random() * 3)
        const near = dimNodes
          .slice(s, e)
          .filter((n) => n !== node)
          .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position))
        for (let j = 0; j < Math.min(cnt, near.length); j++) node.addConnection(near[j], 0.4 + Math.random() * 0.4)
        if (layer > 0) {
          const prev = dimNodes
            .slice((layer - 1) * per, layer * per)
            .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position))
          if (prev.length > 0) node.addConnection(prev[0], 0.8)
        }
      }
    }
  }
  for (let d1 = 0; d1 < dimensions; d1++) {
    for (let d2 = d1 + 1; d2 < dimensions; d2++) {
      for (let i = 0; i < 5; i++) {
        const n1 = dimNodesAll[d1][Math.floor(Math.random() * dimNodesAll[d1].length)]
        const n2 = dimNodesAll[d2][Math.floor(Math.random() * dimNodesAll[d2].length)]
        if (n1.isConnectedTo(n2)) continue
        const mid = new THREE.Vector3().lerpVectors(n1.position, n2.position, 0.5)
        mid.add(new THREE.Vector3(THREE.MathUtils.randFloatSpread(2), THREE.MathUtils.randFloatSpread(2), THREE.MathUtils.randFloatSpread(2)))
        const inter = new NetNode(mid, Math.max(n1.level, n2.level), 0)
        inter.distanceFromRoot = root.position.distanceTo(mid)
        nodes.push(inter)
        n1.addConnection(inter, 0.5)
        inter.addConnection(n2, 0.5)
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    const sd = Math.floor(Math.random() * dimensions)
    const ed = (sd + 2) % dimensions
    const sn = dimNodesAll[sd][Math.floor(Math.random() * dimNodesAll[sd].length)]
    const en = dimNodesAll[ed][Math.floor(Math.random() * dimNodesAll[ed].length)]
    if (sn.isConnectedTo(en)) continue
    const numPoints = 3 + Math.floor(Math.random() * 3)
    let prev = sn
    for (let j = 1; j < numPoints; j++) {
      const t = j / numPoints
      const pos = new THREE.Vector3().lerpVectors(sn.position, en.position, t)
      pos.add(new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI),
        THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI),
        THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI),
      ))
      const jn = new NetNode(pos, Math.max(sn.level, en.level), 0)
      jn.distanceFromRoot = root.position.distanceTo(pos)
      nodes.push(jn)
      prev.addConnection(jn, 0.4)
      prev = jn
    }
    prev.addConnection(en, 0.4)
  }
  return nodes
}

export function mountNetworkScene(container: HTMLElement): VisualController {
  const lowPower = isLowPowerDevice()
  const canvas = document.createElement("canvas")
  canvas.style.cssText = "display:block;width:100%;height:100%;cursor:pointer"
  container.appendChild(canvas)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0015)
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1200)
  camera.position.set(0, 5, 22)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: "high-performance" })
  renderer.setPixelRatio(pixelRatio())
  renderer.setClearColor(0x000000)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const starField = createStarfield()
  scene.add(starField)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.rotateSpeed = 0.5
  controls.minDistance = 5
  controls.maxDistance = 100
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.15
  controls.enablePan = false
  controls.enableZoom = false

  let composer: EffectComposer | null = null
  let bloom: UnrealBloomPass | null = null
  if (!lowPower) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.3, 0.85)
    composer.addPass(bloom)
    composer.addPass(new OutputPass())
  }

  const { nodesMesh, linesMesh } = buildNetworkMeshes(
    generateNetwork(),
    palette,
    0.5,
    (c) => c.offsetHSL(THREE.MathUtils.randFloatSpread(0.05), THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1)),
    (c) => c.offsetHSL(THREE.MathUtils.randFloatSpread(0.05), THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1)),
  )
  scene.add(nodesMesh, linesMesh)

  let time = 0
  const pulse = createPulseTrigger(camera, canvas, [nodesMesh.material, linesMesh.material], palette, () => time)
  const onClick = (e: MouseEvent) => pulse(e.clientX, e.clientY)
  const onTouch = (e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length > 0) pulse(e.touches[0].clientX, e.touches[0].clientY)
  }
  canvas.addEventListener("click", onClick)
  canvas.addEventListener("touchstart", onTouch, { passive: false })

  const draw = () => (composer ? composer.render() : renderer.render(scene, camera))

  const loop = createRenderLoop(container, (t) => {
    time = t
    nodesMesh.material.uniforms.uTime.value = t
    linesMesh.material.uniforms.uTime.value = t
    const ry = Math.sin(t * 0.05) * 0.08
    nodesMesh.rotation.y = ry
    linesMesh.rotation.y = ry
    starField.rotation.y += 0.0003
    controls.update()
    draw()
  })

  const stopResize = observeSize(container, (w, h) => {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h, false)
    composer?.setSize(w, h)
    bloom?.resolution.set(w, h)
    if (!loop.running) loop.renderOnce()
  })

  return {
    setActive: loop.setActive,
    dispose() {
      loop.dispose()
      stopResize()
      canvas.removeEventListener("click", onClick)
      canvas.removeEventListener("touchstart", onTouch)
      controls.dispose()
      disposeObject(scene)
      composer?.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
