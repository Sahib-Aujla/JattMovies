import React, { useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { fetchToken, movieApi, getSessionId } from '../../utils';
import { Sidebar, Search } from '../index';
import { setUser, userSelector } from '../../features/auth';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();

  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  // const isAuthenticated = false;
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocal = localStorage.getItem('session_id');
  const dispatch = useDispatch();
  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocal) {
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionIdFromLocal}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await getSessionId();
          const { data: userData } = await movieApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
        }
      }
    };
    logInUser();
  }, [token]);
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
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (<Button color="inherit" onClick={fetchToken}>Login &nbsp; <AccountCircle /></Button>)
              : (
                <Button color="inherit" onClick={() => {}} component={Link} to={`/profile/${user.id}`} className={classes.LinkButton}>
                  {!isMobile && <>My Movies &nbsp;</>}
                  <Avatar style={{ width: 30, height: 30 }} alt="Profile" />
                </Button>
              )}

          </div>
          {isMobile && <Search />}

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
