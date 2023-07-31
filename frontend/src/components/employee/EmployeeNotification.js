import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css"

export const EmployeeNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [fetchd, setFetchd] = useState(0);

  const getIndianTime = (utcDateString) => {
    const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
    return indianDate;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notifications');
        setNotifications(response.data);
        setFetchd(1);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <div className={styles.dis}>
      <div className={styles.minH}>
        {notifications.length > 0 ? (
          <div>
            <h2 className={`${styles.textCenter}`}>Notification Details</h2>
            <div className={`${styles.over}`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Message</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{notification.message}</td>
                      <td>{getIndianTime(notification.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : fetchd === 1 ? (
          <h2>Currently, there is no notification.</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};
