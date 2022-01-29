import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { Link } from 'react-router-dom';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';

import PatientDetails from './Forms/PatientDetails';
import Dependents from './Dependents/Dependents';
import AddDependents from './Dependents/AddDependents';
import SucessComponet from './SucessComponet';
const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  secondaryWrap: {
    padding: `1px ${theme.spacing(2)}px`,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    '& > $centerItem': {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& li': {
      marginBottom: 30
    },
    '& $chip': {
      top: 50,
      position: 'absolute',
      fontSize: 11,
      fontWeight: 400,
    }
  },
  storageInfo: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    '& li': {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`
    }
  },
  progressCircle: {
    borderRadius: '50%',
    background: lighten(theme.palette.divider, 0.7)
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    display: 'block'
  },
  stepperBtn: {
    display: 'flex',
    marginTop: 20,
    justifyContent: 'center'
  },
  finishMessage: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
    '& h4': {
      '& span': {
        textAlign: 'center',
        display: 'block',
        '& svg': {
          color: 'green',
          height: 'auto',
          width: 148
        }
      }
    }
  }
});

function getSteps() {
  return ['Patient Details', 'Dependents', 'Success'];
}


class NewPatientComponent extends React.Component {
    static propTypes = {
      classes: PropTypes.object.isRequired,
    };

    state = {
      activeStep: 0,
      altLabel: false,
      skipped: new Set(),
      isLoggedIn: true
    };

    /* handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        } else {
            this.setState({
                activeStep: activeStep + 1,
                skipped,
            });
            if (activeStep === 1) {
                this.setState({
                    activeStep: activeStep + 2,
                    skipped,
                });
            }
        }
    }; */

    handleNext = (stape) => {
      this.setState({
        activeStep: stape,
      });
    }


    getStepContent(step) {
      switch (step) {
        case 0:
          return <PatientDetails />;
        case 1:
          return <Dependents />;
        default:
          return 'Unknown step';
      }
    }

    handleDependent = () => {
      const { activeStep } = this.state;
      let { skipped } = this.state;
      if (this.isStepSkipped(activeStep)) {
        skipped = new Set(skipped.values());
        skipped.delete(activeStep);
      } else {
        this.setState({
          activeStep: activeStep + 1,
          skipped,
        });
      }
    };

    handleBack = () => {
      const { activeStep } = this.state;
      this.setState({
        activeStep: activeStep - 1,
      });
    };

    handleSkip = () => {
      const { activeStep, skipped } = this.state;
      if (!this.isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
      }
      const skippedConst = new Set(skipped.values());
      skipped.add(activeStep);
      this.setState({
        activeStep: activeStep + 1,
        skipped: skippedConst,
      });
    };

    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    handleChange = name => event => {
      this.setState({ [name]: event.target.checked });
    };

    handleChange1 = () => {
      this.setState({ isLoggedIn: false });
    };

    isStepOptional = step => (step === 1);

    isStepSkipped(step) {
      const { skipped } = this.state;
      return skipped.has(step);
    }

    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep, altLabel } = this.state;
      const { isLoggedIn } = this.state;

      return (
        <div className={classes.root} style={{ background: 'white', padding: 36, borderRadius: 10 }}>

          <div>
            <Stepper activeStep={activeStep} alternativeLabel={altLabel}>
              {steps.map((label, index) => {
                const props = {};
                const labelProps = {};
                if (this.isStepOptional(index)) {
                  labelProps.optional = <Typography className={altLabel ? Type.textCenter : ''} variant="caption">Optional</Typography>;
                }
                if (this.isStepSkipped(index)) {
                  props.completed = false;
                }
                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {/* {activeStep === 3 ? (

                        ) : (
                            <div>
                                <Typography className={classes.instructions}>

                                </Typography>

                                <div className={classes.stepperBtn}>

                                    <Button disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}>Back</Button>

                                    {activeStep === steps.length - 2 ? (
                                        <AddDependents />
                                    ) : ''}
                                    {this.isStepOptional(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSkip}
                                            className={classes.button}
                                        >
                                            Skip
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Save & Continue'}
                                    </Button>
                                </div>
                            </div>
                        )} */}
              {(() => {
                switch (activeStep) {
                  case 0:
                    return <PatientDetails handleNext={this.handleNext} classes={classes} />;
                  case 1:
                    return <Dependents classes={classes} handleNext={this.handleNext} />;
                  case 2:
                    return <SucessComponet classes={classes} handleNext={this.handleNext} />;
                  default:
                    return 'Unknown step';
                }
              })()}
            </div>
          </div>
        </div>
      );
    }
}

export default withStyles(styles)(NewPatientComponent);
