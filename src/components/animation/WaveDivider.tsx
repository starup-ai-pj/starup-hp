"use client"

import WaveCanvas from "./WaveCanvas"

export default function WaveDivider() {
  return (
    <div className="relative z-20 -my-[10vh] md:-my-[15vh] h-[30vh] md:h-[40vh] pointer-events-none">
      <WaveCanvas hue={220} />
    </div>
  )
}
