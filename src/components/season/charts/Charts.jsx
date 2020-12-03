import { Box, Grid, Paper, Typography, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
// import { makeStyles } from '@material-ui/core/styles'
// import getMyTeam from '../../api calls/getMyTeam'
import AccountVerify from '../../mutliple/AccountVerify'
import ProgressBall from '../../mutliple/ProgressBall'
import getChartsData from '../../api calls/getChartsData'

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
  // const classes = useStyles()
  // const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(0)
  // const [series, setSeries] = useState([])
  const [panels] = useState(['Season'])
  // const [series2, setSeries2] = useState([])
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

  const [seasonOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#2E93fA', '#66DA26', '#1D1D1D', '#E91E63', '#FF9800'],
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Points per game',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      title: {
        text: 'Game'
      }
    },
    yaxis: {
      title: {
        text: 'Points'
      },
      min: 0,
      max: 40
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    }
  })

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
      // const res = await getMyTeam(UserUuid)
      // setMyTeamData(res.data)

      const charts = await getChartsData(UserUuid, TeamUuid, SeasonUuid)

      // console.log(charts.data)
      setSeries3(charts.data)

      // const array = res.data.Players.sort(function (a, b) {
      //   return new Date(b.value) - new Date(a.value)
      // }).map((player) => {
      //   return {
      //     name: player.firstName + ' ' + player.lastName,
      //     data: [
      //       player.value,
      //       player.value > 90
      //         ? player.value + 3
      //         : player.value > 85
      //         ? player.value + 2
      //         : player.value > 80
      //         ? player.value + 1
      //         : player.value > 75
      //         ? player.value - 2
      //         : player.value + 1,
      //       player.value,
      //       player.value > 90
      //         ? player.value - 2
      //         : player.value > 85
      //         ? player.value + 1
      //         : player.value > 80
      //         ? player.value - 1
      //         : player.value > 75
      //         ? player.value + 2
      //         : player.value + 1,
      //       player.value
      //     ]
      //   }
      // })

      // const array2 = res.data.Players.sort(function (a, b) {
      //   return new Date(b.value) - new Date(a.value)
      // }).map((player) => {
      //   return {
      //     name: player.firstName + ' ' + player.lastName,
      //     data: [
      //       player.value,
      //       player.value > 90
      //         ? player.value - 2
      //         : player.value > 85
      //         ? player.value + 1
      //         : player.value > 80
      //         ? player.value - 1
      //         : player.value > 75
      //         ? player.value + 2
      //         : player.value + 1,
      //       player.value,
      //       player.value > 90
      //         ? player.value - 4
      //         : player.value > 85
      //         ? player.value + 2
      //         : player.value > 80
      //         ? player.value + 3
      //         : player.value > 75
      //         ? player.value + 4
      //         : player.value + 4,
      //       player.value
      //     ]
      //   }
      // })

      // setSeries(array)
      // setSeries2(array2)

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

              <TabPanel value={value} index={0}>
                <Chart
                  options={seasonOptions}
                  series={seasonSeries}
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

              {/* <TabPanel value={value} index={1}>
                <Chart
                  options={options}
                  series={series}
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

              <TabPanel value={value} index={2}>
                <Chart
                  options={options2}
                  series={series2}
                  type="line"
                  width={600}
                  height={500}
                  style={{
                    backgroundColor: '#8a8a8a',
                    color: 'black',
                    borderRadius: '4px'
                  }}
                />
              </TabPanel> */}
            </Paper>
          </Grid>
        )}
      </>
    </>
  )
}
export default Charts

// const [options] = useState({
//   chart: {
//     height: 350,
//     type: 'line',
//     dropShadow: {
//       enabled: true,
//       color: '#000',
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2
//     },
//     zoom: {
//       enabled: false
//     },
//     toolbar: {
//       show: false
//     }
//   },
//   colors: ['#2E93fA', '#66DA26', '#1D1D1D', '#E91E63', '#FF9800'],
//   dataLabels: {
//     // enabled: true
//   },
//   stroke: {
//     curve: 'straight'
//   },
//   title: {
//     text: 'Value',
//     align: 'left'
//   },
//   grid: {
//     row: {
//       colors: ['#f3f3f3', 'transparent'],
//       opacity: 0.5
//     }
//   },
//   xaxis: {
//     categories: ['2020', '2021', '2022', '2023', '2024'],
//     title: {
//       text: 'Year'
//     }
//   },
//   yaxis: {
//     title: {
//       text: 'Value'
//     },
//     min: 65,
//     max: 99
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'right'
//   }
// })

// const [options2] = useState({
//   chart: {
//     height: 350,
//     type: 'line',
//     dropShadow: {
//       enabled: true,
//       color: '#000',
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2
//     },
//     zoom: {
//       enabled: false
//     },
//     toolbar: {
//       show: false
//     }
//   },
//   colors: ['#2E93fA', '#66DA26', '#1D1D1D', '#E91E63', '#FF9800'],
//   dataLabels: {
//     // enabled: true
//   },
//   stroke: {
//     curve: 'straight'
//   },
//   title: {
//     text: 'Scoring',
//     align: 'left'
//   },
//   grid: {
//     row: {
//       colors: ['#f3f3f3', 'transparent'],
//       opacity: 0.5
//     }
//   },
//   xaxis: {
//     categories: ['2020', '2021', '2022', '2023', '2024'],
//     title: {
//       text: 'Year'
//     }
//   },
//   yaxis: {
//     title: {
//       text: 'Value'
//     },
//     min: 65,
//     max: 99
//   },
//   legend: {
//     position: 'top',
//     horizontalAlign: 'right'
//   }
// })
