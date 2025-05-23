/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 .\gun2.gltf 
Author: Назар Окружко (https://sketchfab.com/Deduska_1947)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/under-development-sturmgewehr-n-1961-c520eed5335648beb08fc0834ecbb886
Title: [Under Development] Sturmgewehr (N) 1961
*/

import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export default function Model(props) {
  const { scene } = useGLTF('/Gun2/gun2.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      <skinnedMesh geometry={nodes.Object_7.geometry} material={materials.Material} skeleton={nodes.Object_7.skeleton} />
      <skinnedMesh geometry={nodes.Object_9.geometry} material={materials.Material} skeleton={nodes.Object_9.skeleton} />
      <skinnedMesh geometry={nodes.Object_11.geometry} material={materials.rifle_a} skeleton={nodes.Object_11.skeleton} />
      <skinnedMesh geometry={nodes.Object_13.geometry} material={materials.rifle_a} skeleton={nodes.Object_13.skeleton} />
      <skinnedMesh geometry={nodes.Object_15.geometry} material={materials.Material} skeleton={nodes.Object_15.skeleton} />
    </group>
  )
}

useGLTF.preload('/Gun2/gun2.gltf')
