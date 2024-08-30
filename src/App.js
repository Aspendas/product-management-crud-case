import React, { useState } from "react";
import "./App.css";
import ProductList from "./components/product-list/ProductList";
import Modal from "./components/modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    closeModal();
  };
  return (
    <div className="app-container">
      <h1>Ürün Listesi</h1>
      <ProductList />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h1>Lorem ipsum dolor amet.</h1>
        </div>
      </Modal>
    </div>
  );
}

export default App;
