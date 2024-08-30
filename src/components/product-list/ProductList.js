import React, { useState } from "react";
import "./product-list.css";
import Modal from "../modal/Modal";
import ProductForm from "../product-form/ProductForm";
import { api } from "../../utils/constants";

const ProductList = ({ products, fetchProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Event handlers
  const handleEditClick = (product) => {
    openModal(product);
  };

  const handleDeleteClick = (id) => {
    fetch(`${api}/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchProducts();
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Modal functions
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
    fetchProducts();
  };

  return (
    <div>
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
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDeleteClick(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <ProductForm existingProduct={selectedProduct} onSave={handleSave} />
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
