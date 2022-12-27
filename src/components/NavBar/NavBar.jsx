import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import useStyles from './styles';

import { Sidebar } from '../index';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
          <IconButton
            className={classes.menuButton}
            style={{ outline: 'none' }}
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
          ><Menu />
          </IconButton>

          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>

            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'SideBar ehi a'}
          <div>
            {!isAuthenticated ? (<Button color="inherit" onClick={() => {}}>Login &nbsp; <AccountCircle /></Button>)
              : (
                <Button color="inherit" onClick={() => {}} component={Link} to="/profile/:id" className={classes.LinkButton}>
                  {!isMobile && <>My Movies &nbsp;</>}
                  <Avatar style={{ width: 30, height: 30 }} alt="Profile" />
                </Button>
              )}

          </div>
          {isMobile && 'SideBar ehi a'}

        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawPaper }}
              ModalProps={{ keepMounted: true }}

            ><Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (<Drawer variant="permanent" open classes={{ paper: classes.drawPaper }}><Sidebar setMobileOpen={setMobileOpen} /></Drawer>)}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
