import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg">
          <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-2" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">{product.category}</p>
          <p className="text-green-500 font-semibold">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
