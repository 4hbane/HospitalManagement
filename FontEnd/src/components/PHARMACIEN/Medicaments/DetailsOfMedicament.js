import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link  } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: '100ch',
    margin: 'auto',
    background: '#cccccc',
    marginTop:theme.spacing(3),
    padding:theme.spacing(4),
  },
  textField: {
    textAlign:'left',
    width: '40ch',
  },
}));

export default function FolderDetail() {
  const classes = useStyles();
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
                <Box fontWeight="fontWeightBold" fontSize="h5.fontSize">
                    Details d'un Médicament :
                </Box>
                <Box display="flex" container item xs={6} style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>Nom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Abdell</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Prénom :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>firstName</Box>
                </Box>
                
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>CIN :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline"  className={classes.textField}>cin</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Téléphone :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>email</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="100%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" >Adresse :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize" mx={2} component="div" display="inline" >address, Adresse, Adresse , Adresse + Code postale</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" >Code Sociale de sécurité: </Box>
                    <Box fontWeight="fontWeightRegular" mx={2} fontSize="h6.fontSize"  component="div" display="inline" >Code sociale..</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"    component="div" display="inline" className={classes.textField}>Profession :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>Profession</Box>
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Date Naissance :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>D.Naissance</Box>
                </Box>
                <Box display="flex" style={{ width: '100%' }} mx={2} my={4} >
                    <Box  height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize"   component="div" display="inline" className={classes.textField}>Sexe :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>Male</Box>
                    <Box height="50%" fontWeight="fontWeightBold" fontSize="h6.fontSize" component="div" display="inline" className={classes.textField}>Status :</Box>
                    <Box fontWeight="fontWeightRegular" fontSize="h6.fontSize"  component="div" display="inline" className={classes.textField}>status</Box>
                </Box>
         </div>
    </div>
  );
}
