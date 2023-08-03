import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "../common/style.module.css"

const ViewEmployee = ({ employee, onCancel }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.mb}>
      <form className={`${styles.form} ${styles.container}`}>
        <div className={styles.cancelIcon} onClick={onCancel}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Employee Details</h2>
        <TextField label="Name" style={{ marginBottom: '20px' }} value={employee.name} />
        <TextField label="Email" style={{ marginBottom: '20px' }} value={employee.email} type="email" />
        <TextField label="Password" style={{ marginBottom: '20px' }} value={employee.password} type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            )
          }}
        />
        <TextField
          label="Phone"
          style={{ marginBottom: '20px' }}
          value={employee.phone}
          type="tel"
        />
        <TextField label="Address" style={{ marginBottom: '20px' }} value={employee.address} />
        <TextField label="Department" style={{ marginBottom: '20px' }} value={employee.department} />
        <TextField
          label="Salary"
          style={{ marginBottom: '20px' }}
          value={employee.salary}
          type="number"
        />
        <Button variant="contained" color="primary" onClick={onCancel}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default ViewEmployee;
