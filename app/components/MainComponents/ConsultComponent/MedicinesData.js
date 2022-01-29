import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import TagFacesIcon from '@material-ui/icons/TagFaces';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Info from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  danger: {
    background: '#eb233047',
    color: 'black',
    margin: theme.spacing(0.5),
  },
  infoIcon: {
    fontSize: 85,
    color: '#ffa50061',
    margin: 'auto'
  }
}));

export default function MedicinesData() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Dolo(650Mg)' },
    { key: 1, label: 'Allegra' },
    { key: 2, label: 'Pantop(40Mg)' }
  ]);

  const [chipData2] = React.useState([
    { key: 0, label: 'Dolo(650Mg)' },
    { key: 1, label: 'Mountair Fx' },
    { key: 2, label: 'Allegra' },
    { key: 3, label: 'Pantop(40Mg)' },
    { key: 4, label: 'Pantakindc(40Mg)' },
    { key: 5, label: 'Veloz D' },
    { key: 6, label: 'Rablet D(20 & 30)' },
    { key: 7, label: 'Polymer' }
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ul className={classes.root}>
        {chipData.map((data) => {
          let icon;

          if (data.label === 'React') {
            // icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </ul>
      <ul className={classes.root}>
        {chipData2.map((data) => {
          // let icon;

          if (data.label === 'React') {
            // icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                label={data.label}
                variant="outlined"
                className={classes.chip}
                onClick={handleClickOpen}
              />
            </li>
          );
        })}
        <li><Chip label="Basic" variant="outlined" className={classes.chip} /></li>
      </ul>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className={classes.column}>
            <Info className={classes.infoIcon} />
            <Typography variant="button" align="center">
              Drug Interference
            </Typography>
          </div>
          <div className={classes.center}>
            <Chip
              label="Dolo(650Mg)"
              variant="outlined"
              className={classes.danger}
            />
            <Chip
            label="Dolo(650Mg)"
            variant="outlined"
            className={classes.danger}
          />
          </div>
          <Typography>
            These drugs are not suggested to be taken at same time.
            Do you want to proceed?
          </Typography>
          <DialogContentText id="alert-dialog-description">
            <Typography className={classes.italic}>
              Note* : Instructions to be given here
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.center} style={{paddingBottom: 20}}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Ignore, Proceed with interference
          </Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Drop the Medicine
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
