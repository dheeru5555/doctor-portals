import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useReactToPrint } from 'react-to-print';
import Pdf from "react-to-pdf";


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
    },
    RxHeader: {
        borderBottom: '1px solid #dedede',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto',
        padding: 11,
        background: 'white',
        '& p': {
            margin: 0
        }
    },
    navigation: {
        margin: 'auto 0',
        display: 'flex',
        '& span': {
            width: '2rem',
            height: '2rem',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '1px solid #dedede',
            borderRadius: 5,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#eeeeee'
        }
    },
    actions: {
        height: '100%',
        background: '#eeeeee',
        border: '1px solid #dedede',
        '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: 0
        },
        '&:hover': {
            boxShadow: 'none'
        }
    },
    RxDatepicker: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: theme.spacing(1),
        '& .MuiFormControl-marginNormal': {
            margin: 0
        },
        '& .MuiInput-root': {
            border: 0
        },
        '& input': {
            fontSize: 16,
            width: 100
        },
        '& .MuiInput-underline:after': {
            boxShadow: 'none',
            border: 'none'
        }
    },
    rightHeader: {
        display: 'flex',
        '& button': {
            marginRight: theme.spacing(1)
        },
        '& .MuiIcon-root': {
            fontSize: '1rem'
        }
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

    let findTemplates = props.prescriptionTemplates.filter((item) => item.appointment_rx !== null)
    const [index, setIndex] = React.useState(1)

    const next = () => {
        if (index <= findTemplates.length) {
            setIndex(index + 1)
        }
    }

    const prev = () => {
        if (index > 0 && index <= findTemplates.length) {
            setIndex(index - 1)
        }
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <>
            <div className={classes.RxHeader}>
                <h6 style={{ marginBottom: 0 }}></h6>
                <div className={classes.rightHeader}>
                    <Pdf targetRef={componentRef} filename="invoice.pdf">
                        {({ toPdf }) => <Tooltip title="Download" arrow>
                                <Button variant="outlined" onClick={toPdf} disabled={findTemplates.length == 0}><Icon>file_download</Icon></Button>
                            </Tooltip>}
                    </Pdf>
                    <Tooltip title="Print" arrow>
                        <Button variant="outlined" onClick={handlePrint} disabled={findTemplates.length == 0}><Icon>print</Icon></Button>
                    </Tooltip>

                    <div>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={prev}
                            disabled={index == 1}
                            startIcon={<Icon>chevron_left</Icon>}
                            className={classes.actions}
                        >
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.button}
                            onClick={next}
                            disabled={(index == findTemplates.length) || findTemplates.length == 0}
                            startIcon={<Icon>chevron_right</Icon>}
                            className={classes.actions}
                        >
                        </Button>
                    </div>
                </div>
            </div>
            {findTemplates.length == 0 ? (
                <div style={{ display: 'flex', color: '#e0e0e0', alignItems: "center", justifyContent: "center", flexDirection: 'column', height: 600 }}>
                    <ErrorOutline style={{ fontSize: 120 }} />
                    <Typography variant="h6">No Records Found</Typography>
                </div>
            ) : (
                <div ref={componentRef}>
                    <div style={{ width: "100%", border: '1px solid', padding: 20, background: '#fff' }} dangerouslySetInnerHTML={{ __html: findTemplates[index - 1].appointment_rx }}></div>
                </div>
            )}
        </>
    );

    // return (
    //     <div style={{width: "100%", border: '1px solid', padding: 20, background: '#fff'}} dangerouslySetInnerHTML={{ __html: props.prescriptionTemplate }}></div>
    // )
}

export default Rx;
