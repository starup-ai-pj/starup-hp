// ネットワーク系 3D（トップのヒーロー / サービス紹介の 3 層）で共通のシェーダとメッシュ生成
// 元: public/html/network-background*.html（見た目は変えずに移植）

import * as THREE from "three"

const noiseFunctions = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m*=m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p,float time){
    float value=0.0;float amplitude=0.5;float frequency=1.0;int octaves=3;
    for(int i=0;i<octaves;i++){
        value+=amplitude*snoise(p*frequency+time*0.2*frequency);
        amplitude*=0.5;frequency*=2.0;
    }
    return value;
}`

const pulseFn = `
float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
    if (pulseTime < 0.0) return 0.0;
    float timeSinceClick = uTime - pulseTime;
    if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;
    float pulseRadius = timeSinceClick * uPulseSpeed;
    float distToClick = distance(worldPos, pulsePos);
    float pulseThickness = 2.0;
    float waveProximity = abs(distToClick - pulseRadius);
    return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
}`

const nodeVertex = `${noiseFunctions}
attribute float nodeSize;attribute float nodeType;attribute vec3 nodeColor;attribute float distanceFromRoot;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;uniform float uBaseNodeSize;
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;
${pulseFn}
void main() {
    vNodeType = nodeType;
    vColor = nodeColor;
    vDistanceFromRoot = distanceFromRoot;
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vPosition = worldPos;
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    float timeScale = 0.5 + 0.5 * sin(uTime * 0.8 + distanceFromRoot * 0.2);
    float baseSize = nodeSize * (0.8 + 0.2 * timeScale);
    float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.0);
    vec3 modifiedPosition = position;
    if (nodeType > 0.5) {
        float noise = fbm(position * 0.1, uTime * 0.1);
        modifiedPosition += normal * noise * 0.2;
    }
    vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_PointSize = pulseSize * uBaseNodeSize * (800.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}`

const nodeFragment = `
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;
void main() {
    vec2 center = 2.0 * gl_PointCoord - 1.0;
    float dist = length(center);
    if (dist > 1.0) discard;
    float glowStrength = 1.0 - smoothstep(0.0, 1.0, dist);
    glowStrength = pow(glowStrength, 1.4);
    vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.5 + vDistanceFromRoot * 0.3));
    vec3 finalColor = baseColor;
    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
        finalColor = mix(baseColor, pulseColor, vPulseIntensity);
        finalColor *= (1.0 + vPulseIntensity * 0.7);
    }
    float alpha = glowStrength * (0.9 - 0.5 * dist);
    float camDistance = length(vPosition - cameraPosition);
    float distanceFade = smoothstep(80.0, 10.0, camDistance);
    if (vNodeType > 0.5) {
        alpha *= 0.85;
    } else {
        finalColor *= 1.2;
    }
    gl_FragColor = vec4(finalColor, alpha * distanceFade);
}`

const connectionVertex = `${noiseFunctions}
attribute vec3 startPoint;attribute vec3 endPoint;attribute float connectionStrength;attribute float pathIndex;attribute vec3 connectionColor;
uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;
varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;
${pulseFn}
void main() {
    float t = position.x;
    vPathPosition = t;
    vec3 midPoint = mix(startPoint, endPoint, 0.5);
    float pathOffset = sin(t * 3.14159) * 0.1;
    vec3 perpendicular = normalize(cross(normalize(endPoint - startPoint), vec3(0.0, 1.0, 0.0)));
    if (length(perpendicular) < 0.1) perpendicular = vec3(1.0, 0.0, 0.0);
    midPoint += perpendicular * pathOffset;
    vec3 p0 = mix(startPoint, midPoint, t);
    vec3 p1 = mix(midPoint, endPoint, t);
    vec3 finalPos = mix(p0, p1, t);
    float noiseTime = uTime * 0.2;
    float noise = fbm(vec3(pathIndex * 0.1, t * 0.5, noiseTime), noiseTime);
    finalPos += perpendicular * noise * 0.1;
    vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    vColor = connectionColor;
    vConnectionStrength = connectionStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}`

const connectionFragment = `
uniform float uTime;uniform vec3 uPulseColors[3];
varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;
void main() {
    vec3 baseColor = vColor * (0.7 + 0.3 * sin(uTime * 0.5 + vPathPosition * 10.0));
    float flowPattern = sin(vPathPosition * 20.0 - uTime * 3.0) * 0.5 + 0.5;
    float flowIntensity = 0.3 * flowPattern * vConnectionStrength;
    vec3 finalColor = baseColor;
    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
        finalColor = mix(baseColor, pulseColor, vPulseIntensity);
        flowIntensity += vPulseIntensity * 0.5;
    }
    finalColor *= (0.6 + flowIntensity + vConnectionStrength * 0.4);
    float alpha = 0.8 * vConnectionStrength + 0.2 * flowPattern;
    alpha = mix(alpha, min(1.0, alpha * 2.0), vPulseIntensity);
    gl_FragColor = vec4(finalColor, alpha);
}`

export class NetNode {
  connections: { node: NetNode; strength: number }[] = []
  size: number
  distanceFromRoot = 0
  constructor(public position: THREE.Vector3, public level = 0, public type = 0) {
    this.size = type === 0 ? THREE.MathUtils.randFloat(0.7, 1.2) : THREE.MathUtils.randFloat(0.4, 0.9)
  }
  addConnection(node: NetNode, strength = 1.0) {
    if (!this.isConnectedTo(node)) {
      this.connections.push({ node, strength })
      node.connections.push({ node: this, strength })
    }
  }
  isConnectedTo(node: NetNode) {
    return this.connections.some((c) => c.node === node)
  }
}

function makeUniforms(baseNodeSize: number, palette: THREE.Color[]) {
  return {
    uTime: { value: 0.0 },
    uPulsePositions: { value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)] },
    uPulseTimes: { value: [-1e3, -1e3, -1e3] },
    uPulseColors: { value: [palette[0].clone(), palette[1].clone(), palette[2].clone()] },
    uPulseSpeed: { value: 15.0 },
    uBaseNodeSize: { value: baseNodeSize },
  }
}

/**
 * ノード群と接続線のメッシュを作る。
 * 元コードは nodes.indexOf() を接続ごとに呼んでいて O(N²) だったので、Map で引くようにした（結果は同じ）。
 */
export function buildNetworkMeshes(
  nodes: NetNode[],
  palette: THREE.Color[],
  baseNodeSize: number,
  jitterNodeColor: (c: THREE.Color) => void,
  jitterLineColor: (c: THREE.Color) => void,
) {
  const indexOf = new Map<NetNode, number>()
  nodes.forEach((n, i) => indexOf.set(n, i))

  const nodePositions: number[] = [], nodeTypes: number[] = [], nodeSizes: number[] = [], nodeColors: number[] = [], dists: number[] = []
  for (const node of nodes) {
    nodePositions.push(node.position.x, node.position.y, node.position.z)
    nodeTypes.push(node.type)
    nodeSizes.push(node.size)
    dists.push(node.distanceFromRoot)
    const c = palette[Math.min(node.level, palette.length - 1) % palette.length].clone()
    jitterNodeColor(c)
    nodeColors.push(c.r, c.g, c.b)
  }
  const nodesGeometry = new THREE.BufferGeometry()
  nodesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3))
  nodesGeometry.setAttribute("nodeType", new THREE.Float32BufferAttribute(nodeTypes, 1))
  nodesGeometry.setAttribute("nodeSize", new THREE.Float32BufferAttribute(nodeSizes, 1))
  nodesGeometry.setAttribute("nodeColor", new THREE.Float32BufferAttribute(nodeColors, 3))
  nodesGeometry.setAttribute("distanceFromRoot", new THREE.Float32BufferAttribute(dists, 1))
  const nodesMaterial = new THREE.ShaderMaterial({
    uniforms: makeUniforms(baseNodeSize, palette),
    vertexShader: nodeVertex,
    fragmentShader: nodeFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial)

  const cPos: number[] = [], cStart: number[] = [], cEnd: number[] = [], cStrength: number[] = [], cColor: number[] = [], cPath: number[] = []
  const seen = new Set<string>()
  let pathIndex = 0
  const SEGMENTS = 15
  nodes.forEach((node, ni) => {
    for (const conn of node.connections) {
      const ci = indexOf.get(conn.node)
      if (ci === undefined) continue
      const key = ni < ci ? `${ni}-${ci}` : `${ci}-${ni}`
      if (seen.has(key)) continue
      seen.add(key)
      const s = node.position, e = conn.node.position
      const lvl = Math.min(Math.floor((node.level + conn.node.level) / 2), palette.length - 1)
      for (let i = 0; i < SEGMENTS; i++) {
        cPos.push(i / (SEGMENTS - 1), 0, 0)
        cStart.push(s.x, s.y, s.z)
        cEnd.push(e.x, e.y, e.z)
        cPath.push(pathIndex)
        cStrength.push(conn.strength)
        const c = palette[lvl % palette.length].clone()
        jitterLineColor(c)
        cColor.push(c.r, c.g, c.b)
      }
      pathIndex++
    }
  })
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(cPos, 3))
  lineGeometry.setAttribute("startPoint", new THREE.Float32BufferAttribute(cStart, 3))
  lineGeometry.setAttribute("endPoint", new THREE.Float32BufferAttribute(cEnd, 3))
  lineGeometry.setAttribute("connectionStrength", new THREE.Float32BufferAttribute(cStrength, 1))
  lineGeometry.setAttribute("connectionColor", new THREE.Float32BufferAttribute(cColor, 3))
  lineGeometry.setAttribute("pathIndex", new THREE.Float32BufferAttribute(cPath, 1))
  const lineMaterial = new THREE.ShaderMaterial({
    uniforms: makeUniforms(baseNodeSize, palette),
    vertexShader: connectionVertex,
    fragmentShader: connectionFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)

  return { nodesMesh, linesMesh }
}

/** クリック/タップ位置から波紋（pulse）を出す。座標は canvas 基準で計算する。 */
export function createPulseTrigger(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
  materials: THREE.ShaderMaterial[],
  palette: THREE.Color[],
  now: () => number,
) {
  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  const hit = new THREE.Vector3()
  let idx = 0
  return (clientX: number, clientY: number) => {
    const r = canvas.getBoundingClientRect()
    pointer.x = ((clientX - r.left) / r.width) * 2 - 1
    pointer.y = -((clientY - r.top) / r.height) * 2 + 1
    raycaster.setFromCamera(pointer, camera)
    plane.normal.copy(camera.position).normalize()
    plane.constant = -plane.normal.dot(camera.position) + camera.position.length() * 0.5
    if (!raycaster.ray.intersectPlane(plane, hit)) return
    idx = (idx + 1) % 3
    const color = palette[Math.floor(Math.random() * palette.length)]
    for (const m of materials) {
      m.uniforms.uPulsePositions.value[idx].copy(hit)
      m.uniforms.uPulseTimes.value[idx] = now()
      m.uniforms.uPulseColors.value[idx].copy(color)
    }
  }
}

export function disposeObject(obj: THREE.Object3D) {
  obj.traverse((o) => {
    const m = o as THREE.Mesh
    m.geometry?.dispose()
    const mat = m.material as THREE.Material | THREE.Material[] | undefined
    if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
    else mat?.dispose()
  })
}
