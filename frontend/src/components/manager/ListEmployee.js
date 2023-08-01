import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../common/style.module.css"
import UpdateEmployeeForm from './UpdateEmployeeForm';
import ViewEmployee from './ViewEmployee';

export const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [fetchd, setFetchd] = useState(false);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/users`);
        setEmployees(response.data);
        setFetchd(true);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setFetchd(true);
      }
    };

    fetchEmployees();
  }, []);
  
  const nonManagerEmployees = employees.filter((employee) => employee.isManager === false);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/api/user/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }


  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployee2, setSelectedEmployee2] = useState(null);

  const handleView = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setSelectedEmployee2(employee);
  };
  const handleUpdate = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setSelectedEmployee(employee);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setSelectedEmployee2(null);
  };

  const handleEmployeeUpdate = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
    );
    setSelectedEmployee(null);
  };

  return (
    <div className={styles.dis}>
      <div className={styles.minH}>
        {selectedEmployee ? (
          <UpdateEmployeeForm
            employee={selectedEmployee}
            onUpdate={handleEmployeeUpdate}
            onCancel={handleCancel}
          />
        ) : selectedEmployee2 ? (
          <ViewEmployee
            employee={selectedEmployee2}
            onCancel={handleCancel}
          />
        ) : fetchd ? (
          nonManagerEmployees.length > 0 ? (
          <div>
            <h2 className={`${styles.textCenter}`}>Employee Details</h2>
            <div className={`${styles.over}`}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S.No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {nonManagerEmployees.map((employee, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.department}</td>
                      <td>{employee.status}</td>
                      <td>
                        <button
                          type="button"
                          className={`btn btn-success ${styles.Button}`}
                          onClick={() => handleView(employee._id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className={`btn btn-danger ${styles.Button}`}
                          onClick={() => handleDelete(employee._id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className={`btn btn-primary ${styles.Button}`}
                          onClick={() => handleUpdate(employee._id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h2>Currently, there is no employee listed.</h2>
        )
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};
