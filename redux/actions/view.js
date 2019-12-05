export const SET_VIEW = 'SET_VIEW';

export const LOGIN      = 'login';
export const CODE_ENTRY = 'code_entry';
export const PROFILE    = 'profile';

export function setView(payload) {
    
    return {
        type: SET_VIEW,
        payload: payload
    }
}