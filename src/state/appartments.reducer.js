import { searchAPI } from "../api/api";
import { appActions } from "./app.reducer";

const appartmens_CONSTANTS = {
    SET_STREETS: "SET_STREETS",
    SET_HOUSES: "SET_HOUSES",
    SET_FLATS: "SET_FLATS",
    GET_CURRENT_STREET_ID: "GET_CURRENT_STREET_ID",
    GET_CURRENT_HOUSE_ID: "GET_CURRENT_HOUSE_ID",
    ERROR_ADDRESS: "ERROR_ADDRESS",
    SET_FULL_ADDRESS_TITLE: "SET_FULL_ADDRESS_TITLE",
    SET_CURRENT_ADDRESS_ID: "SET_CURRENT_ADDRESS_ID",
};

const initialState = {
    streets: {},
    houses: {},
    flats: {},
    errorAddress: false,
    currentStreetId: null,
    currentHouseId: null,
    fullAddressTitle: "",
    currentAddressId: null,
};

export const appartmensReducer = (state = initialState, action) => {
    switch (action.type) {
        case appartmens_CONSTANTS.SET_STREETS: {
            const newState = { ...state, streets: { ...state.streets } };
            action.payload.streets.forEach((street) => {
                newState.streets[
                    street.id
                ] = `${street.prefix.shortName}. ${street.name}`;
            });
            return newState;
        }
        case appartmens_CONSTANTS.SET_HOUSES: {
            const newState = { ...state, houses: { ...state.houses } };
            newState.houses = {};
            action.payload.houses.forEach((house) => {
                newState.houses[house.id] = house.name;
            });
            return newState;
        }
        case appartmens_CONSTANTS.SET_FLATS: {
            const newState = { ...state, flats: { ...state.flats } };
            newState.flats = {};
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
        case appartmens_CONSTANTS.ERROR_ADDRESS:
            return {
                ...state,
                errorAddress: action.payload.errorAddress,
            };
        case appartmens_CONSTANTS.SET_FULL_ADDRESS_TITLE: {
            const { streetTitle, houseTitle, flatTitle } = action.payload;
            return {
                ...state,
                fullAddressTitle: `${streetTitle}, ${houseTitle}, ${flatTitle}`,
            };
        }
        case appartmens_CONSTANTS.SET_CURRENT_ADDRESS_ID: {
            const { flats, flatTitle } = action.payload;
            return {
                ...state,
                currentAddressId: Object.keys(flats).find(
                    (key) => flats[key] === flatTitle
                ),
            };
        }

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
    errorAddress: (errorAddress) => ({
        type: appartmens_CONSTANTS.ERROR_ADDRESS,
        payload: { errorAddress },
    }),
    setFullAddressTitle: (streetTitle, houseTitle, flatTitle) => ({
        type: appartmens_CONSTANTS.SET_FULL_ADDRESS_TITLE,
        payload: { streetTitle, houseTitle, flatTitle },
    }),
    setCurrentAddressId: (flats, flatTitle) => ({
        type: appartmens_CONSTANTS.SET_CURRENT_ADDRESS_ID,
        payload: { flats, flatTitle },
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
export const fetchHousesTC = (idOfStreet) => async (dispatch) => {
    try {
        dispatch(appActions.setStatus("loading"));
        const houses = await searchAPI.getHouses(idOfStreet);
        dispatch(appartmensActions.setHouses(houses));
        dispatch(appartmensActions.getCurrentStreetId(idOfStreet));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
export const fetchFlatsTC = (idOfHouse) => async (dispatch) => {
    try {
        dispatch(appActions.setStatus("loading"));
        const flats = await searchAPI.getFlats(idOfHouse);

        dispatch(appartmensActions.setFlats(flats));
        dispatch(appartmensActions.getCurrentHouseId(+idOfHouse));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
