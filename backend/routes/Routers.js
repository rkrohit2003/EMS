const express = require("express");
const User = require("../models/user");
const Task = require("../models/task");
const Notification = require("../models/notification");
const Leave = require("../models/leave");
const { SendNotificationEmail } = require("../sendEmail/SendNotificationEmail");
const { SendTaskEmail } = require("../sendEmail/SendTaskEmail");
const router = new express.Router();

router.post('/api/login', async (req, res) => {
  try {
    const userCount = await User.count({ email: req.body.email, password: req.body.password });
    res.status(201).json(userCount);
  }
  catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Failed to find user' });
  }
})

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})

router.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.find({ email: req.params.email });
    res.json(user);
  }
  catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
})

router.post('/api/user', async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }
  catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
})

router.put('/api/user/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const originalEmployee = await User.findById(id);
    if (!originalEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (updateData.email && updateData.email !== originalEmployee.email) {
      await Task.updateMany({ email: originalEmployee.email }, { email: updateData.email });
      await Leave.updateMany({ email: originalEmployee.email }, { email: updateData.email });
    }
    const updatedEmployee = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/api/user/:id', async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    await Task.deleteMany({ email: employee.email });
    await Leave.deleteMany({ email: employee.email });
    await User.deleteOne({ _id: employee._id });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/api/notification', async (req, res) => {
  try {
    const { message, users, managerName } = req.body;
    await SendNotificationEmail(message, users, managerName);
    const newNotification = new Notification({ message });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    if (error.message === 'EmailError') {
      console.error('Error sending notification email:', error);
      res.status(500).json({ error: 'Error sending notification email' });
    } else {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Failed to create notification' });
    }
  }
});

router.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  }
  catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
})

router.delete('/api/notification/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  }
  catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
})

router.get('/api/tasks/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const tasks = await Task.find({ email });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post('/api/task', async (req, res) => {
  try {
    const { title, desc, email, deadline, managerName, employeeName } = req.body;
    const taskData = {
      title,
      desc,
      email,
      deadline,
    };
    await SendTaskEmail(taskData, employeeName, managerName);
    const newTask = new Task(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.message === 'EmailError') {
      console.error('Error sending task email:', error);
      res.status(500).json({ error: 'Error sending task email' });
    } else {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  }
});


router.delete('/api/task/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/leaves', async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  }
  catch (error) {
    console.error('Error fetching leaves:', error);
    res.status(500).json({ error: 'Failed to fetch leaves' });
  }
})

router.get('/api/leaves/:email', async (req, res) => {
  try {
    const leave = await Leave.find({ email: req.params.email });
    res.json(leave);
  }
  catch (error) {
    console.error('Error fetching leave request:', error);
    res.status(500).json({ error: 'Failed to fetch leave request' });
  }
})

router.post('/api/leave', async (req, res) => {
  try {
    const newLeave = new Leave(req.body);
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  }
  catch (error) {
    console.error('Error creating leave:', error);
    res.status(500).json({ error: 'Failed to create leave' });
  }
})

router.put('/api/leave/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.json(leave);
  } catch (error) {
    console.error('Error updating leave:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/api/leave/:id', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Error deleting leave Request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  }
  catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
})

module.exports = router;