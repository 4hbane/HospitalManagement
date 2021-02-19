import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect   } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Table from "./Patients/TableOfPatients"
import DetailsOfPatient from "./Patients/DetailsOfPatient";
import AddPatient from "./Patients/AddPatient";
import EditPatient from "./Patients/EditPatient";


import Settings from "./settings/Profile";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  EspaceBar:{
    background: 'linear-gradient(45deg, #d26bfe 30%, #d7b7ff 90%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
        textDecoration: 'none',
        color: 'inherit',
    }
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [redirect, setRedirect] = useState(localStorage.getItem('token'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderRedirect = () => {
    if (!redirect) {
      return <Redirect to='/' />
    }
  }
  
  const logOut = () => {
    localStorage.clear();
    setRedirect(false);
  }

  const drawer = (
    <div>
      <List>
        <Typography variant="h6" noWrap>
              MNA Hopital
        </Typography>
      <div className={classes.toolbar} />
      <Divider />
        <Link to ="/espaceReceptionist" className={classes.link}>
          <ListItem button key={"Patients"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Patients"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/espaceReceptionist/receptionist-settings" className={classes.link}>
          <ListItem button key={"Settings"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItem>
        </Link>
        <a  className={classes.link} onClick={logOut}>
          <ListItem button key={"Logout"}>
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </a>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
    {renderRedirect()}
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.EspaceBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Espace Réceptionniste
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
                  <Switch>
                    <Route exact path="/espaceReceptionist" component={Table}/>
                    <Route exact path="/espaceReceptionist/AddPatient" component={AddPatient}/>
                    <Route exact path="/espaceReceptionist/DetailPatient" component={DetailsOfPatient}/>
                    <Route exact path="/espaceReceptionist/EditPatient" component={EditPatient}/>
                    
                    <Route exact path="/espaceReceptionist/receptionist-settings" component={Settings}/>
                </Switch>
          </main>
          </BrowserRouter>
    </div>

  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;