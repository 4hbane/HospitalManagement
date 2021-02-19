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

function createData(id, name, diagnostic, date) {
  return { id, name, diagnostic, date};
}

const rows = [
  createData(1,'Manal OUTALEB', 'Maux de tête', '2020-01-15'),
  createData(2, 'Manal OUTALEB', 'Maux de gorge', '2020-02-17'),
  createData(3, 'Abdellah AHBANE', 'Diarrhée', '2020-02-14'),
  createData(4,'Mounib ELBOUJBAOUI', 'Mal de tete', '2020-02-14'),
  createData(5,'Ghani KADDOURI', 'Mal de tete', '2020-01-23'),
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
           <Paper component="form" className={classes.search}>
                  <InputBase
                    className={classes.input}
                    placeholder="Rechercher ... "
                  />
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
           </Paper>
          
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Consultation</StyledTableCell>
                  <StyledTableCell align="center">Nom du patient</StyledTableCell>
                  <StyledTableCell align="center">Date de consultation</StyledTableCell>
                  <StyledTableCell align="center">Diagnostique</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="center">{row.diagnostic}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Link to="/espaceMedecin/DetailFolder">
                          <Tooltip title="Details">
                            <IconButton aria-label="Voir detail d'un dossier">
                                  <VisibilityIcon/>
                            </IconButton>
                          </Tooltip>
                      </Link>
                      <Link to="/espaceMedecin/EditFolder">
                        <Tooltip title="Modifier son Dossier Médical">
                            <IconButton aria-label="Modifier dossier Médical de ce patient" color="primary">  
                                  <EditIcon />
                            </IconButton>
                          </Tooltip>
                      </Link>
                    </StyledTableCell>
                    
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
}
