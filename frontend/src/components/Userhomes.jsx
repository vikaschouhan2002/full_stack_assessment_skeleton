import { useEffect, useState } from "react";
import AddPropertyModal from "./AddPropertyModel";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Userhomes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addProperty = (propertyDetails) => {
    setProperties([...properties, propertyDetails]);
  };
  const getHomeData = async (e) => {
    try {
      const response = await axios.get(`${backendUrl}home/final`);
      setProperties(response?.data);
    } catch (err) {
      console.log("Error:- ", err);
    }
  };
  const getUserData = async (e) => {
    try {
      const response = await axios.get(`${backendUrl}user/find-all`);
      setUsers(response?.data);
    } catch (err) {
      console.log("Error:-", err);
    }
  };
  useEffect(() => {
    getHomeData();
    getUserData();
  }, [isModalOpen]);
  return (
    <>
      <div className="bg-slate-200 h-screen">
        <div className="p-5">
          <button
            className="bg-blue-500 text-white px-6 py-3"
            onClick={openModal}
          >
            Add Home
          </button>
        </div>

        <AddPropertyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddProperty={addProperty}
          users={users}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  Street Address
                </th>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  City
                </th>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  State
                </th>
                <th className="py-3 px-4 text-left bg-gray-100 font-semibold text-gray-700 border-b">
                  Zip Code
                </th>
              </tr>
            </thead>
            <tbody>
              {properties?.map((property, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-gray-900">
                    {property?.street_address}
                  </td>
                  <td className="py-3 px-4 text-gray-900">{property?.city}</td>
                  <td className="py-3 px-4 text-gray-900">{property?.state}</td>
                  <td className="py-3 px-4 text-gray-900">
                    {property?.postal_code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Userhomes;
