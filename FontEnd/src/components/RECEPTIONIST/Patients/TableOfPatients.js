import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SearchIcon from '@material-ui/icons/Search';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(13)
  },
  table: {
    minWidth: 700,
  },
  search:{
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(36),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  editButton:{
    marginLeft:theme.spacing(2)
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [patient , setpatient] = React.useState([]);
  const [idToDelete, setIdtoDelete] = React.useState();
  const defaultEndpoint = `http://localhost:8081/api/dossiersAdministratifs`;
    const getpatient = async() =>{
      const  res = await fetch(defaultEndpoint);
      const data = await res.json();
      setpatient(data);
    };
  React.useEffect(() => {
    
    getpatient();
  }, []);

  const  handleClickConfirmation = (id)=>{
    setIdtoDelete(id);
    setOpenConfirmation(true);
  }

  const handleDeletepatient= e =>{
    e.preventDefault();
  let url="http://localhost:8081/api/dossiersAdministratifs/"+idToDelete
  axios.delete(url).then((res) =>{
     setOpenConfirmation(false);
     getpatient();
     }).catch((err=>{
      console.log(err)
  }))
  }

  const handleCloseConfirmation=()=>{
    setOpenConfirmation(false);
  }

  const onChange = e =>{
    e.preventDefault();
    setSearch(e.target.value);
  }


  return (
    <div className="container">
            <Link to="/espaceReceptionist/AddPatient">
                <Fab color="primary" className={classes.absolute}>
                    <AddIcon />
                 </Fab>
            </Link>
           <Paper component="form" className={classes.search}>
                  <InputBase
                    className={classes.input}
                    placeholder="Rechercher... "
                    onChange={onChange}
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
           </Paper>
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Patient</StyledTableCell>
                  <StyledTableCell align="center">CIN</StyledTableCell>
                  <StyledTableCell align="center">Téléphone</StyledTableCell>
                  <StyledTableCell align="center">Code Sociale</StyledTableCell>
                  <StyledTableCell align="center">Adresse</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {patient.filter((val) =>{
                   if(search === "")
                   { return val}
                   else if (val.firstName.toLowerCase().includes(search.toLowerCase()) || val.lastName.toLowerCase().includes(search.toLowerCase()) ){
                     return val
                   }
                 })
                ?.map((row) => (
                  <StyledTableRow key={row.number}>    
                    <StyledTableCell align="center">{row.firstName} {row.lastName}</StyledTableCell>
                    <StyledTableCell align="center">{row.cin}</StyledTableCell>
                    <StyledTableCell align="center">{row.phoneNumber}</StyledTableCell>
                    <StyledTableCell align="center">{row.socialSecurityNumber}</StyledTableCell>
                    <StyledTableCell align="center">{row.address}</StyledTableCell>
                    <StyledTableCell align="center">
                    <Link
                      to={{
                        pathname: "/espaceReceptionist/DetailPatient",
                        patient:{
                          patientId: row.number
                        }
                      }}
                      >
                          <Tooltip title="Details">
                            <IconButton aria-label="Voir détail d'un Patient">
                                  <VisibilityIcon/>
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Link
                      to={{
                        pathname: "/espaceReceptionist/EditPatient",
                        patient:{
                          number: row.number,
                          firstName: row.firstName,
                          lastName: row.lastName,
                          cin: row.cin,
                          phoneNumber: row.phoneNumber,
                          address: row.address,
                          dateOfBirth: row.dateOfBirth,
                          gender: row.gender,
                          postalCode: row.postalCode,
                          socialSecurityNumber: row.socialSecurityNumber,
                          medicalFolderNumber: row.medicalFolderNumber,
                          maritalStatus : row.maritalStatus,
                          profession : row.profession,
                        }
                      }}
                      >
                        <Tooltip title="Modifier">
                            <IconButton aria-label="Modifier Un Patient" color="primary">  
                                  <EditIcon />
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Tooltip title="Supprimer" onClick={() =>handleClickConfirmation(row.number)}>
                          <IconButton aria-label="Supprimer Un Patient" color="secondary">
                            <DeleteIcon />
                          </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                    
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
              open={openConfirmation}
              onClose={handleCloseConfirmation}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Suppression d'un Patient:
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vous allez supprimer un patient,
                  Voulez-vous supprimer ce Patient !!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseConfirmation}>
                  Annuler
                </Button>
                <Button onClick={handleDeletepatient} color="secondary">
                  Supprimer
                </Button>
              </DialogActions>
          </Dialog>
    </div>
  );
}
