/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddPropertyModal = ({ isOpen, onClose, onAddProperty, users }) => {
  const [propertyDetails, setPropertyDetails] = useState({
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    userIds: [],
  });

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "userIds") {
      const selectedUserIds = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setPropertyDetails({ ...propertyDetails, userIds: selectedUserIds });
    } else {
      setPropertyDetails({ ...propertyDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}home/create`,
        propertyDetails
      );
    } catch (err) {
      console.log("Error", err);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-75"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md max-h-[500px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street_address"
            >
              Street Address
            </label>
            <input
              type="text"
              id="street_address"
              name="street_address"
              value={propertyDetails.street_address}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={propertyDetails.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={propertyDetails.state}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zip"
            >
              ZIP
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              value={propertyDetails.postal_code}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              Choose Homes:
            </label>

            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="userIds"
              id="user"
              multiple
              value={propertyDetails.userIds}
              onChange={handleChange}
            >
              <option value="" disabled className="text-xl">
                Select
              </option>
              {users &&
                users.map((user) => (
                  <option key={user?.id} value={user?.id} className="text-xl">
                    {user?.username}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;
