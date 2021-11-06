const app_CONSTANTS = {
    SET_STATUS: "SET_STATUS",
};

const initialState = {
    status: "",
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case app_CONSTANTS.SET_STATUS: {
            return {
                ...state,
                status: action.payload.status,
            };
        }

        default:
            return state;
    }
};

export const appActions = {
    setStatus: (status) => ({
        type: app_CONSTANTS.SET_STATUS,
        payload: {
            status,
        },
    }),
};
