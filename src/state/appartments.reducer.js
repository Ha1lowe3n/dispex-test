import { searchAPI } from "../api/api";
import { appActions } from "./app.reducer";

const appartmens_CONSTANTS = {
    SET_STREETS: "SET_STREETS",
    SET_HOUSES: "SET_HOUSES",
    SET_FLATS: "SET_FLATS",
    GET_CURRENT_STREET_ID: "GET_CURRENT_STREET_ID",
    GET_CURRENT_HOUSE_ID: "GET_CURRENT_HOUSE_ID",
};

const initialState = {
    streets: {},
    houses: {},
    flats: {},
    errorAdress: false,
    currentStreetId: null,
    currentHouseId: null,
};

export const appartmensReducer = (state = initialState, action) => {
    switch (action.type) {
        case appartmens_CONSTANTS.SET_STREETS: {
            const newState = { ...state, streets: { ...state.streets } };
            action.payload.streets.forEach((street) => {
                newState.streets[street.id] = street.name;
            });
            return newState;
        }
        case appartmens_CONSTANTS.SET_HOUSES: {
            const newState = { ...state, houses: { ...state.houses } };
            action.payload.houses.forEach((house) => {
                newState.houses[house.id] = house.name;
            });
            return newState;
        }
        case appartmens_CONSTANTS.SET_FLATS: {
            const newState = { ...state, flats: { ...state.flats } };
            action.payload.flats
                .filter((flat) => flat.typeName === "Квартира")
                .forEach((flat) => {
                    newState.flats[flat.id] = flat.name;
                });
            return newState;
        }
        case appartmens_CONSTANTS.GET_CURRENT_STREET_ID:
            return {
                ...state,
                currentStreetId: action.payload.currentStreetId,
            };
        case appartmens_CONSTANTS.GET_CURRENT_HOUSE_ID:
            return {
                ...state,
                currentHouseId: action.payload.currentHouseId,
            };

        default:
            return state;
    }
};

export const appartmensActions = {
    setStreets: (streets) => ({
        type: appartmens_CONSTANTS.SET_STREETS,
        payload: { streets },
    }),
    setHouses: (houses) => ({
        type: appartmens_CONSTANTS.SET_HOUSES,
        payload: { houses },
    }),
    setFlats: (flats) => ({
        type: appartmens_CONSTANTS.SET_FLATS,
        payload: { flats },
    }),
    getCurrentStreetId: (currentStreetId) => ({
        type: appartmens_CONSTANTS.GET_CURRENT_STREET_ID,
        payload: { currentStreetId },
    }),
    getCurrentHouseId: (currentHouseId) => ({
        type: appartmens_CONSTANTS.GET_CURRENT_HOUSE_ID,
        payload: { currentHouseId },
    }),
};

// thunks
export const fetchStreetsTC = () => async (dispatch) => {
    try {
        dispatch(appActions.setStatus("loading"));
        const data = await searchAPI.getStreets();
        dispatch(appartmensActions.setStreets(data));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
export const fetchHousesTC = () => async (dispatch, getState) => {
    try {
        dispatch(appActions.setStatus("loading"));
        const currentStreetId = getState().appartments.currentStreetId;
        const houses = await searchAPI.getHouses(currentStreetId);
        dispatch(appartmensActions.setHouses(houses));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
export const fetchFlatsTC = () => async (dispatch, getState) => {
    try {
        dispatch(appActions.setStatus("loading"));
        const currentHouseId = getState().appartments.currentHouseId;
        const flats = await searchAPI.getFlats(currentHouseId);
        dispatch(appartmensActions.setFlats(flats));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
