import { appActions } from "./app.reducer";
import { searchAPI } from "../api/api";
import { appartmensActions } from "./appartments.reducer";

const residents_CONSTANTS = {
    SET_RESIDENTS: "SET_RESIDENTS",
};

const initialState = {
    residents: {},
};

export const residentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case residents_CONSTANTS.SET_RESIDENTS:
            return {
                ...state,
                residents: {
                    ...action.payload.residents.filter(
                        (resident) => resident.flat === action.payload.flatTitle
                    )[0],
                },
            };
        default:
            return state;
    }
};

export const residentsActions = {
    setResidents: (residents, flatTitle) => ({
        type: residents_CONSTANTS.SET_RESIDENTS,
        payload: { residents, flatTitle },
    }),
};

// thunks
export const fetchResidentsTC =
    (houseId, street, house, flatTitle) => async (dispatch) => {
        try {
            dispatch(appActions.setStatus("loading"));
            const data = await searchAPI.getResidentsInHouse(houseId);
            dispatch(residentsActions.setResidents(data, flatTitle));
            dispatch(
                appartmensActions.setFullAddressTitle(street, house, flatTitle)
            );
            dispatch(appActions.setStatus("stop"));
        } catch (err) {
            throw new Error(err);
        }
    };
