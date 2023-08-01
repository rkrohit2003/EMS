import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css"
import ViewTask from './ViewTask';

export const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [fetchd, setFetchd] = useState(0);
  const getIndianTime = (utcDateString) => {
    const indianDate = new Date(utcDateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' });
    return indianDate;
  }
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://ems-backend-l1l2.onrender.com/api/tasks');
        setTasks(response.data);
        setFetchd(1);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/api/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }


  const [selectedTask, setSelectedTask] = useState(null);

  const handleView = (id) => {
    const task = tasks.find((e) => e._id === id);
    setSelectedTask(task);
  };

  const handleCancel = () => {
    setSelectedTask(null);
  };

  return (
    <div className={styles.dis}>
      <div className={styles.minH}>
        {selectedTask ? (
          <ViewTask
            task={selectedTask}
            onCancel={handleCancel}
          />
        ) : tasks.length > 0 ? (
          <div>
            <h2 className={`${styles.textCenter}`}>Task Details</h2>
            <div className={`${styles.over}`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Title</th>
                    <th scope="col">Employee Email</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{task.title}</td>
                      <td>{task.email}</td>
                      <td>{getIndianTime(task.deadline)}</td>
                      <td>
                        <button
                          type="button"
                          className={`btn btn-success ${styles.Button}`}
                          onClick={() => handleView(task._id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className={`btn btn-danger ${styles.Button}`}
                          onClick={() => handleDelete(task._id)}
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
          <h2>Currently, there is no assigned task.</h2>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};
