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
    value: 'Marie',
    label: 'Marié(e)',
  },
  {
    value: 'Celibataire',
    label: 'Célibataire',
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

export default function AddFolder(props) {
  const classes = useStyles();
  const [number, setNumber] = React.useState(props.location.patient.number); 
  const [gender, setGender] = React.useState(props.location.patient.gender); 
  const [firstName, setFirstName] = React.useState(props.location.patient.firstName); 
  const [lastName, setLastName] = React.useState(props.location.patient.lastName); 
  const [address, setAddress] = React.useState(props.location.patient.address); 
  const [phoneNumber, setPhoneNumber] = React.useState(props.location.patient.phoneNumber); 
  const [dateOfBirth, setDateOfBirth] = React.useState(props.location.patient.dateOfBirth); 
  const [postalCode, setPostalCode] = React.useState(props.location.patient.postalCode); 
  const [cin, setCin] = React.useState(props.location.patient.cin); 
  const [socialSecurityNumber, setSocialSecurityNumber] = React.useState(props.location.patient.socialSecurityNumber); 
  const [profession , setProfession] = React.useState(props.location.patient.profession); 
  const [maritalStatus, setMaritalStatus] = React.useState(props.location.patient.maritalStatus); 
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


  
  const updatePatient = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/dossiersAdministratifs/`+props.location.patient.number, 
    {
      "number": props.location.patient.number,
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
      "medicalFolderNumber": props.location.patient.medicalFolderNumber,
      "cin": cin,
  })
    .then((response) => {
      console.log(response);
      history.replace('/espaceReceptionist')
    }, (error) => {
      console.log(error);
    });
  };


  // This time assign to the medicalFolderNumber = his old value if it exists! just don't edit it !
  

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
                    <Box fontWeight="fontWeightBold" m={1} fontSize="h5.fontSize">
                         Modifier un Patient :
                     </Box>
              </div>
                <div>
                    <TextField
                        label="Nom"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        defaultValue={props.location.patient.LastName}
                        onChange={handleLastNameChange}
                        defaultValue={props.location.patient.firstName}

                    />
                    <TextField
                      label="Prénom"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                      onChange={handleFirstNameChange}
                      defaultValue={props.location.patient.firstName}
                    />
                </div>
                <div>
                    <TextField
                        label="CIN"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleCinChange}
                        defaultValue={props.location.patient.cin}
                    />
                    <TextField
                        label="Téléphone"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handlePhoneNumberChange}
                        defaultValue={props.location.patient.phoneNumber}
                    />
                </div>
                
                <div>
                    <TextField
                        label="Adresse"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleAddressChange}
                        defaultValue={props.location.patient.address}
                    />
                    <TextField
                      label="Code Postale"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                      onChange={handlePostalCodeChange}
                      defaultValue={props.location.patient.postalCode}
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
                        defaultValue={props.location.patient.socialSecurityNumber}
                    />
                </div>
                <div>
                    <TextField
                        label="Profession"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleProfessionChange}
                        defaultValue={props.location.patient.profession}
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
                      defaultValue={props.location.patient.dateOfBirth}
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
                        defaultValue={props.location.patient.gender}
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
                        defaultValue={props.location.patient.maritalStatus}
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
               
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={updatePatient}
                      >
                        Modifier
                      </Button>
              
                </div>
         </div>
    </div>
         
  );
}
