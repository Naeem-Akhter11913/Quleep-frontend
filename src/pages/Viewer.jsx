import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModelLoader from '../components/ModelLoader';
import Loader from '../components/Loader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Viewer = () => {
  const { id } = useParams();
  const location = useLocation();
  const { products = [] } = useSelector(state => state.productSlice);

  const product = useMemo(() => {
    return location.state?.product || products.find(p => p._id === id);
  }, [id, location.state, products]);

  const [modelUrl, setModelUrl] = useState(product?.modelUrl || "");
  const [dragOver, setDragOver] = useState(false);
  const [sceneScale, setSceneScale] = useState(5);

  useEffect(() => {
    if (product?.modelUrl) {
      setModelUrl(product.modelUrl);
    }
  }, [product]);

  const handleFile = (file) => {
    if (!file) return;
    setModelUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  if (!product) return <div>No product found</div>;

  return (
    <section className="container page viewer">
      <div className="viewer-left">
        <div
          className={`dropzone ${dragOver ? "dragover" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Canvas camera={{ position: [0, 1.5, sceneScale], fov: 50 }}>
            <React.Suspense fallback={<Loader />}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 10, 5]} intensity={1} />
              <directionalLight position={[-5, -10, -5]} intensity={0.5} />

              {modelUrl && (
                <ModelLoader
                  url={modelUrl}
                  setSceneBounds={(b) => setSceneScale(Math.max(4, b))}
                />
              )}

              <OrbitControls enablePan enableZoom />
            </React.Suspense>
          </Canvas>

          <div className="drop-hint">
            Drag & drop a <code>.glb/.gltf</code> file here to replace model, or{" "}
            <label className="file-input-label">
              <input
                type="file"
                accept=".glb,.gltf"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              choose file
            </label>
          </div>
        </div>
      </div>

      <aside className="viewer-right">
        <h2>{product.name}</h2>
        <p className="muted">{product.category}</p>
        <div className="price">₹{product.price?.toFixed(2)}</div>
        <p>{product.description}</p>

        <div className="model-info">
          <div>
            <strong>Model URL:</strong>{" "}
            <span className="small">{modelUrl}</span>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Viewer;
