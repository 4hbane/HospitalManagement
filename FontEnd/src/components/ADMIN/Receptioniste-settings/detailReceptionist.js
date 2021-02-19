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
    background: 'white',
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

export default function AddMedecin(props) {
  const classes = useStyles();
  const [staff, setStaff] = React.useState([]);

  React.useEffect(() => {
    const endpoint = `http://localhost:8081/api/personnels/`+props.location.staff.staffId;
    const getStaff = async() =>{
      const  res = await fetch(endpoint);
      const data = await res.json();
      setStaff(data);
    };
    getStaff();
  }, []);


  return (
    <div>
        <Link to="/home/receptionists">
            <Box display="flex" >
                  <IconButton aria-label="delete" color="primary">
                    <ArrowBackIosIcon fontSize="large" /> 
                  </IconButton>
            </Box>
      </Link>
        <div className={classes.root}>
                <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                    Détails un(e) Réceptionnist(e) :
                </Box>
                <Box display="flex" container item xs={6} style={{ width: '100%' }} mx={2} my={4} direction="column" >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}  component="div" display="inline">Nom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.lastName}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1} component="div" display="inline">Prénom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.firstName}</Box>
                </Box>
                
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}  component="div" display="inline">CIN :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.cin}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}  component="div" display="inline">Email :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.email}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}   component="div" display="inline">Adresse :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1} component="div" display="inline">{staff.address}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}  component="div" display="inline">Téléphone :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.phoneNumber}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}   component="div" display="inline">Date de naissance :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1} component="div" display="inline">{staff.birthDate}</Box>
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1} component="div" display="inline">Sexe :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.gender}</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1}   component="div" display="inline">Service :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1} component="div" display="inline">{staff.service}</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" p={1} component="div" display="inline">Date création :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" p={1} mx={1}  component="div" display="inline">{staff.creationDate}</Box>
                </Box>
         </div>
    </div>
  );
}
