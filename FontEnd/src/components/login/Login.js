import React, { useState } from 'react';
import { Redirect,useHistory } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const APIURL = 'http://localhost:8081/login';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        MNA Hospital
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  

  const handleSubmit = async e => {
      e.preventDefault();
      var data = {username, password}
        axios.post(APIURL, data).then(
          res => {
              localStorage.clear();
              if( res.headers['authorization'] != null){
                localStorage.setItem('token', res.headers['authorization']);
                localStorage.setItem('username', res.headers['username']);
                localStorage.setItem('role', res.headers['role']);
                if(localStorage.getItem('role') == "ADMIN"){
                  history.replace('/home')
               }
               else if(localStorage.getItem('role') == "DIRECTOR"){
                  history.replace('/espaceDirecteur')
               } 
               else if(localStorage.getItem('role') == "DOCTOR"){
                  history.replace('/espaceMedecin')
               }
               else if(localStorage.getItem('role') == "PHARMACIST"){
                  history.replace('/espacePharmacien')
               }
               else if(localStorage.getItem('role') == "RECEPTIONIST"){
                  history.replace('/espaceReceptionist')
               }
               else if(localStorage.getItem('role') == "RH"){
                history.replace('/espaceRH')
                }
                return true;
              }
              return false;
        }
        ).catch(
          err => {
              console.log(err);
          }
        )
    }


  return (
    <Container component="main" maxWidth="xs">
      
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        authentifiez-vous
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setUserName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Se connecter
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}