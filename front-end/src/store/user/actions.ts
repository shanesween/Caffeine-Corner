import axios from "axios";
import { Dispatch } from 'react';
import history from '../../history';
import { GET_USER, REMOVE_USER } from './constants'
import { User, UserActionTypes } from './types'

// ACTION CREATORS
const getUser = (user: User): UserActionTypes => (
    { type: GET_USER, payload: user }
)

const removeUser = (): UserActionTypes => ({ type: REMOVE_USER });

// THUNK CREATORS
export const me = () => async (dispatch: Dispatch<UserActionTypes>) => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/auth/me");
        dispatch(getUser(data))
    } catch (err) {
        console.error(err)
    }
};

export const auth = (email: string, password: string, method: string) => async (
    dispatch: Dispatch<UserActionTypes>) => {
    let res
    try {
        res = await axios.post(`http://localhost:8080/api/auth/${method}`, { email, password });
        res && dispatch(getUser(res.data));
        localStorage.setItem('user', res.data)
    } catch (err) {
        console.error(err)
    }
};

export const logout = () => async (dispatch: Dispatch<UserActionTypes>) => {
    try {
        await axios.post("http://localhost:8080/api/auth/logout");
        dispatch(removeUser());
        localStorage.removeItem("user")
    } catch (err) {
        console.error(err);
    }
};

