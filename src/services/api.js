import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

async function getData() {
  let res = await axios.get('/allInfo')
  // what is error handling? hackathon moment

  let avgLat = 0
  let avgLng = 0

  res.data.forEach((obj) => {
    avgLat += obj.lat
    avgLng += obj.lng
  })

  avgLat /= res.data.length
  avgLng /= res.data.length

  avgLat = isNaN(avgLat) ? 0 : avgLat
  avgLng = isNaN(avgLng) ? 0 : avgLng

  return { coords: res.data, centerLat: avgLat, centerLng: avgLng }
}

async function getClustering(algo, args) {
  const params = {algo: algo.toLowerCase()}
  console.log(algo)
  if (algo === "KMEANS") {
    params.numClusters = args[0]
  } else {
    params.radius = args[0]
    params.neighborhoodSize = args[1]
  }

  let res = await axios.get('/cluster', {params})
  
  let finalRes = []

  res.data.forEach((cluster, i) => {
    cluster.forEach((obj) => {
      let obj2 = obj
      obj2.clusterID = i
      finalRes.push(obj2)
    })
  })
  return finalRes
}

export { getData, getClustering }
