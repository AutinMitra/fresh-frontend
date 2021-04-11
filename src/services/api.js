import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

async function getData() {
  let res = await axios.get('/allInfo');
  // what is error handling? hackathon moment

  let avgLat = 0
  let avgLng = 0

  res.data.forEach((obj) => {
    avgLat += obj.lat
    avgLng += obj.lng
  })

  avgLat /= res.data.length
  avgLng /= res.data.length

  return {coords: res.data, centerLat: avgLat, centerLng: avgLng}
}

export {
  getData
}
