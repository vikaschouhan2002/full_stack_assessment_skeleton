import { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Modal = ({ isOpen, onClose, home, users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}user/find-by-home?homeId=${home.id}`
        );
        const fetchedSelectedUsers = response.data.map((user) => ({
          ...user,
          checked: true,
        }));
        const allUsersWithSelection = users.map((user) => ({
          ...user,
          checked: fetchedSelectedUsers.some((u) => u.id === user.id),
        }));
        setSelectedUsers(allUsersWithSelection);
      } catch (err) {
        console.log("Error:- ", err);
      }
    };

    fetchSelectedUsers();
  }, [home.id, users]);

  const handleCheckboxChange = (index) => {
    const updatedUsers = [...selectedUsers];
    updatedUsers[index].checked = !updatedUsers[index].checked;
    setSelectedUsers(updatedUsers);
  };

  const handleSave = async () => {
    const selectedUserIds = selectedUsers
      .filter((user) => user.checked)
      .map((user) => user.id);
    const updateData = {
      homeId: home.id,
      userIds: selectedUserIds,
    };
    try {
      const response = await axios.put(
        `${backendUrl}home/update-users`,
        updateData
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
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-96">
        <h2 className="text-lg font-semibold">{home.street_address}</h2>
        <div className="mt-4 space-y-2">
          {selectedUsers.map((user, index) => (
            <div key={index}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={user.checked}
                  onChange={() => handleCheckboxChange(index)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className={user.checked ? "font-semibold" : ""}>
                  {user.username}
                </span>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
