import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from  '../assets/logo.jpg'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import Select from '@mui/material/Select';

const pages = ['home','Dashboard', 'change email', 'change password' , 'logout'];
const settings = ['Profile', 'Account', 'Dashboard'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedSetting, setSelectedSetting] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  const handleSettingChange = (event) => {
    setSelectedSetting(event.target.value);
    handleCloseNavMenu();
  };

  console.log(selectedSetting,"select")

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2E4698'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} alt="logo" style={{width:"55px",height:"auto" , borderRadius:"100px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="personal"
            sx={{
              ml:2,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GOMA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" href="/personal">home</Typography>
                  <Typography textAlign="center" href="/dashboard">dashboard</Typography>
                  <Typography textAlign="center" href="/changeemail">change email</Typography>
                  <Typography textAlign="center" href="/changepassword">change password</Typography>
                  <Typography textAlign="center" href="/">logout</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: { md: 'flex-end' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/personal'
              >
                home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/dashboard'
              >
                dashboard
              </Button>
              <Button
                onClick={()=>{setSelectedSetting(!selectedSetting)}}
                sx={{  color: 'white', display: 'block' }}
              >
              settings
              </Button>
              {selectedSetting?
              <div style={{position:"absolute" , top:48 , right:"1%"}}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 , border:'2px solid #fff' ,padding:10}} onClick={()=>{setSelectedSetting(!selectedSetting)}}>
                   <li style={{ borderBottom: '2px solid #fff', padding: 4, cursor: 'pointer' }}>
                      <Link to="/changeemail" style={{ textDecoration: 'none' }}>
                        <Typography textAlign="start" color="white">
                          change email
                        </Typography>
                      </Link>
                    </li>
                    <li style={{ borderBottom: '2px solid #fff', padding: 4, cursor: 'pointer' }}>
                        <Link to="/changepassword" style={{ textDecoration: 'none' }}>
                          <Typography textAlign="start" color="white">
                            change password
                          </Typography>
                        </Link>
                    </li>
                </ul>
              </div>
              :
              ""
              }
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href='/'
              >
                logout
              </Button>
              
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;