import React, { useState, useEffect } from "react";
import axios from "axios";
import DataList from "./components/DataList";
import DataForm from "./components/DataForm";

const App = () => {
  const [apiData, setApiData] = useState([]);  // API Data (Read-only)
  const [userData, setUserData] = useState([]); // User-added Data
  const [showForm, setShowForm] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading per card
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => setApiData(response.data))
      .catch(error => console.error("Error fetching API data:", error));
  }, []);

  const addData = (data) => {
    setUserData([{ ...data, id: Date.now() }, ...userData]); // Add new data to the beginning
  };

  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading only for selected card

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      setUserData((prevData) => prevData.filter((item) => item.id !== id)); // Remove item
    } catch (error) {
      console.error("Error deleting post", error);
    }

    setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading state
  };

  const updateData = (updatedItem) => {
    setUserData(userData.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  return (
    <div className="container">
      <h1>JSONPlaceholder CRUD with Formik</h1>
      <button className="create-btn" onClick={() => { setShowForm(true); setEditData(null); }}>Create</button>
      {showForm && (
        <DataForm
          addData={addData}
          updateData={updateData}
          editData={editData}
          closeForm={() => setShowForm(false)}
        />
      )}
      <DataList
        apiData={apiData}
        userData={userData}
        deleteData={handleDelete}  // ✅ Correct function reference
        setEditData={(item) => { setEditData(item); setShowForm(true); }}
        loadingStates={loadingStates} // ✅ Correct prop name
      />
    </div>
  );
};

export default App;
