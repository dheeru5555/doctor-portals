import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './user-jss';
import BasicDetails from './BasicDetails';
import UploadDocuments from './UploadDocuments';
import Success from './Success';
import formValidation from './helpers/formValidation';

// Step titles
const labels = ['Basic Details', 'Upload Documents', 'Verification'];


const RegisterProcessForm = (props) => {
  const { classes, currentRegistrationStep, masterData } = props;
  const [activeStep, setActiveStep] = useState(currentRegistrationStep);

  // Proceed to next step
  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set values
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));

    // set errors
    const error = formValidation(name, value, fieldsValidation) || '';

    setFormErrors({
      [name]: error
    });
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <BasicDetails
            handleNext = {handleNext}
            handleBack = {handleBack}
          />
        );
      case 1:
        return (
          <UploadDocuments
            handleNext={handleNext}
            handleBack={handleBack}
            classes={classes}
            masterData={masterData}
          />
        );
      case 2:
        return (
          <Success />
        );
      default:
        break;
    }
    return step;
  };


  return (
    <>
      <Paper className={classes.sideWrap} style={{ padding: '50px' }}>
        {activeStep === labels.length ? (
          // Last Component
          <Success />
        ) : (
          <>
            <Stepper
              activeStep={activeStep}
              style={{ padding: '0 15px' }}
              alternativeLabel
            >
              {labels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </>
        )}
      </Paper>
    </>
  );
};
RegisterProcessForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(RegisterProcessForm);
