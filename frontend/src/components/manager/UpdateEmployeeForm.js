import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import styles from "../common/style.module.css"

const UpdateEmployeeForm = ({ employee, onUpdate, onCancel }) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [password, setPassword] = useState(employee.password);
  const [phone, setPhone] = useState(employee.phone);
  const [address, setAddress] = useState(employee.address);
  const [status, setStatus] = useState(employee.status);
  const [department, setDepartment] = useState(employee.department);
  const [salary, setSalary] = useState(employee.salary);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      name,
      email,
      password,
      phone,
      address,
      status,
      department,
      salary,
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_BACKEND}/api/user/${employee._id}`, updatedEmployee);
      console.log('Updated Employee:', response.data);
      onUpdate(response.data); // Pass the updated employee data back to the parent component
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <form className={`${styles.form} ${styles.container}`} onSubmit={handleSubmit}>
        <div className={styles.cancelIcon} onClick={onCancel}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Update Employee</h2>
        <TextField
          label="Name"
          style={{ marginBottom: '20px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          style={{ marginBottom: '20px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextField
          label="Password"
          style={{ marginBottom: '20px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        <TextField
          label="Phone"
          style={{ marginBottom: '20px' }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          type="tel"
        />
        <TextField
          label="Address"
          style={{ marginBottom: '20px' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          label="Department"
          style={{ marginBottom: '20px' }}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <TextField
          label="Salary"
          style={{ marginBottom: '20px' }}
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
          type="number"
        />
        <Button type="submit" variant="contained" color="primary">
          Update Employee
        </Button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
