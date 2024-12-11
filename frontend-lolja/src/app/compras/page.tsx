"use client"

import Image from "next/image";
import Header from "../componentes/header";
import Footer from "../componentes/footer";
import { Modal } from "../componentes/modal";
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSWR, { mutate } from "swr";
import axios from "axios";


interface Compra {
  id: number;
  id_product: number;
  id_client: number;
  total: number;
  status: string;
}

interface Client {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}


const fetcher = async (url: string): Promise<Compra[]> => {
  const response = await axios.get(url);
  return response.data;
};

const fetchClients = async (url: string): Promise<Client[]> => {
  const response = await axios.get(url);
  return response.data;
};

const fetchProducts = async (url: string): Promise<Product[]> => {
  const response = await axios.get(url);
  return response.data; 
}

export default function Compras() {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [thirdModalIsOpen, setThirdModalIsOpen] = useState(false);

  const [newPurchaseId, setNewPurchaseId] = useState<number>(0);
  const [newProductId, setNewProductId] = useState<number>(0);
  const [newClientId, setNewClientId] = useState<number>(0);
  const [newTotal, setNewTotal] = useState<number>(0);

  const [purchaseToDelete, setPurchaseToDelete] = useState<number | null>(null);


  const { data: purchases, error: purchasesError } = useSWR<Compra[]>('http://localhost:4000/purchases', fetcher);
  const { data: clients, error: clientsError } = useSWR<Client[]>('http://localhost:4000/clients', fetchClients);
  const { data: products, error: productsError } = useSWR<Product[]>('http://localhost:4000/products', fetchProducts);

  function handleOpenFirstModal() {
    setFirstModalIsOpen(!firstModalIsOpen);
  }

  const handleOpenThirdModal = (purchaseId: number) => {
    console.log("Purchase to delete:", purchaseId);
    setPurchaseToDelete(purchaseId);
    setThirdModalIsOpen(true);
  };

  
  const handleAddPurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/purchases/register', { 
        id: newPurchaseId,
        id_product: newProductId,
        id_client: newClientId,
        total: newTotal,
      });

      mutate('http://localhost:4000/purchases');
      setNewPurchaseId(0)
      setNewProductId(0);
      setNewClientId(0);
      setNewTotal(0);
      setFirstModalIsOpen(false);
    } catch (error) {
      console.error("Error adding purchase:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (purchaseToDelete) {
      try {
        await axios.delete(`http://localhost:4000/purchases/disable/${purchaseToDelete}`);
        
        mutate('http://localhost:4000/purchases');
        setThirdModalIsOpen(false);
        setPurchaseToDelete(null);
      } catch (error) {
        console.error("Error deleting purchase:", error);
      }
    }
  };

  function closeThirdModal(){
    setThirdModalIsOpen(false);
    setPurchaseToDelete(null);
  }

  if (purchasesError) return <div>Error loading purchases</div>;
  if (clientsError) return <div>Error loading clients</div>;
  if (productsError) return <div>Error loading products</div>
  if (!purchases || !clients || !products) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-grow pt-16 items-center justify-center w-screen">
        <div className="grid grid-cols-4 gap-4 grid-flow-col-reverse items-center">
          {/* Display the list of purchases */}
          {purchases.map((purchase: Compra) => (

            <div key={purchase.id} className="flex bg-cl1 border border-cl2 rounded-xl flex-row">
              <div className="flex flex-col flex-grow p-4 rounded-sm text-center border-r border-r-cl2">
                <h3>Purchase Id: {purchase.id}</h3>
                <h3>Product ID: {purchase.id_product }</h3>
                <h3>Client ID: {purchase.id_client}</h3>
                <h3>Total: {purchase.total}</h3>
              </div>
              <div className="flex flex-col flex-grow p-4 rounded-sm text-center justify-center align-center">
                <button className="text-center" onClick={() => handleOpenThirdModal(purchase.id)}>
                  <i className="bi bi-x text-cl3 text-xl"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="bg-cl3 rounded-full flex items-center justify-center h-16 w-16">
            <button onClick={handleOpenFirstModal}>
              <i className="bi bi-cart-plus text-white text-5xl"></i>
            </button>
          </div>
        </div>

        <Modal isOpen={thirdModalIsOpen} onClose={closeThirdModal}>
          <div className="mb-52">
            <h2 className="text-center">Are you sure you want to delete this purchase?</h2>
            <button className="bg-emerald-700 text-white rounded-full p-2" onClick={handleDeleteProduct}>Yes</button>
            <button className="bg-cl3 text-white rounded-full p-2" onClick={closeThirdModal}>No</button>
          </div>
        </Modal>

        <Modal isOpen={firstModalIsOpen} onClose={handleOpenFirstModal}>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center">Add new purchase</h2>
            <form onSubmit={handleAddPurchase}>

              <select value={newProductId} onChange={(e) => setNewProductId(Number(e.target.value))}
                className="p-2 rounded-sm border border-cl2">
                <option value={0}>Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>

              <select 
                value={newClientId}
                onChange={(e) => setNewClientId(Number(e.target.value))}
                className="p-2 rounded-sm border border-cl2"
              >
                <option value={0}>Select Client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
              <input 
                type="number"
                value={newTotal}
                onChange={(e) => setNewTotal(Number(e.target.value))}
                placeholder="Total"
                className="p-2 rounded-sm border border-cl2"
              />
              <button 
                type="submit"
                className="bg-cl3 text-white rounded-full p-2"
              >
                Add purchase
              </button>
            </form>
          </div>
        </Modal>
      </section>
      <Footer />
    </div>
  );
}