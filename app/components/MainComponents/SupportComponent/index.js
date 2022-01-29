import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import CreateTicket from './Dialogs/CreateTicket';
import helper from '../../../helpers/helpers';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id', numeric: true, disablePadding: true, label: 'Ticket Id'
  },
  {
    id: 'subject', numeric: true, disablePadding: false, label: 'Subject'
  },
  {
    id: 'created', numeric: true, disablePadding: false, label: 'Created Date'
  },
  {
    id: 'remarks', numeric: true, disablePadding: false, label: 'Remarks'
  },
  {
    id: 'status', numeric: false, disablePadding: false, label: 'Status'
  },
];

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, rowCount, onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  table: {
    minWidth: 750,
    '& .MuiTableCell-root': {
      borderBottom: '1px solid #dedede'
    }
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  chips: {
    '& div': {
      height: 24,
      fontSize: '0.6125rem',
      fontWeight: 600,
      borderRadius: 5
    }
  },
  open: {
    background: '#1976d2',
    color: '#fff',
  },
  closed: {
    background: '#28a745',
    color: '#fff'
  },
  reOpen: {
    background: '#ffc107',
    color: '#fff'
  },
  topSection: {
    padding: 20,
    background: '#f5f5f5',
    '& input': {
      padding: 10,
      maxWidth: 500,
      width: '100%',
      border: 'none'
    },
    '& h6': {
      margin: '10px 0',
    }
  },
  search: {
    position: 'relative',
    width: 622,
    margin: 'auto',
    boxShadow: '0 4px 16px 0 rgb(0 0 0 / 9%)',
    '& button': {
      position: 'absolute',
      borderRadius: 0,
      height: '-webkit-fill-available',
      textTransform: 'capitalize',
      background: '#fff',
      '&:hover': {
        background: 'rgb(0 27 255 / 5%)'
      }
    }
  },
  vDivider: {
    width: 1,
    height: 30,
    background: '#758393',
    display: 'block',
    position: 'absolute',
    zIndex: 11,
    top: 0,
    bottom: 0,
    right: 122,
    margin: 'auto',
  },
  noDetails: {
    color: 'rgb(224, 224, 224)',
    padding: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

export default function SupportComponent({ ticket_list }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('subject');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ticketRow, setTicketRow] = useState([]);
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const history = useHistory();

  const routeChange = () => {
    const path = '/app/support/chat';
    history.push(path);
  };

  useEffect(() => {
    setTicketRow(ticket_list);
  }, [ticket_list]);

  const searchTicket = (event) => {
    const serach_value = event.target.value;
    const cap_search = serach_value.toUpperCase();
    const search_user = [];
    if (ticket_list.length > 0) {
      ticket_list.map((item, index) => {
        const { ticket_no } = item;
        if (ticket_no.toUpperCase().indexOf(cap_search) > -1) {
          search_user.push(item);
        }
      });
      setTicketRow(search_user);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <div className={classes.topSection}>
              <Typography variant="h6" align="center">How can we help you?</Typography>
              <div className={classes.search}>
                <input type="search" onChange={searchTicket} placeholder="Search by Ticket Id" />
                <span className={classes.vDivider} />
                {/* <Button>Create new Ticket</Button> */}
                <CreateTicket />
              </div>
            </div>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={ticketRow.length}
                />
                <TableBody>
                  {ticketRow.length !== 0 ? (
                    <>

                      {stableSort(ticketRow, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={row.id}
                          >
                            <TableCell padding="none">
                              {isFrontdesk ? (
                                <Link style={{ paddingLeft: 10 }}>{row.ticket_no}</Link>
                                ) : (
                                <Link style={{ paddingLeft: 10 }} to={`/app/support/chat/${row.id}`}>{row.ticket_no}</Link>
                              )}
                            </TableCell>
                            <TableCell align="left"><b>{row.support_category.name}</b></TableCell>
                            <TableCell align="left">{helper.changeDateFormat(row.created_at, 'dd-MM-yyyy')}</TableCell>
                            <TableCell align="left" width="300">{row.issue}</TableCell>
                            <TableCell align="right" className={classes.chips}>
                              {(() => {
                                switch (row.issue_status) {
                                  case 0:
                                    return (
                                      <Chip label="Open" className={classes.open} />
                                    );
                                  case 1:
                                    return (
                                      <Chip label="Processeing" className={classes.reOpen} />
                                    );
                                  case 2:
                                    return (
                                      <Chip label="Closed" className={classes.closed} />
                                    );
                                }
                              })()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </>
                  ) : (
                    <TableCell colSpan={6}>
                      <div className={classes.noDetails}>
                        <ErrorOutline style={{ fontSize: 80 }} />
                        <Typography>No Tickets Found</Typography>
                      </div>
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={ticketRow.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
