/** @jsx jsx */

import { Fragment, useCallback, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import {
  Flex,
  Box,
  Heading,
  Label,
  jsx,
  Radio,
  Input,
  Checkbox,
  Button,
} from 'theme-ui'
import { getData, getClustering } from '../services/api'
import Marker from '../components/marker'


const AlgoBox = ({ onAlgoChange = () => {}, ...props }) => {
  const [algo, setCurrentAlgo] = useState('DBSCAN')

  const setAlgo = useCallback(
    (e, i) => {
      if (e.target.value === 'on') {
        let nAlgo = i === 0 ? 'DBSCAN' : i === 1 ? 'OPTICS' : 'KMEANS'
        setCurrentAlgo(nAlgo)
        onAlgoChange(nAlgo)
      }
    },
    [setCurrentAlgo, onAlgoChange]
  )

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
      <Box sx={{ fontWeight: 'bold' }}>
        <Box
          sx={{
            px: 4,
            py: 3,
            borderTopLeftRadius: 'default',
            borderTopRightRadius: 'default',
            bg: 'primary',
            color: 'background',
          }}
        >
          <Heading as='h3'>Algorithm</Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px',
          }}
        >
          <Label sx={{ py: 1 }}>
            <Radio
              name='algo'
              checked={algo === 'DBSCAN'}
              onChange={(e) => {
                setAlgo(e, 0)
              }}
            />
            DBSCAN Clustering
          </Label>
          <Label sx={{ py: 1 }}>
            <Radio
              name='algo'
              checked={algo === 'OPTICS'}
              onChange={(e) => {
                setAlgo(e, 1)
              }}
            />
            OPTICS Clustering
          </Label>
          <Label sx={{ py: 1 }}>
            <Radio
              name='algo'
              checked={algo === 'KMEANS'}
              onChange={(e) => {
                setAlgo(e, 2)
              }}
            />
            KMEANS Clustering
          </Label>
        </Box>
      </Box>
    </Box>
  )
}

