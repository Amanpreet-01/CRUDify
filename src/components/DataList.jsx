import React from "react";

const DataList = ({ apiData, userData, deleteData, setEditData, loadingStates }) => {
  return (
    <div className="card-container">
      {/* User Added Data */}
      {userData.map((item) => (
        <div className="card" key={item.id}>
          <h2>Title: {item.title}</h2>
          <p>News: {item.body}</p>
          <button className="edit-btn" onClick={() => setEditData(item)}>Edit</button>
          
          {/* Delete Button with Individual Loading State */}
          <button 
            className="delete-btn" 
            onClick={() => deleteData(item.id)} 
            disabled={loadingStates[item.id]} // Disable button while loading
          >
            {loadingStates[item.id] ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}

      {/* API Data (Read-Only) */}
      {apiData.map((item) => (
        <div className="card" key={item.id}>
          <h2>Title: {item.title}</h2>
          <p>News: {item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default DataList;
