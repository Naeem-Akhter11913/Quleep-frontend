// Mock products list. Each product has a modelUrl pointing to a .glb file (hosted publicly).
// You can replace these with your own hosted .glb files later.
const productsData = [
  {
    id: '1',
    name: 'Wooden Chair',
    category: 'Furniture',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e8b2e5a0a9e4e18d2b2bb1a2c2c2f4d',
    description: 'A cozy wooden chair for your living room.',
    modelUrl: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/Duck/glTF-Binary/Duck.glb'
  },
  {
    id: '2',
    name: 'Minimalist Lamp',
    category: 'Lighting',
    price: 49.5,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e8b2e5a0a9e4e18d2b2bb1a2c2c2f4d',
    description: 'Sleek lamp that brightens your workspace.',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
  },
  {
    id: '3',
    name: 'Designer Table',
    category: 'Furniture',
    price: 199.0,
    image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e8b2e5a0a9e4e18d2b2bb1a2c2c2f4d',
    description: 'A modern table for dining or work.',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb'
  }
]

export default productsData
