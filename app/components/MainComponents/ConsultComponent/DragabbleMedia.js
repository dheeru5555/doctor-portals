import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  demo: {
    height: 'auto',
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  input: {
    margin: theme.spacing(3),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  reactDragabble: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    '& strong': {
      background: '#ddd',
      border: '1px solid #999',
      borderRadius: 3,
      display: 'block',
      marginBottom: 10,
      padding: '3px 5px',
      textAlign: 'center'
    }
  },
  cursor: {
    cursor: 'move'
  },
  noCursor: {
    cursor: 'auto'
  },
  cursorY: {
    cursor: 'ns-resize'
  },
  cursorX: {
    cursor: 'ew-resize'
  },
  box: {
    background: '#fff',
    border: '1px solid #999',
    borderRadius: 3,
    width: 400,
    height: 230,
    margin: 10,
    padding: 10,
    float: 'left',
    cursor: 'move',
    background: '#faebd7',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class DragabbleMedia extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.adjustXPos = this.adjustXPos.bind(this);
    this.adjustYPos = this.adjustYPos.bind(this);
    this.onControlledDrag = this.onControlledDrag.bind(this);
    this.onControlledDragStop = this.onControlledDragStop.bind(this);
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }

  onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }

  // For controlled component
  adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  }

  adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  onControlledDrag(e, position) {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

  render() {
    const { classes } = this.props;
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
    return (
      <div className={classes.reactDragabble}>
        <Draggable {...dragHandlers}>
          <div className={classes.box}>
            Camera View Here
          </div>
        </Draggable>
      </div>
    );
  }
}

DragabbleMedia.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DragabbleMedia);
