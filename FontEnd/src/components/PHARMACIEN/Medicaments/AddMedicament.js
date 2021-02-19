import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Link  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const genders = [
  {
    value: 'FEMALE',
    label: 'F',
  },
  {
    value: 'MALE',
    label: 'M',
  },
];

const statuslist = [
  {
    value: 'Marié(e)',
    label: 'Marié(e)',
  },
  {
    value: 'Célibataire',
    label: 'Célibataire',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '80ch',
    margin: 'auto',
    border: '2px solid blue',
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

export default function AddFolder() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('MALE');
  const [status, setStatus] = React.useState('Célibataire');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  
  // to submit this form add to those attributs another one 
  // medicalFolderNumber = null; because in the first time the patient has no medical folder.

  return (
    <div>
        <Link to="/espacePharmacien">
            <Box display="flex" >
                  <IconButton aria-label="retour" color="primary">
                    <ArrowBackIosIcon fontSize="large" /> 
                  </IconButton>
            </Box>
        </Link>
       
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightMedium" m={1} fontSize="h5.fontSize">
                         Ajouter un Médicament :
                     </Box>
              </div>
              <div>
                    <TextField
                        label="Nom"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                      label="Prénom"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="CIN"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                        label="Téléphone"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                </div>
                
                <div>
                    <TextField
                        label="Adresse"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                      label="Code Postale"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Numéro Sociale de Sécurité"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="Profession"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                      id="date"
                      label="Date de naissance"
                      type="date"
                      defaultValue="2021-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-gender"
                        select
                        label="Sexe"
                        value={gender}
                        onChange={handleGenderChange}
                        className={classes.textField}
                        variant="outlined"
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                        id="outlined-select-status"
                        select
                        label="Status"
                        value={status}
                        onChange={handleStatusChange}
                        className={classes.textField}
                        variant="outlined"
                    >
                      {statuslist.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                </div>
                <div>
                    <Link to="/espacePharmacien">
                        <Button
                          variant="contained"
                          className={classes.button}
                        >
                          Annuler
                        </Button>
                    </Link>
                    <Link to="/espacePharmacien">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Ajouter
                      </Button>
                    </Link>
                </div>
              
         </div>
    </div>
         
  );
}
