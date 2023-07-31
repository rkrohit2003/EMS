import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css"

export const ManagerNotification = () => {
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
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/notification/${id}`);
      setNotifications(notifications.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }
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
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{notification.message}</td>
                      <td>{getIndianTime(notification.date)}</td>
                      <td>
                        <button
                          type="button"
                          className={`btn btn-danger ${styles.Button}`}
                          onClick={() => handleDelete(notification._id)}
                        >
                          Delete
                        </button>
                      </td>
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
