import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import logo from 'enl-images/brand-logo.png';



const RxHeader = styled('div')`
    padding: 10px;
`;
const RxContent = styled('div')`
    padding: 25px;
    p {
        margin: 0;
    }
`;

const styles = (theme) => ({
  root: {
    background: '#fff',
    border: '1px solid #dedede',
  },
  patientDetails: {
    border: '1px solid #dedede',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  symptoms: {

  },
  table: {
    margin: 0,
    width: '100%',
    // border: '1px solid rgba(224, 224, 224, 1)',
    '& .MuiTableRow-head': {
      background: '#f5f5f5'
    }
  },
  logo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  footer: {
    background: '#f5f5f5',
    padding: '10px 20px',
    borderRadius: 4
  },
  header: {
    textAlign: 'center',
    width: '100%',
    '& h3': {
      fontSize: 34,
      fontWeight: 500,
      margin: 0
    }
  },
  Medicines: {
    width: '100%',
  }
});
class Invoice extends Component {
  // classes = useStyles();
  render() {
    const { classes, billingDetails } = this.props;
    const {
      billing_details, clinic_name, clinic_phones, billing_name, billing_date, age, gender, mobile, booking_id
    } = billingDetails;
    return (
      <div className={classes.root}>
        <RxContent>{console.log("billingDetails", billingDetails)}
          {/* <Grid container spacing={2} justify="center">
            <Grid item sm={12} className={classes.header}>
              <h3>{clinic_name}</h3>
              <p>
                Phone:
                {clinic_phones}
              </p>
            </Grid>
            <Grid item sm={12} >
              <Grid container justify="center">
                <Grid item sm={4}>
                  <p>
                    <b>Name:</b>
                    <span>
                      {' '}
                      {billing_name}
                      {' '}
                    </span>
                  </p>
                  <p>
                    <b>Age/Sex:</b>
                    <span>
                      {' '}
                      {age}
                      ,
                      {' '}
                      {gender}
                    </span>
                  </p>
                  <p>
                    <b>Booking ID:</b>
                    <span>
                      {' '}
                      {booking_id}
                    </span>
                  </p>
                </Grid>
                <Grid item sm={4}>
                  <p>
                    <b>Date:</b>
                    <span>
                      {' '}
                      {billing_date}
                      {' '}
                    </span>
                  </p>
                  <p>
                    <b>Mobile:</b>
                    <span>
                      {' '}
                      {mobile}
                    </span>
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid container spacing={2} justify="center">
            <Grid item sm={12} className={classes.header}>
              <h3>Invoice</h3>
            </Grid>
            <Grid item sm={12} >
              <Grid container justify="center">
                <Grid item sm={5}>
                  <b>{clinic_name}</b>
                  {/* <p>{clinic_address}</p> */}
                  <p>1st Floor, Shradha building, near bus depot, Tokarkhada, Silvaasa</p>
                  <p>
                    <b>Phone:</b>
                    <span>+91 {clinic_phones}</span>
                  </p>
                </Grid>
                <Grid item sm={4}>
                  <p>
                    <b>Cust Name: </b>
                    <b>{billing_name}</b>
                  </p>
                  <p>
                    <b>Age/Gender: </b>
                    <span>{age}/{gender}</span>
                  </p>
                  <p>
                    <span>Phone: </span>
                    <span>
                      {' '}
                      {mobile}
                    </span>
                  </p>
                </Grid>
                <Grid item sm={3}>
                  <p>
                    <b>Invoice No: </b>
                    <span>{billing_details.bill_no}</span>
                  </p>
                  <p>
                    <b>Inv Date: </b>
                    <span>{billing_date}</span>
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item sm={12} className={classes.Medicines}>
              <TableContainer>
                {/* <p style={{ paddingLeft: 10, marginBottom: 10 }}>
                  <b>Bill No:</b>
                  {' '}
                  {billing_details.bill_no}
                  {' '}
                </p> */}
                <h4 style={{textAlign: 'center', padding: 10}}>Doctor Name: {clinic_name}</h4>
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ padding: 10 }}>S. No.</TableCell>
                      <TableCell align="left">Items</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {billing_details.bill_details.map((item, index) => (
                      <TableRow key={item.product_name}>
                        <TableCell component="th" scope="row" align="left">
                          {' '}
                          {index + 1}
                        </TableCell>
                        <TableCell align="left"><b>{item.product_name}</b></TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          &#8377;
                          {item.amount}
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow key="total">
                      <TableCell component="th" scope="row" align="left" />
                      <TableCell align="left" />
                      <TableCell align="right" />
                      <TableCell align="right">
                        <b>Total: </b>
                        {' '}
                        &#8377;
                        {' '}
                        {billing_details.amount}
                        {' '}
                      </TableCell>
                    </TableRow>

                    <TableRow key="disc">
                      <TableCell component="th" scope="row" align="left" />
                      <TableCell align="left" />
                      <TableCell align="right" />
                      <TableCell align="right">
                        <b>Discount: </b>
                        {' '}
                        &#8377;
                        {' '}
                        {billing_details.discount}
                      </TableCell>
                    </TableRow>

                    <TableRow key="sgst">
                      <TableCell component="th" scope="row" align="left" />
                      <TableCell align="left" />
                      <TableCell align="right" />
                      <TableCell align="right">
                        <b>SGST: </b>
                        {' '}
                        &#8377;
                        {' '}
                        {billing_details.sgst}
                      </TableCell>
                    </TableRow>

                    <TableRow key="igst">
                      <TableCell component="th" scope="row" align="left" />
                      <TableCell align="left" />
                      <TableCell align="right" />
                      <TableCell align="right">
                        <b>CGST: </b>
                        {' '}
                        &#8377;
                        {' '}
                        {billing_details.cgst}
                      </TableCell>
                    </TableRow>

                    <TableRow key="totalpay">
                      <TableCell component="th" scope="row" align="left" />
                      <TableCell align="left" />
                      <TableCell align="right" />
                      <TableCell align="right">
                        <b>Total Payable: </b>
                        {' '}
                        &#8377;
                        {' '}
                        {billing_details.total}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <small>* If you have questions concerning this invoice, contact on reception desk</small>
                <p style={{textAlign: 'center', marginTop: 10, marginBottom: 0}}>THANK YOU FOR YOUR VISIT</p>
              </TableContainer>
            </Grid>
          </Grid>
        </RxContent>
      </div>
    );
  }
}

export default withStyles(styles)(Invoice);