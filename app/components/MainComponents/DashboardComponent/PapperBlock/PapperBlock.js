import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import styles from './papperStyle-jss';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function PapperBlock(props) {
  const {
    classes,
    title,
    desc,
    children,
    whiteBg,
    noMargin,
    colorMode,
    overflowX,
    icon,
    filterChechked,
    filterSelect
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const color = mode => {
    switch (mode) {
      case 'light':
        return classes.colorLight;
      case 'dark':
        return classes.colorDark;
      default:
        return classes.none;
    }
  };
  return (
    <div>
      <Paper
        className={
          classNames(
            classes.root,
            noMargin && classes.noMargin,
            color(colorMode)
          )
        }
        elevation={0}
      >
        <div className={classes.descBlock}>
          <span className={classes.iconTitle}>
            <Icon>{icon}</Icon>
          </span>
          <div className={classes.titleText}>
            <div className={classes.dFlex} style={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="h2" className={classes.title}>
                {title}
              </Typography>
              {title === "Appointments" ? (
                <Tooltip title="Filter">
                  <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
                    <Icon>filter_list</Icon>
                  </IconButton>
                </Tooltip>
              ) : ('')}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <FormGroup style={{ padding: 15 }}>
                  <b>Filter by</b>{console.log(filterSelect)}
                  <FormControlLabel
                    control={<Checkbox onChange={filterChechked} checked={filterSelect!==undefined && filterSelect.indexOf("queue") !== -1} name="appointment_type" value="queue" size="small" />}
                    label="Queue"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={filterChechked} checked={filterSelect!==undefined && filterSelect.indexOf("checked_out") !== -1} name="appointment_type" value="checked_out" size="small" />}
                    label="Checked Out"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={filterChechked} checked={filterSelect!==undefined && filterSelect.indexOf("waitlist") !== -1} name="appointment_type" value="waitlist" size="small" />}
                    label="Waitlist"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={filterChechked} checked={filterSelect!==undefined && filterSelect.indexOf("paused") !== -1} name="appointment_type" value="paused" size="small" />}
                    label="Paused"
                  />
                </FormGroup>
              </Popover>
            </div>
          </div>
        </div>
        <section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
          {children}
        </section>
      </Paper>
    </div >
  );
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  colorMode: PropTypes.string,
  noMargin: PropTypes.bool,
  overflowX: PropTypes.bool,
};

PapperBlock.defaultProps = {
  whiteBg: false,
  noMargin: false,
  colorMode: 'none',
  overflowX: false,
  icon: 'flag'
};

export default compose(withStyles(styles))(PapperBlock);
