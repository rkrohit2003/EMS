import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TaskIcon from '@mui/icons-material/Task';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import styles from '../common/style.module.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth <= 900;

  return isMobile ? (
    <div className={styles.mobileSidebar}>
      <List className={styles.listHorizontal}>
        <ListItem button onClick={() => navigate('/listEmployee')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <PeopleAltIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/addEmployee')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AddCircleIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/assignTask')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AddTaskIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/listTask')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <TaskIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/addNotification')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AddAlertIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/leaveRequest')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <HolidayVillageIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  ) : (
    <Drawer
      variant="permanent"
      classes={{
        paper: styles.drawerPaper,
      }}
    >
      <List>
        <ListItem button onClick={() => navigate('/listEmployee')}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="View Employee" />
        </ListItem>
        <ListItem button onClick={() => navigate('/addEmployee')}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Employee" />
        </ListItem>
        <ListItem button onClick={() => navigate('/addNotification')}>
          <ListItemIcon>
            <AddAlertIcon />
          </ListItemIcon>
          <ListItemText primary="Add Notification" />
        </ListItem>
        <ListItem button onClick={() => navigate('/assignTask')}>
          <ListItemIcon>
            <AddTaskIcon />
          </ListItemIcon>
          <ListItemText primary="Assign Task" />
        </ListItem>
        <ListItem button onClick={() => navigate('/listTask')}>
          <ListItemIcon>
            <TaskIcon />
          </ListItemIcon>
          <ListItemText primary="Assigned Task" />
        </ListItem>
        <ListItem button onClick={() => navigate('/leaveRequest')}>
          <ListItemIcon>
            <HolidayVillageIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Request" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const SideBar = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default SideBar;
