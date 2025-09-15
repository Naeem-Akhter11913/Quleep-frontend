import { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

const ModelLoader = ({ url, setSceneBounds }) => {
    const ref = useRef()
    const [gltf, setGltf] = useState(null);

    useEffect(() => {
        if (!url) return;

        let mounted = true
        const loader = new GLTFLoader()
        loader.load(
            url,
            gltf => {
                if (!mounted) return;


                const box = new THREE.Box3().setFromObject(gltf.scene)
                const center = box.getCenter(new THREE.Vector3())
                gltf.scene.position.sub(center)

                const size = box.getSize(new THREE.Vector3())
                const maxAxis = Math.max(size.x, size.y, size.z)

                setSceneBounds && setSceneBounds(maxAxis * 2)

                gltf.scene.scale.set(1.2, 1.2, 1.2)

                setGltf(gltf)
            },
            undefined,
            err => {
                console.error('Error loading GLB', err)
            }
        )

        return () => (mounted = false)
    }, [url, setSceneBounds])

    if (!gltf) return null

    return <primitive ref={ref} object={gltf.scene} />
}

export default ModelLoader;