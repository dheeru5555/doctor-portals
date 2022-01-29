import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChipData from './ChipData';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(1)
  },
  Panel: {
    border: '1px solid #dedede'
  },
  customButton: {
    justifyContent: 'space-between',
    padding: '15px 0px 0px',
    fontWeight: '700',
    '&:hover': {
      background: 'inherit',
    }
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 10,
  },
  bold: {
    fontWeight: 700
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  }
});

let id = 0;
function createData(title, question) {
  id += 1;
  return {
    id,
    title,
    question
  };
}

const data = [
  createData('Medical Problems', 'Do you have any Medical Problems'),
  createData('Allergies', 'Do you have any allergies ?'),
  createData('Family History', 'What are the illnesses that run in your family ?'),
  createData('Life Style', 'Lifestyle Details'),
  createData('Procedure', 'Have you undergone any procedure ?'),
  createData('Risk Factor', 'Any high Risk factor ?'),
];

function SimpleAccordion(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center">
        <Grid item sm={7}>
          {data.map(n => (
            <ExpansionPanel key={n.title}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{n.title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.column}>
                <Grid container>
                  <Grid item sm={9}>
                    <Typography variant="subtitle1" className={classes.bold} gutterBottom>{n.question}</Typography>
                  </Grid>
                  <Grid item sm={3}>
                    <div className={classes.flexEnd}>
                      {/* <Search /> */}
                      <FormControl className={classes.textField}>
                            <Input
                                id="search_filter"
                                type="search"
                                placeholder="Search"
                            />
                        </FormControl>
                      <Button variant="contained">Add</Button>
                    </div>
                  </Grid>
                </Grid>
                <ChipData />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Grid>
        <Grid item sm={3}>
          <div className={classes.Panel}>
            <div className={classes.bgWhite}>
              <Typography variant="button" className={classes.title}>Selected Title</Typography>
              <Divider style={{ margin: '15px 0 0' }} />
              <div className={classes.rightPanel}>
                <Typography className={classes.customButton}>Notes</Typography>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  placeholder="Max 255 characters"
                  inputProps={{ maxLength: 250 }}
                  rows="4"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
                <Divider className={classes.divider} />
                <Typography className={classes.customButton}>Since</Typography>
                <TextField
                  id="outlined-multiline-static"
                  label=""
                  multiline
                  inputProps={{ maxLength: 250 }}
                  rows="4"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

SimpleAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAccordion);
