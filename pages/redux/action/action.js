// export const registerdata = (type, payload) => (dispatch) =>

// 	dispatch({
// 		type,
// 		payload
// 	})
import { Service } from "../../service/services";
import { ActionType } from "./acion-type";
export const registerdata = (payload) => async (dispatch) => {
	dispatch({
		type: ActionType.REGISTER
	})
	Service.registerCreate(payload).then((resp) => {
		dispatch({
			type: ActionType.REGISTER_SUCCESS,
			payload: resp
		})
	}).catch(error => {
		dispatch({
			type: ActionType.REGISTER_FAILURE,
			payload: { error }
		});
		throw error
	});
}
export const loginAuthentication = (loginData) => async (dispatch) => {
	dispatch({
		type: ActionType.LOGIN
	})
	Service.loginAuth(loginData).then((resp) => {
		dispatch({
			type: ActionType.LOGIN_SUCCESS,
			payload: resp
		})
	}).catch(error => {
		dispatch({
			type: ActionType.LOGIN_FAILURE,
			payload: { error }
		});
		throw error
	});

}