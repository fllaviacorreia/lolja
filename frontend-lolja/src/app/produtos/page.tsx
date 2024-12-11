"use client"

import Image from "next/image";
import Header from "../componentes/header";
import Footer from "../componentes/footer";
import { Modal } from "../componentes/modal";
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSWR, { mutate } from "swr";
import axios from "axios";

// Define a Client interface
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  status: string;
}

// Define a fetcher function for SWR
const fetcher = async (url: string): Promise<Product[]> => {
  const response = await axios.get(url);
  return response.data;
};

export default function Produtos() {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [thirdModalIsOpen, setThirdModalIsOpen] = useState(false);

  const [newProductName, setNewProductName] = useState(""); // State for new client name
  const [newBrand, setNewBrand] = useState("");
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  const [changePN, setChangePN] = useState("");
  const [changeB, setChangeB] = useState("");
  const [changeP, setChangeP] = useState<number>(0);
  const [changeQ, setChangeQ] = useState<number>(0);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // Use SWR to fetch clients from the backend
  const { data: products, error } = useSWR<Product[]>('http://localhost:4000/products', fetcher);

  function handleOpenFirstModal() {
    setFirstModalIsOpen(!firstModalIsOpen);
  }

  function handleOpenSecondModal(product: Product) {
    setChangePN(product.name);
    setChangeB(product.brand);
    setChangeP(product.price);
    setChangeQ(product.quantity);
    setSelectedProductId(product.id); // Set the selected client ID
    setSecondModalIsOpen(true);
  }

  const handleOpenThirdModal = (productId: number) => {
    console.log("Product to delete:", productId); // Check the client ID
    setProductToDelete(productId);
    setThirdModalIsOpen(true);
  };
  // Function to handle form submission
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:4000/products/register', { 
        name: newProductName, 
        brand: newBrand, 
        price: newPrice,
        quantity: newQuantity
      });

      mutate('http://localhost:4000/products/');
      setNewProductName("");
      setNewBrand("");
      setNewPrice(0);
      setNewQuantity(0);
      setFirstModalIsOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
      if (selectedProductId) {
        try {
          await axios.put(`http://localhost:4000/products/update/${selectedProductId}`, { name: changePN, brand: changeB, price: changeP, quantity: changeQ });
          // Optionally, you can update the local SWR cache
          mutate('http://localhost:4000/products');
          setChangePN("");
          setChangeB("");
          setChangeP(0);
          setChangeQ(0);
          setSecondModalIsOpen(false);
          setSelectedProductId(null); // Reset selected client ID
        } catch (error) {
          console.error("Error updating product:", error);
        }
      }
    };

    const handleDeleteProduct = async () => {
      if (productToDelete) {
        try {
          await axios.delete(`http://localhost:4000/products/disable/${productToDelete}`);
          // Update the local SWR cache
          mutate('http://localhost:4000/products/');
          setThirdModalIsOpen(false); // Close the confirmation modal
          setProductToDelete(null); // Reset the client to delete
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    };

  function closeSecondModal() {
    setSecondModalIsOpen(false);
    setSelectedProductId(null); // Reset selected client ID when closing
  }

  function closeThirdModal(){
    setThirdModalIsOpen(false);
    setSelectedProductId(null);
  }

  if (error) return <div>Error loading products</div>;
  if (!products) return <div>Loading...</div>;

  const activeProducts = products.filter(product => product.status === 'active');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-grow pt-16 items-center justify-center w-screen">
        <div className="grid grid-cols-4 gap-4 grid-flow-col-reverse items-center">
          {/* Display the list of clients */}
          {activeProducts.map((product: Product) => (
            <div key={product.id} className="flex bg-cl1 border border-cl2 rounded-xl flex-row">

              <div className="flex flex-col flex-grow p-4 rounded-sm text-center border-r border-r-cl2">
                <h3>{product.name}</h3>

                <h3>{product.brand}</h3>

                <h3>{product.price}</h3>

                <h3>{product.quantity}</h3>
              </div>

              <div className="flex flex-col flex-grow p-4 rounded-sm text-center justify-center aling-center">
                <button className="text-center" onClick={() => handleOpenSecondModal(product)}>
                  <i className="bi bi-pencil text-cl3 text-xl"></i>
                </button>

                <button className="text-center" onClick={() => handleOpenThirdModal(product.id)}>
                  <i className="bi bi-trash text-cl3 text-xl"></i>
                </button>
              </div>
            </div>
          ))}

            <div className="bg-cl3 rounded-full flex items-center justify-center h-16 w-16">
              <button onClick={handleOpenFirstModal}>
                <i className="bi bi-bag-plus text-white text-5xl"></i>
              </button>
            </div>
        </div>

        <Modal isOpen={thirdModalIsOpen} onClose={closeThirdModal}>
          <div className="mb-52">
            <h2 className="justify-center text-center text-xl">Tens certeza que dejesas deletar este produto?</h2>
          </div>

          <div className="flex justify-center gap-x-4 mt-40">
            <button onClick={handleDeleteProduct} className="text-white bg-red-700 rounded-lg p-4 mr-40">Confirmar</button>
            <button onClick={closeThirdModal} className="text-white bg-emerald-700 rounded-lg p-4">Cancelar</button>
          </div>
        </Modal>

        <Modal isOpen={secondModalIsOpen} onClose={closeSecondModal}>
        <div>
          <h2 className="font-bold text-2xl flex justify-center">Editar Produto</h2>
          <form className="flex flex-col" onSubmit={handleUpdateProduct}>
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Product Name"
              value={changePN}
              onChange={(e) => setChangePN(e.target.value)}
            />
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Product Brand"
              value={changeB}
              onChange={(e) => setChangeB(e.target.value)}
            />
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Product Price"
              value={changeP}
              onChange={(e) => setChangeP(Number(e.target.value))}
              step="0,01"
            />
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Product Quantity"
              value={changeQ}
              onChange={(e) => setChangeQ(Number(e.target.value))}
              step="0,01"
            />

            <button type="submit" className="bg-emerald-800 text-white rounded-lg p-2">
              Atualizar Produto
            </button>
          </form>
        </div>
        </Modal>

        <Modal isOpen={firstModalIsOpen} onClose={handleOpenFirstModal}>
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl flex justify-center">Adicione um novo produto</h2>
            <form className="flex flex-col" onSubmit={handleAddProduct}>
              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
              />

              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Product Brand"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                required
              />

              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Product Price"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                step="0,01"
                required
              />

              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Product Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
                step="0,01"
                required
              />

              <button type="submit" className="bg-emerald-800 text-white rounded-lg p-2">
                Adicionar Produto
              </button>
            </form>
          </div>
        </Modal>
      </section>
      <Footer />
    </div>
  );
}