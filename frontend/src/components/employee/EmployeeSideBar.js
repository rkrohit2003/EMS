import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import HolidayVillageOutlinedIcon from '@mui/icons-material/HolidayVillageOutlined';
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
        <ListItem button onClick={() => navigate('/listTask')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AssignmentIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/requestLeave')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ListItemIcon style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <HolidayVillageOutlinedIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button onClick={() => navigate('/requestedLeave')} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
        <ListItem button onClick={() => navigate('/listTask')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Task" />
        </ListItem>
        <ListItem button onClick={() => navigate('/requestLeave')}>
          <ListItemIcon>
            <HolidayVillageOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Request Leave" />
        </ListItem>
        <ListItem button onClick={() => navigate('/requestedLeave')}>
          <ListItemIcon>
            <HolidayVillageIcon />
          </ListItemIcon>
          <ListItemText primary="Requested Leave" />
        </ListItem>
      </List>
    </Drawer>
  );
};

const EmployeeSideBar = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default EmployeeSideBar;
