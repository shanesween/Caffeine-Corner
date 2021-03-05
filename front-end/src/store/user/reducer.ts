import { GET_USER, REMOVE_USER } from './constants';
import { User, UserActionTypes } from './types';

// INITIAL STATE
const defaultUser = {
    email: '',
    password: ''
};

export const userReducer = (state = defaultUser, action: UserActionTypes): User => {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state;
    }
}
