import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link,Redirect,useHistory  } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '80ch',
    margin: 'auto',
    border: '3px solid blue',
    background: 'white',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop:theme.spacing(2),
    width: '30ch',
  },
  button:{
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop:theme.spacing(4),
    width: '30ch',
  }
}));

export default function AddMedecin() {
  const classes = useStyles();

  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const history = useHistory();

  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const editPassword = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/utilisateurs`, 
    {
      "username": localStorage.getItem('username'),
      "password": password,
      "newPassword": newPassword,
      "confirmPassword": confirmPassword,
  })
    .then((response) => {
      console.log(response);
      if(response.data == true) history.replace('/espaceRH')
    }, (error) => {
      console.log(error);
    });
  };

  return (
    <div>
        <Link to="/espaceRH">
            <Box display="flex" >
                  <IconButton aria-label="retour" color="primary">
                    <ArrowBackIosIcon fontSize="large" /> 
                  </IconButton>
            </Box>
        </Link>
       
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightMedium" m={1} fontSize="h5.fontSize">
                         Mon profile :
                     </Box>
              </div>
                <div>
                    <TextField
                        label="Username"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        style={{width:'64ch'}}
                        disabled
                        value={localStorage.getItem('username')}
                    />
                </div>
                <div>     
                    <TextField
                            label="Ancien Mot de passe"
                            id="outlined-margin-none"
                            className={classes.textField}
                            variant="outlined"
                            style={{width:'64ch'}}
                            onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <TextField
                      label="Nouveau Mot de passe"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined" 
                      style={{width:'64ch'}}
                      onChange={handleNewPasswordChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Confirmer Nouveau Mot de passe"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div>
                    <Link to="/espaceRH">
                        <Button
                          variant="contained"
                          className={classes.button}
                        >
                          Annuler
                        </Button>
                    </Link>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={editPassword}
                      >
                        Modifier
                      </Button>
                </div>
              
         </div>
    </div>
         
  );
}
