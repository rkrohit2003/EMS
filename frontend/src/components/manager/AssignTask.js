import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from "../common/style.module.css"
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [email, setEmail] = useState('');
  const [deadline, setDeadline] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [deadlineError, setDeadlineError] = useState('');
  const managerName = localStorage.getItem('name');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError('');
    setDescError('');
    setEmailError('');
    setDeadlineError('');
    try {
      // Check if the user with the entered email exists
      if(taskTitle === ''){
        setTitleError("Task title can not be empty");
        return;
      }
      if(taskDesc === ''){
        setDescError("Task description can not be empty");
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${email}`);

      if (response.data.length === 0) {
        setEmailError('Invalid email. Please enter a valid email.');
        return;
      }

      if(deadline === ''){
        setDeadlineError('Please select deadline for the task');
        return;
      }

      const taskData = {
        title: taskTitle,
        desc: taskDesc,
        email,
        deadline,
      };

      const employeeName = response.data[0].name;
      await axios.post(`${process.env.REACT_APP_BACKEND}/api/task`, {
        ...taskData,
        managerName,
        employeeName
      });
      navigate("/listTask");

    } catch (error) {
      console.error(error);
      setEmailError('Please enter a valid email id');
    }
  };

  return (
    <div className={styles.dis}>
      <Form className={`${styles.form} ${styles.container} ${styles.minHAssignTask}`} onSubmit={handleSubmit}>
        <div className={styles.cancelIcon} onClick={() => { navigate('/') }}>
          <CancelIcon />
        </div>
        <h2 className={styles.heading}>Assign Task</h2>
        <Form.Group controlId="taskTitle" style={{ marginBottom: '20px' }}>
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          {titleError && <Form.Text className="text-danger">{titleError}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="taskDesc" style={{ marginBottom: '20px' }}>
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
          {descError && <Form.Text className="text-danger">{descError}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="email" style={{ marginBottom: '20px' }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <Form.Text className="text-danger">{emailError}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="deadline" style={{ marginBottom: '20px' }}>
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          {deadlineError && <Form.Text className="text-danger">{deadlineError}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Assign Task
        </Button>
      </Form></div>
  );
};

export default AssignTask;
