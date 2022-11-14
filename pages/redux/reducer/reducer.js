import { ActionType } from "../action/acion-type"

const initialState = {
    register: [],
    loading: true
}

export const Register = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.REGISTER:
            return { ...state }
        case ActionType.REGISTER_SUCCESS:
            return { register: [...state.register, action.payload.rdata], loading: true }
        case ActionType.REGISTER_FAILURE:
            return { register: [...state.register, action.payload.rdata], loading: false }

        case ActionType.LOGIN:
            return { ...state }
        case ActionType.LOGIN_SUCCESS:
            localStorage.setItem("token", JSON.stringify(action.payload.rdata.token))
            return { logindata: action.payload, loading: true }
        case ActionType.LOGIN_FAILURE:
            return { loading: false }
        default:
            return state
    }
}