const ArgumentBox = ({
  algoArgs,
  onArgumentChange = () => {},
  algo = 'DBSCAN',
  ...props
}) => {
  const [args, setArgs] = useState(algoArgs)

  useEffect(() => {
    setArgs(algoArgs)
  }, [algoArgs])

  const setCurrentArgs = useCallback(
    (e, i) => {
      let nArgs = [...args]
      nArgs[i] = e.target.value
      setArgs(nArgs)
      onArgumentChange(nArgs)
    },
    [args, setArgs, onArgumentChange]
  )

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
      <Box sx={{ fontWeight: 'bold' }}>
        <Box
          sx={{
            px: 4,
            py: 3,
            borderTopLeftRadius: 'default',
            borderTopRightRadius: 'default',
            bg: 'primary',
            color: 'background',
          }}
        >
          <Heading as='h3'>Arguments</Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px',
          }}
        >
          {(algo === 'DBSCAN' || algo === 'OPTICS') && (
            <Fragment>
              <Label sx={{ pb: 1, pt: 1 }}>Neighborhood Radius</Label>
              <Input
                name='radius'
                type='number'
                value={args[0]}
                onChange={(e) => {
                  setCurrentArgs(e, 0)
                }}
              />
              <Label sx={{ pb: 1, pt: 2 }}>Number of Neighbors</Label>
              <Input
                name='neighbors'
                type='number'
                value={args[1]}
                onChange={(e) => {
                  setCurrentArgs(e, 1)
                }}
              />
            </Fragment>
          )}
          {algo === 'KMEANS' && (
            <Fragment>
              <Label sx={{ pb: 1, pt: 2 }}>Number of Clusters</Label>
              <Input
                name='clusters'
                type='number'
                value={args[0]}
                onChange={(e) => {
                  setCurrentArgs(e, 0)
                }}
              />
            </Fragment>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const filterList = ['Plastic Bag', 'Bottlecap', 'Bottle', 'Cup', 'Plate']
const filterListToInd = {'plastic bag': 0, 'bottlecap': 1, 'bottle': 2, 'cup': 3, 'plate': 4}

const TrashFilter = ({
  trashFilter,
  onTrashFilterCallback = () => {},
  ...props
}) => {
  const [checkBoxStates, setCheckBoxStates] = useState(trashFilter)

  const toggleCheckBox = useCallback(
    (e, i) => {
      let nCheckBoxStates = [...checkBoxStates]
      nCheckBoxStates[i] = !checkBoxStates[i]

      onTrashFilterCallback(nCheckBoxStates)
      setCheckBoxStates(nCheckBoxStates)
    },
    [checkBoxStates, setCheckBoxStates, onTrashFilterCallback]
  )

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
      <Box sx={{ fontWeight: 'bold' }}>
        <Box
          sx={{
            px: 4,
            py: 3,
            borderTopLeftRadius: 'default',
            borderTopRightRadius: 'default',
            bg: 'primary',
            color: 'background',
          }}
        >
          <Heading as='h3'>Trash Type</Heading>
        </Box>
        <Box
          sx={{
            px: 4,
            pt: '18px',
          }}
        >
          {filterList.map((text, i) => (
            <Label sx={{ my: 1 }}>
              <Checkbox
                key={i}
                defaultChecked={true}
                onChange={(e) => {
                  toggleCheckBox(e, i)
                }}
              />
              {text}
            </Label>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const SideBar = ({onApplyAlgorithm = () => {}, onTrashFilterChange = () => {}, filter, ...props}) => {
  const [algo, setAlgo] = useState('DBSCAN')
  const [args, setArgs] = useState([0.0005, 1])
  const [trashFilter, setTrashFilter] = useState(filter)

  useEffect(() => {
    setTrashFilter(filter)
  }, [filter])  

  const applyAlgorithm = useCallback(async () => {
    let res = await getClustering(algo, args)
    onApplyAlgorithm(res)
  }, [algo, args])

  const onAlgoChange = useCallback(async (algo) => {
    if (algo === "KMEANS")
      setArgs([3])
    else
      setArgs([0.0005, 1])
    
      setAlgo(algo)
  }, [setArgs, setAlgo])

  const applyTrashFilter = useCallback((filter) => {
    setTrashFilter(filter)
    onTrashFilterChange(filter)
  }, [trashFilter, setTrashFilter])

  return (
    <Flex
      sx={{
        height: '100%',
        width: ['50%', '40%', '25%'],
        padding: 5,
      }}
      {...props}
    >
      <Box sx={{ width: '100%' }}>
        <Heading
          sx={{
            fontSize: [3, 5, 7],
            cursor: 'pointer',
            pb: 3,
          }}
          as='h1'
        >
          Fresh.
        </Heading>
        <AlgoBox algo={algo} onAlgoChange={onAlgoChange} />
        <ArgumentBox
          algo={algo}
          algoArgs={args}
          sx={{ mt: 3 }}
          onArgumentChange={setArgs}
        />
        <TrashFilter
          trashFilter={trashFilter}
          sx={{ mt: 3 }}
          onTrashFilterCallback={applyTrashFilter}
        />
        <Button sx={{ mt: 4, width: '100%' }} variant='secondary' onClick={() => {applyAlgorithm()}}>
          Apply Algorithm
        </Button>
      </Box>
    </Flex>
  )
} 

// markup
const IndexPage = () => {
  const [coords, setCoords] = useState(null)
  const [center, setCenter] = useState(null)
  const [clusters, setClusters] = useState(null)
  const [filter, setFilter] = useState(new Array(filterList.length).fill(true))

  useEffect(() => {
    async function startup() {
      let res = await getData()
      setCoords(res.coords)
      setCenter([res.centerLat, res.centerLng])
    }
    startup()
  }, [setCoords, setCenter])

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
      <SideBar filter={filter} onTrashFilterChange={setFilter} onApplyAlgorithm={setClusters} />
      <Box sx={{ height: '100%', width: '100%' }}>
        {!!coords && <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          center={center}
          defaultZoom={18}
        >
          {(!!coords && !clusters) && 
            coords.filter((obj) => filter[filterListToInd[obj.label]]).map(({lat, lng, label, id, imagePath}, i) => (
              <Marker
                key={i}
                lat={lat}
                lng={lng}
                label={label}
                id={id}
                imagePath={imagePath}
              />
            ))}
            {!!clusters && 
              clusters.filter((obj) => filter[filterListToInd[obj.label]]).map(({lat, lng, label, id, clusterID, imagePath}, i) => (
                <Marker
                  key={i}
                  lat={lat}
                  lng={lng}
                  // label={label}
                  id={id}
                  clusterID={clusterID}
                  imagePath={imagePath}
                />
            ))}
        </GoogleMapReact>}
      </Box>
    </Flex>
  )
}

export default IndexPage
