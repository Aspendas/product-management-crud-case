import React, { useState, useEffect } from "react";
import { api } from "../../utils/constants";
import "./product-form.css";

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
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Ürün Adı</label>
        <input
          type="text"
          className="form-input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Açıklama</label>
        <textarea
          className="form-textarea"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Fiyat</label>
        <input
          type="number"
          className="form-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          Stok Durumu
          <input
            type="checkbox"
            className="form-checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
        </label>
      </div>
      <button className="submit-button" type="submit">
        {existingProduct ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
      </button>
    </form>
  );
}

export default ProductForm;
