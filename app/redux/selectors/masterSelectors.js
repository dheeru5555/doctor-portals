import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

/* const selectState = useSelector((state) => state.toJS());
const { dashboardReducer } = selectState;
const { masterData,cityData } = dashboardReducer; */
// const stateList=[];

export const stateListSelect = createSelector(
  state => state.dashboardReducer,
  dashboardReducer => dashboardReducer.toJS()
);


export const getAuth = createSelector(
  state => state,
  auth => auth.toJS()
);
