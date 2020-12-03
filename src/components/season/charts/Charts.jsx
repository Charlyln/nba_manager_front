import { Box, Grid, Paper, Typography, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
// import getMyTeam from '../../api calls/getMyTeam'
import AccountVerify from '../../mutliple/AccountVerify'
import ProgressBall from '../../mutliple/ProgressBall'
import getChartsData from '../../api calls/getChartsData'
import { assistsOptions } from './chartsOptions'
import { pointsOptions } from './chartsOptions'

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     [theme.breakpoints.down('xs')]: {
//       width: '100%'
//     },
//     [theme.breakpoints.up('sm')]: {
//       width: '80%'
//     },
//     [theme.breakpoints.up('md')]: {
//       width: '60%'
//     },
//     [theme.breakpoints.up('lg')]: {
//       width: '50%'
//     },
//     [theme.breakpoints.up('xl')]: {
//       width: '40%'
//     }
//   }
// }))

function Charts() {
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(0)
  const [panels] = useState(['Points', 'Rebounds', 'Assists'])
  const [seasonSeries, setSeries3] = useState([
    {
      name: 'Jayson Tatum',
      data: [23, 18, 26, 24, 33, 26, 21, 20, 12, 14]
    },
    {
      name: 'Kemba Walker',
      data: [15, 17, 39, 22, 19, 23, 17, 22, 29, 20]
    },
    {
      name: 'Jaylen Brown',
      data: [23, 15, 22, 20, 17, 14, 12, 16, 10, 17]
    },
    {
      name: 'Marcus Smart',
      data: [10, 9, 5, 15, 15, 12, 14, 8, 10, 6]
    },
    {
      name: 'Daniel Theis',
      data: [8, 10, 6, 18, 7, 9, 11, 10, 10, 12]
    }
  ])

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  }

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      const charts = await getChartsData(UserUuid, TeamUuid, SeasonUuid)

      setSeries3(charts.data)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <>
        <AccountVerify />
        {isLoading ? (
          <>
            <ProgressBall />
          </>
        ) : (
          <Grid
            container
            style={{
              marginTop: '100px',
              marginBottom: '50px',
              justifyContent: 'center'
            }}
          >
            <Paper
              elevation={10}
              style={{ margin: '5px', padding: '0px 0px 30px 0px' }}
            >
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="on"
              >
                {panels.map((panel) => (
                  <Tab label={panel} {...a11yProps(value)} />
                ))}
              </Tabs>

              {seasonSeries.map((serie, i) => (
                <TabPanel value={value} index={i}>
                  <Chart
                    options={
                      panels[i] === 'Points' ? pointsOptions : assistsOptions
                    }
                    series={seasonSeries[i]}
                    type="line"
                    width={600}
                    height={500}
                    style={{
                      backgroundColor: '#8a8a8a',
                      color: 'black',
                      borderRadius: '4px'
                    }}
                  />
                </TabPanel>
              ))}
            </Paper>
          </Grid>
        )}
      </>
    </>
  )
}
export default Charts
