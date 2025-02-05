import { Suspense, useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Chevrolet from '../../public/Chevrolet/Chevrolet';
import Gun1 from '../../public/Gun1/Gun1';
import Gun2 from '../../public/Gun2/Gun2';
import Lamborghini from '../../public/Lamborghini/Lamborghini';
import Skull from '../../public/Skull/Skull';
import Tree from '../../public/Tree/Tree';
import Wolf from '../../public/Wolf/Wolf';
import Xbox from '../../public/Xbox/Xbox';
import Whale from '../../public/Whale/Whale';

import './SkullRender.css';

function MeshRenderer() {
    const [randomModel, setRandomModel] = useState(null);

    const models = [
        { component: Chevrolet, scale: 2, name: "Chevrolet" },
        { component: Gun1, scale: 4, name: "Gun1" },
        { component: Gun2, scale: 4, name: "Gun2" },
        { component: Lamborghini, scale: 150, name: "Lamborghini" },
        { component: Skull, scale: 2, name: "Skull" },
        { component: Tree, scale: 4, name: "Tree" },
        { component: Wolf, scale: .2, name: "Wolf" },
        { component: Whale, scale: .3, name: "Whale" },
        { component: Xbox, scale: .01, name: "Xbox" },
    ];

    useEffect(() => {
        // Select a random model when the component mounts
        const randomIndex = Math.floor(Math.random() * models.length);
        setRandomModel(models[randomIndex]);
    }, []);

    return (
        <Canvas dpr={[1, 2]}>
            <ambientLight intensity={2} />
            <OrbitControls enableZoom={false} />
            <Suspense fallback={null}>
                {randomModel && (
                    <randomModel.component scale={randomModel.scale} />
                )}
                <Environment preset="forest" background />
            </Suspense>
        </Canvas>
    );
}

export default MeshRenderer;
