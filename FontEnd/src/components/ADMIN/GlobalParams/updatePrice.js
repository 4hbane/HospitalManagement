import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



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

export default function AddMedecin(props) {
  const classes = useStyles();

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
                          Modifier Prix d'un Lit :
                      </Box>
                </div>
                <div>
                    <TextField
                        label="Prix d'un Lit / Jours"
                        className={classes.textField}
                        variant="outlined"
                        fullWidth
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
                          Modifier
                      </Button>
                      </Link>
                  </div>              
          </div>
      </div>
          
  );
}
