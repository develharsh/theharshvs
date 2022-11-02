import { ACTIONS } from "./actions";

const reducers = (state, action) => {
    switch (action.type) {
        case ACTIONS.SIDEBAR:
            return {
                ...state,
                sidebar: action.payload,
            };
        case ACTIONS.THEME:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};

export default reducers;