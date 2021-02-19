import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '80ch',
    margin: 'auto',
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
    marginTop:theme.spacing(4),
    width: '30ch',
  },
  ButtonsBellow:{
    display: 'flex',
    justifyContent:'space-between', 
    marginLeft: theme.spacing(9),
    marginRight: theme.spacing(9),
  }
}));

export default function AddFolder() {
  const classes = useStyles();
  
  //Get first the nom and Prenom to assign them here so he can know which one is updating

  return (
    <div>
        <div className={classes.root}>
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
                        label="Raison"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>
                
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Conditions existantes"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="Hospitalisation Sercvice"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                    />
                    <TextField
                      id="docteur"
                      label="Docteur"
                      className={classes.textField}
                      variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                      id="date"
                      label="Date d'entrée"
                      type="date"
                      defaultValue="2021-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="date"
                      label="Date de sortie"
                      type="date"
                      defaultValue="2021-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    
                </div>
                <div className={classes.ButtonsBellow}>
                    <Link to="/espaceMedecin" style={{ textDecoration: 'none' }}>
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
                        textDecoration="none"
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
