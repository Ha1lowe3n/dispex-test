import { appActions } from "./app.reducer";
import { searchAPI } from "../api/api";
import { appartmensActions } from "./appartments.reducer";

const residents_CONSTANTS = {
    SET_RESIDENTS: "SET_RESIDENTS",
    ADD_NEW_RESIDENTS: "ADD_NEW_RESIDENTS",
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
        case residents_CONSTANTS.ADD_NEW_RESIDENTS: {
            const newState = {
                ...state,
                residents: { ...state.residents },
            };
            const newResident = {
                name: action.payload.newResident.name,
                phone: action.payload.newResident.phone,
                email: action.payload.newResident.email,
            };
            newState.residents.clients = [
                ...newState.residents.clients,
                newResident,
            ];
            return newState;
        }

        default:
            return state;
    }
};

export const residentsActions = {
    setResidents: (residents, flatTitle) => ({
        type: residents_CONSTANTS.SET_RESIDENTS,
        payload: { residents, flatTitle },
    }),
    addNewResident: (newResident) => ({
        type: residents_CONSTANTS.ADD_NEW_RESIDENTS,
        payload: { newResident },
    }),
};

// thunks
export const fetchResidentsTC =
    (houseId, street, house, flatTitle) => async (dispatch, getState) => {
        try {
            dispatch(appActions.setStatus("loading"));

            const flats = getState().appartments.flats;
            console.log(flats);
            dispatch(appartmensActions.setCurrentAddressId(flats, flatTitle));

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
export const createResidentsTC =
    (fullname, phone, email, addressId) => async (dispatch) => {
        try {
            dispatch(appActions.setStatus("loading"));
            const data = await searchAPI.createResident(fullname, phone, email);
            if (data.result === "Ok") {
                const newResident = await searchAPI.getResident(phone);
                await searchAPI.bindResident(addressId, newResident.id);
                dispatch(residentsActions.addNewResident(newResident));
            }

            dispatch(appActions.setStatus("stop"));
        } catch (err) {
            throw new Error(err);
        }
    };
