// トップのサービス紹介背景（白い 3 層のネットワーク + ガラスのスラブ）
// 元: public/html/network-background-4layer.html
//
// 元からの変更点
// - スマホ相当ではブルームとフィルムを切る
// - pixelRatio の上限 2 → 1.5
// - 見えていない間は描画を止める
// - フォーカス層の指定は postMessage ではなく関数呼び出し（setFocusLayer）

import * as THREE from "three"
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { FilmPass } from "three/addons/postprocessing/FilmPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { createRenderLoop, isLowPowerDevice, observeSize, pixelRatio, type VisualController } from "./core"
import { NetNode, buildNetworkMeshes, createPulseTrigger, disposeObject } from "./network-common"

export const LAYER_COUNT = 3
const LAYER_SPACING = 8

const palette = [
  new THREE.Color(1.0, 1.0, 1.0),
  new THREE.Color(0.85, 0.85, 0.85),
  new THREE.Color(0.7, 0.7, 0.7),
  new THREE.Color(0.55, 0.55, 0.55),
  new THREE.Color(0.4, 0.4, 0.4),
]

// 層ごとの強さ [底, 中, 天]（元コードの調整値そのまま）
const BASE_INTENSITIES = [0.4, 0.4, 0.4]
const FOCUS_INTENSITIES = [1.4, 0.95, 0.55]
const DIM_INTENSITIES = [0.1, 0.1, 0.08]

function generateNetwork(): NetNode[] {
  const nodes: NetNode[] = []
  const root = new NetNode(new THREE.Vector3(0, 0, 0), 0, 0)
  root.size = 1.5
  nodes.push(root)

  const GRID_N = 28
  const HALF_W = 14
  const HALF_H = 0.4
  const HALF_W_EXTRA = 14.5
  const HALF_H_EXTRA = 0.55
  const step = (HALF_W * 2) / (GRID_N - 1)
  const layers: { nodes: NetNode[]; grid: (NetNode | null)[][] }[] = []

  for (let l = 0; l < LAYER_COUNT; l++) {
    const yOffset = (l - (LAYER_COUNT - 1) / 2) * LAYER_SPACING
    const layerNodes: NetNode[] = []
    const grid: (NetNode | null)[][] = []

    for (let zi = 0; zi < GRID_N; zi++) {
      const row: (NetNode | null)[] = []
      for (let xi = 0; xi < GRID_N; xi++) {
        if (Math.random() < 0.25) { row.push(null); continue }
        const r = Math.random()
        const jitter = r < 0.07 ? step * 1.1 : r < 0.55 ? step * 0.55 : step * 0.22
        const pos = new THREE.Vector3(
          -HALF_W + xi * step + THREE.MathUtils.randFloatSpread(jitter),
          yOffset + THREE.MathUtils.randFloatSpread(HALF_H * 2),
          -HALF_W + zi * step + THREE.MathUtils.randFloatSpread(jitter),
        )
        const distance = pos.length()
        const n = new NetNode(pos, Math.min(4, Math.floor(distance / 4) + 1), Math.random() < 0.25 ? 1 : 0)
        n.distanceFromRoot = distance
        nodes.push(n)
        layerNodes.push(n)
        row.push(n)
      }
      grid.push(row)
    }

    const extraNodes: NetNode[] = []
    for (let i = 0; i < 200; i++) {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(HALF_W_EXTRA * 2),
        yOffset + THREE.MathUtils.randFloatSpread(HALF_H_EXTRA * 2),
        THREE.MathUtils.randFloatSpread(HALF_W_EXTRA * 2),
      )
      const distance = pos.length()
      const n = new NetNode(pos, Math.min(4, Math.floor(distance / 4) + 1), Math.random() < 0.5 ? 1 : 0)
      n.distanceFromRoot = distance
      nodes.push(n)
      layerNodes.push(n)
      extraNodes.push(n)
    }

    for (let zi = 0; zi < GRID_N; zi++) {
      for (let xi = 0; xi < GRID_N; xi++) {
        const n = grid[zi][xi]
        if (!n) continue
        const right = xi < GRID_N - 1 ? grid[zi][xi + 1] : null
        const down = zi < GRID_N - 1 ? grid[zi + 1][xi] : null
        if (right) n.addConnection(right, 0.5 + Math.random() * 0.3)
        if (down) n.addConnection(down, 0.5 + Math.random() * 0.3)
      }
    }

    // off-grid を同層内の最寄りに接続（元は全件ソート。上位 2 件だけ拾えば結果は同じ）
    for (const ex of extraNodes) {
      const cnt = 1 + Math.floor(Math.random() * 2)
      const best: { n: NetNode; d: number }[] = []
      for (const n of layerNodes) {
        if (n === ex) continue
        const d = ex.position.distanceToSquared(n.position)
        if (best.length < cnt || d < best[best.length - 1].d) {
          best.push({ n, d })
          best.sort((a, b) => a.d - b.d)
          if (best.length > cnt) best.pop()
        }
      }
      for (const b of best) ex.addConnection(b.n, 0.35)
    }

    const diagonals = Math.floor(GRID_N * GRID_N * 0.18)
    for (let i = 0; i < diagonals; i++) {
      const zi = Math.floor(Math.random() * (GRID_N - 1))
      const xi = Math.floor(Math.random() * (GRID_N - 1))
      const n = grid[zi][xi]
      if (!n) continue
      const target = Math.random() < 0.5 ? grid[zi + 1][xi + 1] : xi > 0 ? grid[zi + 1][xi - 1] : null
      if (target) n.addConnection(target, 0.3)
    }
    layers.push({ nodes: layerNodes, grid })
  }

  for (let l = 0; l < LAYER_COUNT - 1; l++) {
    const layerB = layers[l + 1].nodes
    for (const a of layers[l].nodes) {
      if (Math.random() > 0.005) continue
      let bestB: NetNode | null = null
      let bestD = Infinity
      for (const b of layerB) {
        const dx = a.position.x - b.position.x
        const dz = a.position.z - b.position.z
        const d = dx * dx + dz * dz
        if (d < bestD) { bestD = d; bestB = b }
      }
      if (bestB) a.addConnection(bestB, 0.15)
    }
  }

  const c = Math.floor(GRID_N / 2)
  const center = layers[Math.floor(LAYER_COUNT / 2)].grid[c][c]
  if (center) root.addConnection(center, 0.8)
  return nodes
}

