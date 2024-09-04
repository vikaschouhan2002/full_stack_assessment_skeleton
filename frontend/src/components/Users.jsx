import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModel";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addUser = (userDetails) => {
    setUsers([...users, userDetails]);
  };

  const getUserData = async (e) => {
    try {
      const response = await axios.get(`${backendUrl}user/find-all`);
      setUsers(response?.data);
    } catch (err) {
      console.log("Error:- ", err);
    }
  };
  useEffect(() => {
    getUserData();
  }, [isModalOpen]);
  return (
    <>
      <div className="bg-slate-200 h-screen">
        <div className="p-5">
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-6 py-3"
          >
            Add user
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  Username
                </th>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-gray-900">{user.username}</td>
                  <td className="py-3 px-4 text-gray-900">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddUser={addUser}
        />
      </div>
    </>
  );
};

export default Users;
