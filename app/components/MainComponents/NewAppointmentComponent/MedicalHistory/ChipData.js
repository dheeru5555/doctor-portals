import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
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
  }
}));

export default function ChipData({
  selectedItem, avelavelItem, addFunction, selectFunction, removeFunction, type
}) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <div>
      <ul className={classes.root}>
        {selectedItem.map((data, index) => {
          let icon;
          return (
            <li key={"s"+type+index}>
              <Chip
                icon={icon}
                label={data.name}
                onClick={() => { selectFunction(type, data.name); }}
                onDelete={() => { removeFunction(type, data.name); }}
                className={classes.chip}
              />
            </li>
          );
        })}
      </ul>
      <ul className={classes.root}>
        {avelavelItem.map((data, index) => (
          <li key={type+index}>
            <Chip
              label={data.name}
              variant="outlined"
              onClick={() => { addFunction(type, data.name, data.id); }}
              className={classes.chip}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
