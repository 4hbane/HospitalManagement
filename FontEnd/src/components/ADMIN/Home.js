import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
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

import Table from "./Medecins-settings/TableOfMedecins"
import DetailsMedecin from "./Medecins-settings/DetailsOfMedecin";
import AddMedecin from "./Medecins-settings/AddMedecin";
import EditMedecin from "./Medecins-settings/EditMedecin";

import Pharmaciens from "./Pharmaciens-settings/TableOfPharmaciens";
import DetailsPharmacien from "./Pharmaciens-settings/DetailsOfPharmacien";
import AddPharmacien from "./Pharmaciens-settings/AddPharmacien";
import EditPharmacien from "./Pharmaciens-settings/EditPharmacien";

import RHs from "./RHs-settings/TableOfRHs";
import DetailsRH from "./RHs-settings/DetailsOfRH";
import AddRH from "./RHs-settings/AddRH";
import EditRH from "./RHs-settings/EditRH";


import Receptionists from "./Receptioniste-settings/TableOfReceptionists";
import detailReceptionist from "./Receptioniste-settings/detailReceptionist";
import AddReceptionist from "./Receptioniste-settings/AddReceptionist";
import EditReceptionist from "./Receptioniste-settings/EditReceptionist";


import Lits from "./GlobalParams/Lits";
import AddLit from "./GlobalParams/AddLit";
import EditLit from "./GlobalParams/updatePrice";

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
    background: 'linear-gradient(45deg, #1f4ffd 30%, #b7c7ff 90%)',
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
        <Link to ="/home" className={classes.link}>
          <ListItem button key={"Médecins"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Médecins"} />
          </ListItem>
        </Link>
        <Link to="/home/RHs" className={classes.link}>
          <ListItem button key={"RHs"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"RHs"} />
          </ListItem>
        </Link>
        <Link to="/home/Pharmaciens" className={classes.link}>
          <ListItem button key={"Pharmaciens"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Pharmaciens"} />
          </ListItem>
        </Link>
        <Link to="/home/receptionists" className={classes.link}>
          <ListItem button key={"receptionists"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Réceptionnistes"} />
          </ListItem>
        </Link>
        <Link to="/home/lits" className={classes.link}>
          <ListItem button key={"Paramètres Globalaux"}>
            <ListItemIcon><ListIcon/></ListItemIcon>
            <ListItemText primary={"Paramètres Globalaux"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/home/admin-settings" className={classes.link}>
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
            Espace Admin
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
                    <Route exact path="/home" component={Table}/>
                    <Route exact path="/home/AddMedecin" component={AddMedecin}/>
                    <Route exact path="/home/detailMedecin" component={DetailsMedecin}/>
                    <Route exact path="/home/EditMedecin" component={EditMedecin}/>
                    
                    <Route exact path="/home/RHs" component={RHs}/>
                    <Route exact path="/home/AddRH" component={AddRH}/>
                    <Route exact path="/home/detailRH" component={DetailsRH}/>
                    <Route exact path="/home/EditRH" component={EditRH}/>

                    <Route exact path="/home/Pharmaciens" component={Pharmaciens}/>
                    <Route exact path="/home/AddPharmacien" component={AddPharmacien}/>
                    <Route exact path="/home/detailPharmacien" component={DetailsPharmacien}/>
                    <Route exact path="/home/EditPharmacien" component={EditPharmacien}/>

                    <Route exact path="/home/receptionists" component={Receptionists}/>
                    <Route exact path="/home/AddReceptionist" component={AddReceptionist}/>
                    <Route exact path="/home/detailReceptionist" component={detailReceptionist}/>
                    <Route exact path="/home/EditReceptionist" component={EditReceptionist}/>

                    <Route exact path="/home/lits" component={Lits}/>
                    <Route exact path="/home/editLit" component={EditLit}/>
                    <Route exact path="/home/addLit" component={AddLit}/>

                    <Route exact path="/home/admin-settings" component={Settings}/>
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