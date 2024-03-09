import React, { useState, useEffect } from "react";
import http from "../http.js";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    http
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const deleteUser = (id) => {
    http
      .delete("/users/" + id)
      .then((res) => {
        fetchAllUsers();
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Users listing ...</h2>
      {users.length === 0 ? (
        <div>No data available</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{++index}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={{ pathname: "/edit/" + user.id }}
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <Link
                    className="btn btn-primary"
                    to={{ pathname: "/view/" + user.id }}
                  >
                    View
                  </Link>
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}