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
  {
    value: 'Générale',
    label: 'Générale',
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
  const [gender, setGender] = React.useState("");
  const [service, setService] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [birthDay, setBirthDay] = React.useState();
  const [cin, setCin] = React.useState("");
  const history =useHistory();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleServiceChange = (event) => {
    setService(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleBirthDayChange = (event) => {
    setBirthDay(event.target.value);
  };

  const handleCinChange = (event) => {
    setCin(event.target.value);
  };

  const addStaff = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8081/api/personnels`, 
    {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "phoneNumber": phoneNumber,
      "address": address,
      "birthDate": birthDay,
      "gender": gender,
      "status": "ACTIVE",
      "service": service,
      "sfunction": "RECEPTIONIST",
      "cin": cin
  })
    .then((response) => {
      console.log(response);
      history.replace('/home/receptionists')
    }, (error) => {
      console.log(error);
    });
  };


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
              <div>
                    <Box fontWeight="fontWeightBold" m={1} fontSize="h5.fontSize">
                         Ajouter un(e) Réceptionnist(e) :
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
                      onChange={handleNameChange}
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
                      label="email"
                      id="outlined-margin-none"
                      className={classes.textField}
                      variant="outlined"
                      onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-full-width"
                        label="Adresse"
                        className={classes.textField}
                        style={{width:'64ch'}}
                        variant="outlined"
                        onChange={handleAddressChange}
                    />
                </div>
                <div>
                    <TextField
                        label="Téléphone"
                        id="outlined-margin-none"
                        className={classes.textField}
                        variant="outlined"
                        onChange={handlePhoneNumberChange}
                    />
                    <TextField
                      id="date"
                      label="Date de naissance"
                      type="date"
                      //defaultValue="2021-05-24"
                      onChange={handleBirthDayChange}
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
                </div>
                <div>
                    <Link to="/home/receptionists">
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
                        onClick={addStaff}
                      >
                        Ajouter
                      </Button>
                </div>
         </div>
    </div>
         
  );
}
