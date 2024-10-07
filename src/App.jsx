
import TodoList from './todolist'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';





function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Hello" value="1" />
            <Tab label="My Todos" value="2" />
            
          </TabList>
        </Box>
        <TabPanel value="1">Hi, my name is..</TabPanel>
        <TabPanel value="2">
          <Container maxWidth="xl">
            <CssBaseline />
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h4">
                    My Todos
                  </Typography>
                </Toolbar>
              </AppBar>
            <TodoList />
          </Container>
        </TabPanel>
        
        
      </TabContext>
    </Box>
    </>

    
  )
}

export default App
