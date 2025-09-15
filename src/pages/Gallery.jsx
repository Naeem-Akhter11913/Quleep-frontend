import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProduct } from "../store/action/product.action";

const Gallery = () => {
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { products, productLoading } = useSelector((state) => state.productSlice);


  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (accessToken) {
      dispatch(getProduct());
    }
  }, [dispatch, accessToken]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery);
      const matchesCategory = category === "All" || p.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, category]);

  

  if (productLoading) return <p>Loading...</p>;

  return (
    <section className="container page gallery">
      <div className="controls">
        <input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <ProductCard product={p} key={p._id} />)
        ) : (
          <div className="empty">No products found.</div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
