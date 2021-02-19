import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link  } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '80ch',
    margin: 'auto',
    border: '2px solid blue',
    marginTop:theme.spacing(3),
    paddingTop: theme.spacing(3),
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

export default function FolderDetail(props) {
  const classes = useStyles();
  const [patient, setPatient] = React.useState([]);

  React.useEffect(() => {
    const endpoint = `http://localhost:8081/api/dossiersAdministratifs/`+props.location.patient.patientId;
    const getPatient = async() =>{
      const  res = await fetch(endpoint);
      const data = await res.json();
      setPatient(data);
    };
    getPatient();
  }, []);
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
                <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                    Détails d'un Patient :
                </Box>
                <Box display="flex" container item xs={6} style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>Nom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>{patient.lastName}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Prénom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>{patient.firstName}</Box>
                </Box>
                
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>CIN :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline"  className={classes.textField}>{patient.cin}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Téléphone :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>{patient.phoneNumber}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="100%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" >Adresse :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" mx={2} component="div" display="inline" >{patient.address},{patient.postalCode}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" >Code Sociale de sécurité: </Box>
                    <Box fontWeight="fontWeightRegular" mx={2} fontSize="h6.fontSize"  component="div" display="inline" >{patient.socialSecurityNumber}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"    component="div" display="inline" className={classes.textField}>Profession :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>{patient.profession}</Box>
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Date Naissance :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>{patient.dateOfBirth}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>Sexe :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>{patient.gender}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" component="div" display="inline" className={classes.textField}>Status :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>{patient.maritalStatus}</Box>
                </Box>
         </div>
    </div>
  );
}
