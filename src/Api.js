import axios from 'axios'
import {BASE_URL, STORAGE_KEY} from './consts'

export const api = () => {
  const userInfo = JSON.parse(localStorage.getItem(STORAGE_KEY))
  const apiToken = userInfo && userInfo.token
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiToken
    }
  })

}
