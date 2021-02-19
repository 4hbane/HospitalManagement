import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useHistory, Redirect} from 'react-router-dom';
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
    backgroundColor: "white",
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
  const [number, setNumber] = React.useState(); 
  const [gender, setGender] = React.useState(""); 
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [dateOfBirth, setDateOfBirth] = React.useState();
  const [postalCode, setPostalCode] = React.useState("");
  const [cin, setCin] = React.useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState();
  const [medicalFolderNumber, setMedicalFolderNumber] = React.useState();
  const [profession , setProfession] = React.useState("");
  const [maritalStatus, setMaritalStatus] = React.useState("");
  const history =useHistory();

  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };
  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };
  const handleSocialSecurityNumberChange = (event) => {
    setSocialSecurityNumber(event.target.value);
  };
  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handledateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };
  const handleCinChange = (event) => {
    setCin(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const addPatient = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8081/api/dossiersAdministratifs`, 
    {
      "firstName": firstName,
      "lastName": lastName,
      "gender": gender,
      "dateOfBirth": dateOfBirth,
      "address": address,
      "postalCode": postalCode,
      "maritalStatus": maritalStatus,
      "profession": profession,
      "phoneNumber": phoneNumber,
      "socialSecurityNumber": socialSecurityNumber,
      "medicalFolderNumber": null,
      "cin": cin,
  })
    .then((response) => {
      console.log(response);
      history.replace('/espaceReceptionist')
    }, (error) => {
      console.log(error);
    });
  };

  
  // to submit this form add to those attributs another one 
  // medicalFolderNumber = null; because in the first time the patient has no medical folder.

  return (
    <div>
        <Link to="/espaceReceptionist">
            <Box display="flex" >
                  <IconButton aria-label="retour" color="primary">
                    <ArrowBackIosIcon fontSize="large" /> 
                  </IconButton>
            </Box>
        </Link>
       
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightMedium" m={1} fontSize="h5.fontSize">
                         Ajouter un Patient :
                     </Box>
              </div>
                <div>
                    <TextField
                        label="Nom"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleLastNameChange}
                    />
                    <TextField
                      label="Prénom"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                      onChange={handleFirstNameChange}
                    />
                </div>
                <div>
                    <TextField
                        label="CIN"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleCinChange}
                    />
                    <TextField
                        label="Téléphone"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                
                <div>
                    <TextField
                        label="Adresse"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleAddressChange}
                    />
                    <TextField
                      label="Code Postale"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                      onChange={handlePostalCodeChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Numéro Sociale de Sécurité"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                        onChange={handleSocialSecurityNumberChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Profession"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleProfessionChange}
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
                      onChange={handledateOfBirthChange}
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
                        value={maritalStatus}
                        onChange={handleMaritalStatusChange}
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
                    <Link to="/espaceReceptionist">
                        <Button
                          variant="contained"
                          className={classes.button}
                        >
                          Annuler
                        </Button>
                    </Link>
                    <Link to="/espaceReceptionist">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={addPatient}
                      >
                        Ajouter
                      </Button>
                    </Link>
                </div>
              
         </div>
    </div>
         
  );
}
