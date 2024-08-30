import React from "react";
import "./App.css";
import ProductList from "./components/product-list/ProductList";

function App() {
  return (
    <div className="app-container">
      <h1>Ürün Listesi</h1>
      <ProductList />
    </div>
  );
}

export default App;
