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
  const [staff , setStaff] = React.useState([]);
  const [idToDelete, setIdtoDelete] = React.useState();
  const defaultEndpoint = `http://localhost:8081/api/personnels`;
    const getStaff = async() =>{
      const  res = await fetch(defaultEndpoint);
      const data = await res.json();
      setStaff(data);
    };
  React.useEffect(() => {
    
    getStaff();
  }, []);

  const  handleClickConfirmation = (id)=>{
    setIdtoDelete(id);
    setOpenConfirmation(true);
  }

  const handleDeleteStaff= e =>{
    e.preventDefault();
  let url="http://localhost:8081/api/personnels/"+idToDelete
  axios.delete(url).then((res) =>{
     setOpenConfirmation(false);
     getStaff();
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
            <Link to="/home/AddReceptionist">
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
                  <StyledTableCell align="center">Réceptioniste</StyledTableCell>
                  <StyledTableCell align="center">CIN</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Service</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {staff.filter((val) =>{
                   if(search === "" && val.sfunction === "RECEPTIONIST")
                   { return val}
                   else if ((val.firstName.toLowerCase().includes(search.toLowerCase()) || val.lastName.toLowerCase().includes(search.toLowerCase()) )&& val.sfunction === "RECEPTIONIST" ){
                     return val
                   }
                 })
                ?.map((row) => (
                  <StyledTableRow key={row.id}>
                    
                    <StyledTableCell align="center">{row.firstName} {row.lastName}</StyledTableCell>
                    <StyledTableCell align="center">{row.cin}</StyledTableCell>
                    <StyledTableCell align="center">{row.email}</StyledTableCell>
                    <StyledTableCell align="center">{row.service}</StyledTableCell>
                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link
                      to={{
                        pathname: "/home/detailReceptionist",
                        staff:{
                          staffId: row.id
                        }
                      }}
                      >
                        <Tooltip title="Details">
                          <IconButton aria-label="Voir detail d'un Récéptioniste">
                              <VisibilityIcon/>
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Link
                      to={{
                        pathname: "/home/EditReceptionist",
                        staff:{
                          id: row.id,
                          firstName: row.firstName,
                          lastName: row.lastName,
                          cin: row.cin,
                          email: row.email,
                          phoneNumber: row.phoneNumber,
                          address: row.address,
                          birthDate: row.birthDate,
                          gender: row.gender,
                          status: row.status,
                          service: row.service
                        }
                      }}
                      >
                        <Tooltip title="Modifier">
                            <IconButton aria-label="Modifier Un Réceptionniste" color="primary">  
                                  <EditIcon />
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Tooltip title="Supprimer" onClick={() =>handleClickConfirmation(row.id)}>
                          <IconButton aria-label="Supprimer Un Réceptionniste" color="secondary">
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
                Suppression d'un(e) Réceptioniste
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vous allez supprimer un Récéptioniste,
                  Voulez-vous supprimer ce Récéptioniste !!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseConfirmation}>
                  Annuler
                </Button>
                <Button onClick={handleDeleteStaff} color="secondary">
                  Supprimer
                </Button>
              </DialogActions>
          </Dialog>
    </div>
  );
}
