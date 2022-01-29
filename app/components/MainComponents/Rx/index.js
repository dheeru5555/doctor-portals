import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import logo from 'enl-images/brand-logo.png';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const RxHeader = styled('div')`
    padding: 10px;
`;
const RxContent = styled('div')`
    padding: 25px;
    p {
        margin: 0;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#fff',
        border: '1px solid #dedede'
    },
    patientDetails: {
        border: '1px solid #dedede',
        borderRadius: 5,
        marginBottom: 15
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
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    Medicines: {
        '& .MuiTableCell-root': {
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            borderRight: '1px solid rgba(224, 224, 224, 1)',
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
    }
}));

function createData(id, name, composition, frequency, duration, notes) {
    return { id, name, composition, frequency, duration, notes };
}

const rows = [
    createData(1, 'Powder Gudlax', 'Lactulose(10 gm) + Ispaghula husk(3.5 gm)', '0 - 1 - 1', '5 Days', 'After Lunch, After Dinner'),
    createData(2, 'Sachet Vitanova D3', 'Cholecalciferol (Vitamin D3)', '3/4 sachet - 6 hourly (O--O--O--O)', '3 Days',),
    createData(3, 'Syrup Crocin 120', 'Paracetamol(120 mg)', '4 ml - Thrice a day', '3 Days',),
    createData(4, 'Capsule Rejunex OD', 'Folic Acid + Methylcobalamin + Pyridoxine + Alpha Lipoic Acid', '0 - 1 - 1', 'Stat', 'After Lunch, After Dinner'),
    createData(5, 'Tablet Novex-DS', 'Ormeloxifene(60 mg)', '1 tablet - 12 hourly (O--O)', '3 Days',),
];

function Rx(props) {
    const classes = useStyles();
    const {prescriptionTemplate} = props;


    if(
        (prescriptionTemplate === null) ||
        (prescriptionTemplate === undefined)
    ) {
        return (
            <div style={{display: 'flex', color: '#e0e0e0', alignItems:"center", justifyContent:"center", flexDirection: 'column', height: 600}}>
                <ErrorOutline style={{fontSize: 120}} />
                <Typography variant="h6">No Records Found</Typography>
            </div>
        );
    }

    return (
        <div style={{width: "100%", border: '1px solid', padding: 20, background: '#fff'}} dangerouslySetInnerHTML={{ __html: prescriptionTemplate }}></div>
    )
}

export default Rx;
