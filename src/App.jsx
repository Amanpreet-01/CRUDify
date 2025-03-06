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
  const [loading, setLoading] = useState(true); // 🔥 New: Loading state for API fetch

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        setApiData(response.data);
        setLoading(false);  // ✅ Hide loader after data is fetched
      })
      .catch(error => {
        console.error("Error fetching API data:", error);
        setLoading(false);  // ❌ Hide loader even if there is an error
      });
  }, []);

  const addData = (data) => {
    setUserData([{ ...data, id: Date.now() }, ...userData]);
  };

  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUserData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
    }

    setLoadingStates((prev) => ({ ...prev, [id]: false }));
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

      {/* 🔥 Show Loader While Fetching Data */}
      {loading ? (
        <p className="loader">Loading Data...</p>
      ) : (
        <DataList
          apiData={apiData}
          userData={userData}
          deleteData={handleDelete}
          setEditData={(item) => { setEditData(item); setShowForm(true); }}
          loadingStates={loadingStates}
        />
      )}
    </div>
  );
};

export default App;
