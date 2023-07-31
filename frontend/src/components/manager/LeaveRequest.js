import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css";

export const LeaveRequest = () => {
  const [leaves, setLeaves] = useState([]);
  const [fetchd, setFetchd] = useState(0);
  const getIndianTime = (utcDateString) => {
    const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' });
    return indianDate;
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/leaves');
        setLeaves(response.data);
        setFetchd(1);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/leave/${id}`);
      setLeaves(leaves.filter((leave) => leave._id !== id));
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/leave/${id}`, { status });
      setLeaves((prevLeaves) =>
        prevLeaves.map((leave) => {
          if (leave._id === id) {
            return { ...leave, status };
          }
          return leave;
        })
      );
    } catch (error) {
      console.error('Error updating leave:', error);
    }
  };

  return (
    <div className={styles.dis}>
      <div className={styles.minH}>
        {leaves.length > 0 ? (
          <div>
            <h2 className={`${styles.textCenter}`}>Leave Details</h2>
            <div className={`${styles.over}`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Employee Email</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{leave.email}</td>
                      <td>{leave.reason}</td>
                      <td>{getIndianTime(leave.startDate)}</td>
                      <td>{getIndianTime(leave.endDate)}</td>
                      <td>{leave.status}</td>
                      <td>
                        {leave.status === 'Pending' ? (
                          <div>
                            <button
                              type="button"
                              className={`btn btn-primary ${styles.Button}`}
                              onClick={() => handleAction(leave._id, 'Accepted')}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className={`btn btn-danger ${styles.Button}`}
                              onClick={() => handleAction(leave._id, 'Rejected')}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className={`btn btn-danger ${styles.Button}`}
                            onClick={() => handleDelete(leave._id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : fetchd === 1 ? (
          <h2>Currently, there is no leave request.</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};
