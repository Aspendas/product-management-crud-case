import React, { useState, useEffect } from "react";
import { api } from "../../utils/constants";
import "./product-list.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(api + "/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    console.log("Products fetched:", products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = () => {};

  const handleDeleteClick = (id) => {
    fetch(`${api}/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchProducts();
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th className="span-2">Ürün Adı</th>
          <th className="span-7">Açıklama</th>
          <th className="span-1">Fiyat</th>
          <th className="span-1">Stok Durumu</th>
          <th className="span-1">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="span-2">{product.productName}</td>
            <td className="span-7">{product.productDescription}</td>
            <td className="span-1">
              {product.price ? `₺${product.price}` : "Belirtilmemiş"}
            </td>
            <td className="span-1">
              {product.inStock ? "Stokta var" : "Stokta yok"}
            </td>
            <td className="span-1">
              <button>Edit</button>
              <button onClick={() => handleDeleteClick(product.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
