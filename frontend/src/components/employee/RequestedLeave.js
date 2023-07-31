import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css"

export const RequestedLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [fetchd, setFetchd] = useState(0);
  const curEmail = localStorage.getItem('isLoggedIn');
  const getIndianTime = (utcDateString) => {
    const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' });
    return indianDate;
  }
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/leaves/${curEmail}`);
        setLeaves(response.data);
        setFetchd(1);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    fetchLeaves();
  }, [curEmail]);

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
                    <th scope="col">Reason</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{leave.reason}</td>
                      <td>{getIndianTime(leave.startDate)}</td>
                      <td>{getIndianTime(leave.endDate)}</td>
                      <td>{leave.status}</td>
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

