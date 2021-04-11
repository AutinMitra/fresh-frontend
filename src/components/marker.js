/** @jsx jsx */
import {Box, jsx} from 'theme-ui'
import { Fragment } from 'react'

const label2color = {
  'plastic bag': '#276FBF',
  'bottle cap': '#F03A47',
  'bottle': '#AFA060',
  'cup': '#A53F2B',
  'plate': '#C179B9'
}

const randomColors = []

for (let i = 0; i < 1000; i++)
  randomColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);

const baseURL = 'http://localhost:8080/'

const Marker = ({ lat, long, id, label, clusterID, imagePath }) => {
  return (
    <Fragment>
      <Box
        onClick={() => {window.open(baseURL + imagePath)}}
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
          backgroundColor: label ? label2color[label] : randomColors[clusterID]
        }}
      />
    </Fragment>
  )
}

export default Marker
