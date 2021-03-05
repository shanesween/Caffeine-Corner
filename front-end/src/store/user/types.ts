import { GET_USER, REMOVE_USER } from './constants';

export interface User {
    email: string
    password: string
}

interface GetUserActionType {
    type: typeof GET_USER
    payload: User
}

interface RemoveUserActionType {
    type: typeof REMOVE_USER
}

export type UserActionTypes = GetUserActionType | RemoveUserActionType