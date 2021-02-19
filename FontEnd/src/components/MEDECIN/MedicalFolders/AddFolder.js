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

const services = [
  {
    value: 'A',
    label: 'A',
  },
  {
    value: 'B',
    label: 'B',
  },
  {
    value: 'C',
    label: 'C',
  },
  {
    value: 'Default',
    label: 'Default',
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
  const [service, setService] = React.useState('Default');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  return (
      <div>
            <Link to="/espaceMedecin">
                <Box display="flex" >
                    <IconButton aria-label="retour" color="primary">
                        <ArrowBackIosIcon fontSize="large" /> 
                    </IconButton>
                </Box>
            </Link>
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightMedium" m={1} fontSize="h5.fontSize">
                         Ajouter un Dossier Médical :
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
                        id="outlined-full-width"
                        label="Conditoions Médicales"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="régime"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>

                <div>
                    <Link to="/espaceMedecin"  style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          className={classes.button}
                        >
                          Annuler
                        </Button>
                    </Link>
                    <Link to="/espaceMedecin"  style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Modifier
                      </Button>
                    </Link>
                </div>
              
         </div>
      </div>
          
  );
}
