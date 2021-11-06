import { searchAPI } from "../api/api";
import { appActions } from "./app.reducer";

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
        dispatch(appActions.setStatus("loading"));
        const data = await searchAPI.getStreets();
        dispatch(appartmensActions.setStreets(data));
        dispatch(appActions.setStatus("stop"));
    } catch (err) {
        throw new Error(err);
    }
};
