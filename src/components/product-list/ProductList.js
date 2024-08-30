import React, { useState } from "react";
import "./product-list.css";
import Modal from "../modal/Modal";
import ProductForm from "../product-form/ProductForm";
import { api } from "../../utils/constants";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";

const ProductList = ({ products, fetchProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  // Event handlers
  const handleEditClick = (product) => {
    openModal(product);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      fetch(`${api}/products/${productToDelete.id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchProducts();
          closeDeleteConfirmModal();
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
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

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="product-container">
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
                <button
                  className="icon-button"
                  onClick={() => handleEditClick(product)}
                >
                  <EditIcon />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleDeleteClick(product)}
                >
                  <DeleteIcon />
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
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
      >
        <div>
          <p>Are you sure you want to delete this product?</p>
          <button className="delete-button" onClick={confirmDelete}>
            Yes
          </button>
          <button className="delete-button" onClick={closeDeleteConfirmModal}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
