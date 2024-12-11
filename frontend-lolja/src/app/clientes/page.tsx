"use client"

import Image from "next/image";
import Header from "../componentes/header";
import Footer from "../componentes/footer";
import { Modal } from "../componentes/modal";
import { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useSWR, { mutate } from "swr";
import axios from "axios";


interface Client {
  id: number;
  name: string;
  email: string;
  bornDate: string;
  status: string;
}


const fetcher = async (url: string): Promise<Client[]> => {
  const response = await axios.get(url);
  return response.data;
};

export default function Cliente() {
  const [firstModalIsOpen, setFirstModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [thirdModalIsOpen, setThirdModalIsOpen] = useState(false);

  const [newClientName, setNewClientName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBornDate, setNewBornDate] = useState("");

  const [changeCN, setChangeCN] = useState("");
  const [changeE, setChangeE] = useState("");
  const [changeBD, setChangeBD] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  
  const { data: clients, error } = useSWR<Client[]>('http://localhost:4000/clients', fetcher);

  function handleOpenFirstModal() {
    setFirstModalIsOpen(!firstModalIsOpen);
  }

  function handleOpenSecondModal(client: Client) {
    setChangeCN(client.name);
    setChangeE(client.email);
    setChangeBD(client.bornDate);
    setSelectedClientId(client.id);
    setSecondModalIsOpen(true);
  }

  const handleOpenThirdModal = (clientId: number) => {
    console.log("Client to delete:", clientId); 
    setClientToDelete(clientId);
    setThirdModalIsOpen(true);
  };
  
  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/clients/register', { name: newClientName, email: newEmail, bornDate: newBornDate});
      
      mutate('http://localhost:4000/clients/');
      setNewClientName("");
      setNewEmail("");
      setNewBornDate("");
      setFirstModalIsOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
  
      if (selectedClientId) {
        try {
          await axios.put(`http://localhost:4000/clients/update/${selectedClientId}`, { name: changeCN, email: changeE, bornDate: changeBD });
          
          mutate('http://localhost:4000/clients');
          setChangeCN("");
          setChangeE("");
          setChangeBD("");
          setSecondModalIsOpen(false);
          setSelectedClientId(null);
        } catch (error) {
          console.error("Erro ao atualizar cliente:", error);
        }
      }
    };

    const handleDeleteClient = async () => {
      if (clientToDelete) {
        try {
          await axios.delete(`http://localhost:4000/clients/disable/${clientToDelete}`);

          mutate('http://localhost:4000/clients/');
          setThirdModalIsOpen(false);
          setClientToDelete(null);
        } catch (error) {
          console.error("Erro ao deletar cliente:", error);
        }
      }
    };

  function closeSecondModal() {
    setSecondModalIsOpen(false);
    setSelectedClientId(null);
  }

  function closeThirdModal(){
    setThirdModalIsOpen(false);
    setSelectedClientId(null);
  }

  if (error) return <div>Error loading clients</div>;
  if (!clients) return <div>Loading...</div>;

  const activeClients = clients.filter(client => client.status === 'active');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex flex-grow pt-16 items-center justify-center w-screen">
        <div className="grid grid-cols-4 gap-4 grid-flow-col-reverse items-center">
          {/* Display the list of clients */}
          {activeClients.map((client: Client) => (
            <div key={client.id} className="client-card flex bg-cl1 border border-cl2 rounded-xl flex-row">

              <div className="flex flex-col flex-grow p-4 rounded-sm text-center border-r border-r-cl2">
                <h3>{client.name}</h3>

                <h3>{client.email}</h3>

                <h3>{client.bornDate}</h3>
              </div>

              <div className="flex flex-col flex-grow p-4 rounded-sm text-center justify-center aling-center">
                <button className="text-center" onClick={() => handleOpenSecondModal(client)}>
                  <i className="bi bi-pencil text-cl3 text-xl"></i>
                </button>

                <button className="text-center" onClick={() => handleOpenThirdModal(client.id)}>
                  <i className="bi bi-trash text-cl3 text-xl"></i>
                </button>
              </div>
            </div>
          ))}

            <div className="bg-cl3 rounded-full flex items-center justify-center h-16 w-16">
              <button onClick={handleOpenFirstModal}>
                <i className="bi bi-person-plus text-cl1 text-5xl"></i>
              </button>
            </div>
        </div>

        <Modal isOpen={thirdModalIsOpen} onClose={closeThirdModal}>
          <div className="mb-52">
            <h2 className="justify-center text-center text-xl">Tens certeza que dejesas deletar este cliente?</h2>
          </div>

          <div className="flex justify-center gap-x-4 mt-40">
            <button onClick={handleDeleteClient} className="text-white bg-red-700 rounded-lg p-4 mr-40">Confirmar</button>
            <button onClick={closeThirdModal} className="text-white bg-emerald-700 rounded-lg p-4">Cancelar</button>
          </div>
        </Modal>

        <Modal isOpen={secondModalIsOpen} onClose={closeSecondModal}>
        <div>
          <h2 className="font-bold text-2xl flex justify-center">Edit Client</h2>
          <form className="flex flex-col" onSubmit={handleUpdateClient}>
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Client Name"
              value={changeCN}
              onChange={(e) => setChangeCN(e.target.value)}
            />
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Client Email"
              value={changeE}
              onChange={(e) => setChangeE(e.target.value)}
            />
            <input
              type="text"
              className="bg-white rounded-lg border mb-2"
              placeholder="Client Born Date"
              value={changeBD}
              onChange={(e) => setChangeBD(e.target.value)}
            />
            <button type="submit" className="bg-cl4 text-cl1 rounded-lg p-2">
              Atualizar Cliente
            </button>
          </form>
        </div>
        </Modal>

        <Modal isOpen={firstModalIsOpen} onClose={handleOpenFirstModal}>
          <div className="flex flex-col">
            <h2 className="font-bold text-2xl flex justify-center">Adicione um novo cliente</h2>
            <form className="flex flex-col" onSubmit={handleAddClient}>
              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Client Name"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                required
              />

              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Client Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />

              <input
                type="text"
                className="bg-white rounded-lg border mb-2"
                placeholder="Client Born Date"
                value={newBornDate}
                onChange={(e) => setNewBornDate(e.target.value)}
                required
              />
              <button type="submit" className="bg-emerald-800 text-white rounded-lg p-2">
                Adicionar Cliente
              </button>
            </form>
          </div>
        </Modal>
      </section>
      <Footer />
    </div>
  );
}