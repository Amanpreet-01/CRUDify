import React from "react";

const DataList = ({ apiData, userData, deleteData, setEditData, loading }) => {
  return (
    <div className="card-container">
      {/* User Added Data */}
      {userData.map((item) => (
        <div className="card" key={item.id}>
          <h2>Title: {item.title}</h2>
          <p>News: {item.body}</p>
          <button className="edit-btn" onClick={() => setEditData(item)}>Edit</button>
          <button className="delete-btn" onClick={() => deleteData(item.id)}>
            {loading ? "Deleting..." : "Delete"}
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