function createGlassSlabs(camera: THREE.Camera) {
  const geo = new RoundedBoxGeometry(26, 0.45, 26, 4, 0.08)
  const group = new THREE.Group()
  const materials: THREE.ShaderMaterial[] = []
  for (let l = 0; l < LAYER_COUNT; l++) {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uCameraPos: { value: camera.position },
        uCenterColor: { value: new THREE.Color(0x080808) },
        uEdgeColor: { value: new THREE.Color(0xffffff) },
        uFresnelPower: { value: 2.5 },
        uIntensity: { value: 0.4 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader: `
        uniform vec3 uCameraPos;
        uniform vec3 uCenterColor;
        uniform vec3 uEdgeColor;
        uniform float uFresnelPower;
        uniform float uIntensity;
        varying vec3 vWorldPos;
        varying vec3 vWorldNormal;
        void main() {
          vec3 V = normalize(uCameraPos - vWorldPos);
          float NdotV = abs(dot(V, vWorldNormal));
          float fresnel = pow(1.0 - NdotV, uFresnelPower);
          vec3 color = mix(uCenterColor, uEdgeColor, fresnel) * uIntensity;
          gl_FragColor = vec4(color, 1.0);
        }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const m = new THREE.Mesh(geo, mat)
    m.position.y = (l - (LAYER_COUNT - 1) / 2) * LAYER_SPACING
    group.add(m)
    materials.push(mat)
  }
  return { group, materials }
}

export interface LayeredNetworkController extends VisualController {
  /** -1 = フォーカス無し / 0..LAYER_COUNT-1 = その層を明るく（0 が一番下） */
  setFocusLayer(layer: number): void
}

export function mountLayeredNetworkScene(container: HTMLElement): LayeredNetworkController {
  const lowPower = isLowPowerDevice()
  const canvas = document.createElement("canvas")
  canvas.style.cssText = "display:block;width:100%;height:100%;cursor:pointer"
  container.appendChild(canvas)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0015)
  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1200)
  camera.position.set(0, 20, 36)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lowPower, powerPreference: "high-performance" })
  renderer.setPixelRatio(pixelRatio())
  renderer.setClearColor(0x000000)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  let composer: EffectComposer | null = null
  let bloom: UnrealBloomPass | null = null
  if (!lowPower) {
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.9, 0.4, 0.75)
    composer.addPass(bloom)
    // 元コードの FilmPass(0.35, 0.55, ...) は (intensity=0.35, grayscale=true) として効いていた
    composer.addPass(new FilmPass(0.35, true))
    composer.addPass(new OutputPass())
  }

  const { nodesMesh, linesMesh } = buildNetworkMeshes(
    generateNetwork(),
    palette,
    0.32,
    (c) => c.multiplyScalar(0.75 + Math.random() * 0.5),
    (c) => c.multiplyScalar(0.7 + Math.random() * 0.5),
  )
  scene.add(nodesMesh, linesMesh)
  const slabs = createGlassSlabs(camera)
  scene.add(slabs.group)

  let time = 0
  let focusLayer = -1
  const pulse = createPulseTrigger(camera, canvas, [nodesMesh.material, linesMesh.material], palette, () => time)
  const onClick = (e: MouseEvent) => pulse(e.clientX, e.clientY)
  canvas.addEventListener("click", onClick)

  const FIXED_Y_ROT = 0.4
  const draw = () => (composer ? composer.render() : renderer.render(scene, camera))

  const loop = createRenderLoop(container, (t) => {
    time = t
    const yRot = FIXED_Y_ROT + t * 0.01 + Math.sin(t * 0.05) * 0.04
    nodesMesh.material.uniforms.uTime.value = t
    linesMesh.material.uniforms.uTime.value = t
    nodesMesh.rotation.y = yRot
    linesMesh.rotation.y = yRot
    slabs.group.rotation.y = yRot
    slabs.materials.forEach((mat, l) => {
      const target = focusLayer === -1 ? BASE_INTENSITIES[l] : l === focusLayer ? FOCUS_INTENSITIES[l] : DIM_INTENSITIES[l]
      const cur = mat.uniforms.uIntensity.value as number
      mat.uniforms.uIntensity.value = cur + (target - cur) * 0.08
    })
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
    setFocusLayer(layer: number) {
      if (layer >= -1 && layer < LAYER_COUNT) focusLayer = layer
    },
    dispose() {
      loop.dispose()
      stopResize()
      canvas.removeEventListener("click", onClick)
      disposeObject(scene)
      composer?.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
