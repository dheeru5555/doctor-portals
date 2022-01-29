import * as types from '../constants/FrontDeskConstants';


export const getFrontedsk = () => ({
    type: types.FRONT_DESK_FEATCH_LIST,
    payload: null
});

export const setFrontedsk =(fornbtends)=>({
    type: types.FRONT_DESK_SET_LIST,
    payload: fornbtends
});

export const getSearchFrontedsk = (search) => ({
    type: types.FRONT_DESK_FEATCH_SEARCH_LIST,
    payload:{search}
});

export const setSearchFrontedsk =(fornbtends)=>({
    type: types.FRONT_DESK_SET_SEARCH_LIST,
    payload: fornbtends
});

export const createFrontedsk =(fornbtends)=>({
    type: types.CREATE_FRONT_DESK,
    payload: fornbtends
});

export const createFrontedskPermition =(permition)=>({
    type: types.CREATE_FRONT_DESK_PERMITION,
    payload: permition
});


export const getFrontedskDetails =(details)=>({
    type: types.CREATE_FRONT_DESK_PERMITION,
    payload: details
});

export const getFrontedskPermition =(permition)=>({
    type: types.CREATE_FRONT_DESK_PERMITION,
    payload: permition
});

export const updateFrontedsk =(details)=>({
    type: types.UPDATE_FRONT_DESK,
    payload: details
});

export const updateFrontedskPermition =(permition)=>({
    type: types.UPDATE_FRONT_DESK_PERMITION,
    payload: permition
});