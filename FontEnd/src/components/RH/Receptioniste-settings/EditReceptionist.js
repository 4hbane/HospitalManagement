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
    value:'Générale',
    label:'Générale'
  }
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

export default function AddMedecin(props) {
  const classes = useStyles();
  const [gender, setGender] = React.useState(props.location.staff.gender);
  const [service, setService] = React.useState(props.location.staff.service);
  const [firstName, setFirstName] = React.useState(props.location.staff.firstName);
  const [lastName, setLastName] = React.useState(props.location.staff.lastName);
  const [address, setAddress] = React.useState(props.location.staff.address);
  const [email, setEmail] = React.useState(props.location.staff.email);
  const [phoneNumber, setPhoneNumber] = React.useState(props.location.staff.phoneNumber);
  const [birthDay, setBirthDay] = React.useState(props.location.staff.birthDate);
  const [cin, setCin] = React.useState(props.location.staff.cin);
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

  const updateStaff = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/personnels/`+props.location.staff.id, 
    {
      "id": props.location.staff.id,
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
      history.replace('/espaceRH/receptionists')
    }, (error) => {
      console.log(error);
    });
  };


  return (
      <div>
            <Link to="/espaceRH/receptionists">
                <Box display="flex" >
                    <IconButton aria-label="delete" color="primary">
                        <ArrowBackIosIcon fontSize="large" /> 
                    </IconButton>
                </Box>
            </Link>
        <div className={classes.root}>
              <div>
                    <Box fontWeight="fontWeightBold" m={1} fontSize="h5.fontSize">
                         Modifier un(e) Réceptionnist(e) :
                     </Box>
                     </div>
                <div>
                    <TextField
                        label="Nom"
                        className={classes.textField}
                        variant="outlined"
                        defaultValue={props.location.staff.firstName}
                        onChange={handleNameChange}
                       
                    />
                    <TextField
                      label="Prénom"
                      defaultValue={props.location.staff.lastName}
                      className={classes.textField}
                      variant="outlined"
                      onChange={handleLastNameChange}
                    />
                </div>
                <div>
                    <TextField
                        label="CIN"
                        defaultValue={props.location.staff.cin}
                        className={classes.textField}
                        variant="outlined"
                        onChange={handleCinChange}
                    />
                    <TextField
                      label="Email"
                      defaultValue={props.location.staff.email}
                      className={classes.textField}
                      onChange={handleEmailChange}
                      variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        defaultValue={props.location.staff.address}
                        label="Adresse"
                        className={classes.textField}
                        onChange={handleAddressChange}
                        style={{width:'64ch'}}
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        label="Téléphone"
                        defaultValue={props.location.staff.phoneNumber}
                        className={classes.textField}
                        variant="outlined"
                        onChange={handlePhoneNumberChange}
                    />
                    <TextField
                      label="Date de naissance"
                      type="date"
                      defaultValue={props.location.staff.birthDate}
                      className={classes.textField}
                      onChange={handleBirthDayChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-select-gender"
                        select
                        label="Genre"
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
                    <Link to="/espaceRH/receptionists">
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
                        onClick={updateStaff}
                      >
                        Modifier
                    </Button>
                </div>
         </div>
      </div>
          
  );
}
