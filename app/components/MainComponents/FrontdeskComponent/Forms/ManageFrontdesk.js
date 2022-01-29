import React, { Fragment, PureComponent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(2)}px 0`,
  },
  field: {
    margin: `${theme.spacing(3)}px 5px`,
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  PermissionsList: {
    border: '1px solid #dedede',
    margin: 15,
    paddingTop: 0,
    background: '#f5f5f5',
    '& b': {
      marginRight: 30
    }
  }
});

class Managefrontdesk extends PureComponent {

  render() {
    const { classes} = this.props;

    return (
      <Fragment>
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="row"
          spacing={3}
        >
          <Grid
            item
            md={12}
            className={classes.PermissionsList}
          >
            <Typography variant="button" className={classes.divider}>Manage Frontdesk Permissions</Typography>
            
            {this.renderModulePermissions()}
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  renderModulePermissions = () => {
      const {frontDeskPermissions, masterData, handlePermissionsCheckboxChange } = this.props;
      const {receptionistPermissions} = masterData;

      const receptionistPermissionValue = Object.values(receptionistPermissions);

      return receptionistPermissionValue.map((modulePermission, index) => {
        
          const moduleKey = modulePermission[0].module_name;
          const moduleValue = Object.values(modulePermission);
          return (
              <Accordion key={`modulePermission-${index}`}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                  >
                      <Typography>
                          {moduleKey}
                      </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <>
                      {
                          moduleValue.map((permission) => {
                              return (
                                  <FormControlLabel
                                      control={(
                                          <Checkbox
                                              size="small"
                                              id={permission.code}
                                              checked = {
                                                (frontDeskPermissions.includes(permission.code)) ? true : false
                                              }
                                              onChange={(e) => handlePermissionsCheckboxChange(e.target.checked, permission.code)}
                                          />
                                      )}
                                      label={permission.name}
                                  />
                              )
                          }) 
                      } 
                      </>
                  </AccordionDetails>
              </Accordion>
          )

      })
  }

}

Managefrontdesk.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
      masterData: state.get("dashboardReducer").masterData,
  }
}


export default connect(mapStateToProps, {})(withStyles(styles)(Managefrontdesk));
