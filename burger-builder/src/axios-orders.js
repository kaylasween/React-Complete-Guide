import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-builder-7915e.firebaseio.com/'
})

export default instance
