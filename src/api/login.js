import { httpPost } from './http'
export const getLogin = (param) => {
  return httpPost('addUser', param)
}
