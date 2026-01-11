"use client"

import dynamic from "next/dynamic"

const Background3DScene = dynamic(() => import("./background-3d-scene"), {
  ssr: false,
})

export default function AnimatedBackground() {
  return <Background3DScene />
}
