import { BASE_URL } from '../constants'

export const LOGIN = `${BASE_URL}/login`
export const REGISTER = `${BASE_URL}/register`
export const GET_USER = (id: string) => `${BASE_URL}/users/${id}`
