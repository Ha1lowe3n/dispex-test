import { searchAPI } from "../api/api";

const appartmens_CONSTANTS = {
    SET_STREETS: "SET_STREETS",
};

const initialState = {
    streets: {},
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

        default:
            return state;
    }
};

const appartmensActions = {
    setStreets: (streets) => ({
        type: appartmens_CONSTANTS.SET_STREETS,
        payload: {
            streets,
        },
    }),
};

// thunks
export const fetchStreetsTC = () => async (dispatch) => {
    try {
        const data = await searchAPI.getStreets();
        console.log(data);
        dispatch(appartmensActions.setStreets(data));
    } catch (err) {
        throw new Error(err);
    }
};
