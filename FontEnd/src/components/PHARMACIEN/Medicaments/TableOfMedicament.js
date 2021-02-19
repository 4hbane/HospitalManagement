import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Karima', 159, 6.0, 24, 4.0),
  createData('Ayoub', 237, 9.0, 37, 4.3),
  createData('Hamid', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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

  const handleClickConfirmation=()=>{
    setOpenConfirmation(true);
  }

  const handleCloseConfirmation=()=>{
    setOpenConfirmation(false);
  }

  return (
    <div className="container">
            <Link to="/espacePharmacien/AddMedicament">
                <Fab color="primary" className={classes.absolute}>
                    <AddIcon />
                 </Fab>
            </Link>
           <Paper component="form" className={classes.search}>
                  <InputBase
                    className={classes.input}
                    placeholder="Search "
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
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.calories}</StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to="/espacePharmacien/DetailMedicament">
                          <Tooltip title="Details">
                            <IconButton aria-label="Voir detail d'un médicament">
                                  <VisibilityIcon/>
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Link to="/espacePharmacien/EditMedicament">
                        <Tooltip title="Modifier">
                            <IconButton aria-label="Modifier Un Patient" color="primary">  
                                  <EditIcon />
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Tooltip title="Supprimer" onClick={handleClickConfirmation}>
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
                Suppression d'un Médicament
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Vous allez supprimer un Médicament,
                  Voulez-vous supprimer ce Médicament !!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseConfirmation}>
                  Annuler
                </Button>
                <Button onClick={handleCloseConfirmation} color="secondary">
                  Supprimer
                </Button>
              </DialogActions>
          </Dialog>
    </div>
  );
}
