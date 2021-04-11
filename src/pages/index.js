/** @jsx jsx */

import { Fragment, useCallback, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Flex, Box, Heading, Label, jsx, Radio, Input, Checkbox, Button } from 'theme-ui'
import { getData } from '../services/api'

const Marker = ({ lat, long, id }) => {
  return (
    <Box
      lat={lat}
      lng={long}
      id={id}
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        background: '#F00',
        left: '50%',
        transform: 'translate(-50%, 0)',
        position: 'absolute',
        cursor: 'pointer',
        '&:hover': {
          background: '#0F0',
        },
      }}
    ></Box>
  )
}

const AlgoBox = ({onAlgoChange = () => {}, ...props}) => {
  const [algo, setCurrentAlgo] = useState("DBSCAN")

  const setAlgo = useCallback((e, i) => {
    if (e.target.value === 'on') {
      let nAlgo = i === 0 ? "DBSCAN" : i === 1 ? "OPTICS" : "KMEANS";
      setCurrentAlgo(nAlgo)
      onAlgoChange(nAlgo)
    }
  }, [setCurrentAlgo, onAlgoChange])

  return (
    <Box
      sx={{
        bg: 'text',
        color: 'background',
        pb: 4,
        borderRadius: 'default'
      }}
      {...props}
    >
      <Box sx={{fontWeight: 'bold'}}>
        <Box sx={{
          px: 4,
          py: 3,
          borderTopLeftRadius: 'default',
          borderTopRightRadius: 'default',
          bg: 'primary',
          color: 'background'
        }}>
          <Heading as='h3'>
            Algorithm
          </Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px'
          }}
        >
          <Label sx={{py: 1}}>
            <Radio name='algo' checked={algo === "DBSCAN"} onChange={(e) => {setAlgo(e, 0)}}/>
            DBSCAN Clustering
          </Label>
          <Label sx={{py: 1}}>
            <Radio name='algo' checked={algo === "OPTICS"} onChange={(e) => {setAlgo(e, 1)}}/>
            OPTICS Clustering
          </Label>
          <Label sx={{py: 1}}>
            <Radio name='algo' checked={algo === "KMEANS"} onChange={(e) => {setAlgo(e, 2)}}/>
            KMEANS Clustering
          </Label>
        </Box>
      </Box>
    </Box>
  )
}

const ArgumentBox = ({onArgumentChange = () => {}, algo="DBSCAN", ...props}) => {
  const [args, setArgs] = useState(algo === "KMEANS" ? [3] : [6, 2])

  const setCurrentArgs = useCallback((e, i) => {
    let nArgs = [...args]
    nArgs[i] = e.target.value
    setArgs(nArgs)
    onArgumentChange(nArgs)
  }, [args, setArgs, onArgumentChange])

  return (
    <Box
      sx={{
        bg: 'text',
        color: 'background',
        pb: 4,
        borderRadius: 'default'
      }}
      {...props}
    >
      <Box sx={{fontWeight: 'bold'}}>
        <Box sx={{
          px: 4,
          py: 3,
          borderTopLeftRadius: 'default',
          borderTopRightRadius: 'default',
          bg: 'primary',
          color: 'background'
        }}>
          <Heading as='h3'>
            Arguments
          </Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px'
          }}
        >
          {(algo === "DBSCAN" || algo === "OPTICS") && 
            <Fragment>
              <Label sx={{pb: 1, pt: 1}}>
                Neighborhood Radius
              </Label>
              <Input name='radius' type='number' defaultValue="6" onChange={(e) => { setCurrentArgs(e, 0) }}/>
              <Label sx={{pb: 1, pt: 2}}>
                Number of Neighbors
              </Label>
              <Input name='neighbors' type='number' defaultValue="2" onChange={(e) => { setCurrentArgs(e, 1) }}/>
            </Fragment>
          }
          {algo === "KMEANS" && 
            <Fragment>
              <Label sx={{pb: 1, pt: 2}}>
                Number of Clusters
              </Label>
              <Input name='clusters' type='number' defaultValue="2" onChange={(e) => { setCurrentArgs(e, 0) }}/>
            </Fragment>
          }
        </Box>
      </Box>
    </Box>
  )
}

const filterList = ["Plastic Bag", "Bottlecap", "Bottle", "Cup", "Plate"]

const TrashFilter = ({trashFilter, onTrashFilterCallback = () => {}, ...props}) => {
  const [checkBoxStates, setCheckBoxStates] = useState(trashFilter)

  const toggleCheckBox = useCallback((e, i) => {
    let nCheckBoxStates = [...checkBoxStates]
    nCheckBoxStates[i] = e.target.value
        
    onTrashFilterCallback(nCheckBoxStates)
    setCheckBoxStates(nCheckBoxStates)
  }, [checkBoxStates, setCheckBoxStates, onTrashFilterCallback])

  return (
    <Box
      sx={{
        bg: 'text',
        color: 'background',
        pb: 4,
        borderRadius: 'default',
      }}
      {...props}
    >
      <Box sx={{fontWeight: 'bold'}}>
        <Box sx={{
          px: 4,
          py: 3,
          borderTopLeftRadius: 'default',
          borderTopRightRadius: 'default',
          bg: 'primary',
          color: 'background'
        }}>
          <Heading as='h3'>
            Trash Type
          </Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px'
          }}
        >
          {filterList.map((text, i) => (
            <Label sx={{my: 1}}>
              <Checkbox key={i} defaultChecked={true} onChange={(e) => {toggleCheckBox(e, i)}} />
              {text}
            </Label>
          ))}
        </Box>
      </Box>
    </Box>
  )
}


const SideBar = () => {
  const [algo, setAlgo] = useState("DBSCAN")
  const [args, setArgs] = useState([6, 2])
  const [trashFilter, setTrashFilter] = useState(new Array(filterList.length))

  return (
    <Flex
      sx={{
        height: '100%',
        width: ['50%', '40%', '25%'],
        padding: 5,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Heading
          sx={{
            fontSize: [3, 5, 7],
            cursor: 'pointer',
            pb: 3
          }}
          as='h1'
        >
          Fresh.
        </Heading>
        <AlgoBox algo={algo} onAlgoChange={setAlgo} />
        <ArgumentBox algo={algo} args={args} sx={{mt: 3}} onArgumentChange={setArgs} />
        <TrashFilter trashFilter={trashFilter} sx={{mt: 3}} onTrashFilterCallback={setTrashFilter} />
        <Button sx={{mt: 4, width: '100%'}} variant='secondary'>Apply Algorithm</Button>
      </Box>
    </Flex>
  )
}

// markup
const IndexPage = () => {
  const [coords, setCoords] = useState([])
  const [center, setCenter] = useState({lat: 38.818, lng: -77.165})

  useEffect(() => {
    async function startup() {
      let res = await getData();
      setCoords(res.coords);
      setCenter({lat: res.centerLat, lng: res.centerLng})
    }
    startup()
  }, [])


  return (
    <Flex
      sx={{
        height: '100vh',
        width: '100%',
        flexDirection: 'row',
        background: 'background',
        margin: 0,
      }}
    >
      <SideBar />
      <Box sx={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          center={center}
          defaultZoom={13}
        >
          {!!coords && 
            coords.map((obj, i) => <Marker key={i} lat={obj.lat} lng={obj.lng} id={obj.label}></Marker>)
          }
        </GoogleMapReact>
      </Box>
    </Flex>
  )
}

export default IndexPage
