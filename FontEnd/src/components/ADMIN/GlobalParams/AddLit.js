import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useHistory, Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const services = [
  {
    value: 'Maternité',
    label: 'Maternité',
  },
  {
    value: 'Urgences',
    label: 'Urgences',
  },
  {
    value: 'Réanimation',
    label: 'Réanimation',
  },
  {
    value: 'Neurologie',
    label: 'Neurologie',
  },
  {
    value: 'Cardiologie',
    label: 'Cardiologie',
  },
  {
    value: 'Pédiatrie',
    label: 'Pédiatrie',
  },
  {
    value: 'Dermatologie',
    label: 'Dermatologie',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '80ch',
    margin: 'auto',
    border: '2px solid blue',
    background: "white",
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
  const [service, setService] = React.useState("");
  
  const history =useHistory();

 
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };
  return (
    <div>
        <Link to="/home/lits">
            <Box display="flex" >
                  <IconButton aria-label="delete" color="primary">
                    <ArrowBackIosIcon fontSize="large" /> 
                  </IconButton>
            </Box>
        </Link>
       
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightBold" m={1} fontSize="h5.fontSize">
                         Ajouter un nouveau Lit
                     </Box>
              </div>
                <div>
                    <TextField
                        label="Numéro de chambre"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                      label="Numéro d'étage"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                    />
                </div>
                
                <div>
                    
                    <TextField
                        id="outlined-select-service"
                        select
                        label="Service"
                        value={service}
                        onChange={handleServiceChange}
                        className={classes.textField}
                        variant="outlined"
                    >
                      {services.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Prix"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                    />
                  
                </div>
                <div>
                    <Link to="/home/lits" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          className={classes.button}
                        >
                          Annuler
                        </Button>
                    </Link>
                    <Link to="/home/lits" style={{ textDecoration: 'none' }}>
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
