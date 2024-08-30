import React, { useState, useEffect } from "react";
import "./App.css";
import ProductList from "./components/product-list/ProductList";
import Modal from "./components/modal/Modal";
import ProductForm from "./components/product-form/ProductForm";
import { api } from "./utils/constants";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(api + "/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedData);
        console.log("Fetched Products:", sortedData);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    closeModal();
    fetchProducts();
  };

  return (
    <div className="app-container">
      <h1>Ürün Listesi</h1>
      <button className="add-button" onClick={openModal}>
        Ürün Ekle
      </button>
      <ProductList products={products} fetchProducts={fetchProducts} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <ProductForm onSave={handleSave} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
