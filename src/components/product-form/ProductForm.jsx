import React, { useState, useEffect } from "react";
import { api } from "../../utils/constants";

function ProductForm({ existingProduct, onSave }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (existingProduct) {
      setProductName(existingProduct.productName || "");
      setProductDescription(existingProduct.productDescription || "");
      setPrice(existingProduct.price || "");
      setInStock(existingProduct.inStock || false);
    }
  }, [existingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      productDescription,
      price: Number(price),
      inStock,
    };

    if (existingProduct) {
      fetch(`${api}/products/${existingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product updated:", data);
          onSave();
        })
        .catch((error) => console.error("Error updating product:", error));
    } else {
      fetch(`${api}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product created:", data);
          onSave();
        })
        .catch((error) => console.error("Error creating product:", error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ürün Adı</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Açıklama</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fiyat</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>
          Stok Durumu
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </label>
      </div>
      <button type="submit">
        {existingProduct ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
      </button>
    </form>
  );
}

export default ProductForm;
