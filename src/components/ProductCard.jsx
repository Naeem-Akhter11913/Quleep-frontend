import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const nav = useNavigate()
    return (
        <div
            className="product-card"
            onClick={() => nav(`/viewer/${product._id}`, { state: { product } })}
        >
            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="muted">{product.category}</p>
                <div className="price">₹{product.price.toFixed(2)}</div>
            </div>
        </div>
    )
}

export default ProductCard