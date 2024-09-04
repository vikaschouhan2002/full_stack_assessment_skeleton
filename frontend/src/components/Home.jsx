import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [users, setUsers] = useState([]);
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}user/find-all`);
      setUsers(response?.data);
    } catch (err) {
      console.log("Error:- ", err);
    }
  };

  const getHomeData = async (event) => {
    try {
      const userId = event.target.value;
      const response = await axios.get(
        `${backendUrl}home/find-by-user?userId=${userId}`
      );
      setHomes(response?.data);
    } catch (err) {
      console.log("Error:- ", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [isModalOpen]);

  const openModal = async (home) => {
    setSelectedHome(home);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <div className="bg-slate-200">
        <div className="flex justify-center gap-4 pt-5">
          <label className="text-2xl font-semibold font-sans" htmlFor="users">
            Select User :
          </label>
          <select
            name="users"
            id="users"
            defaultValue=""
            className="px-3 border-2 border-slate-500"
            onChange={getHomeData} // Corrected this line
          >
            <option value="" disabled className="text-xl">
              Select
            </option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user?.id} className="text-xl">
                  {user?.username}
                </option>
              ))}
          </select>
        </div>

        <div className="m-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {homes &&
            homes.map((home) => (
              <div
                key={home.id}
                className="bg-white min-w-[220px] max-w-[300px] p-5 rounded-md drop-shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-2">
                  {home.street_address}
                </h3>
                <p className="font-semibold">City :{home.city}</p>
                <p className="font-semibold">State : {home.state}</p>
                <p className="font-semibold">Zip : {home.postal_code}</p>
                <div className="flex justify-center mt-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => openModal(home)}
                  >
                    Edit Users
                  </button>
                </div>
              </div>
            ))}
        </div>

        <Modal
          isOpen={isModalOpen}
          users={users}
          onClose={closeModal}
          home={selectedHome}
        />
      </div>
    </>
  );
};

export default Home;
