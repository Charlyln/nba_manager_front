import {
  Box,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  Button
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AccountVerify from '../../mutliple/AccountVerify'
import ProgressBall from '../../mutliple/ProgressBall'
import getChartsData from '../../api calls/getChartsData'
import {
  pointsOptions,
  stealsOptions,
  blocksOptions,
  reboundsOptions,
  assistsOptions,
  progressOptions
} from './chartsOptions'
import LaunchIcon from '@material-ui/icons/Launch'
import getProgressCharts from '../../api calls/getProgressCharts'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '5px 5px 0px 0px',
    float: 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  paper: {
    margin: '10px auto',
    padding: '0px 0px 10px 0px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 700
    },
    [theme.breakpoints.up('lg')]: {
      width: 700
    },
    [theme.breakpoints.up('xl')]: {
      width: 700
    }
  },
  paperExpanded: {
    margin: '5px',
    padding: '0px 0px 10px 0px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 900
    },
    [theme.breakpoints.up('lg')]: {
      width: 1100
    },
    [theme.breakpoints.up('xl')]: {
      width: 1100
    }
  },
  chart: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 638
    },
    [theme.breakpoints.up('lg')]: {
      width: 638
    },
    [theme.breakpoints.up('xl')]: {
      width: 638
    }
  },
  chartExpanded: {
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: 838
    },
    [theme.breakpoints.up('lg')]: {
      width: 1038
    },
    [theme.breakpoints.up('xl')]: {
      width: 1038
    }
  }
}))

function Charts() {
  const classes = useStyles()
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [TeamUuid] = useState(window.localStorage.getItem('TeamUuid'))
  const [SeasonUuid] = useState(window.localStorage.getItem('SeasonUuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState(0)
  const [chartWidth, setChartWidth] = useState(false)
  const [panels] = useState([
    'Points',
    'Rebounds',
    'Assists',
    'Blocks',
    'Steals'
  ])
  const [seasonSeries, setSeasonSeries] = useState([])
  const [progressSeries, setProgressSeries] = useState([])

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
      setSeasonSeries(charts.data)
      const progressCharts = await getProgressCharts(TeamUuid)
      setProgressSeries(progressCharts.data)
      console.log(progressCharts.data)
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
          <>
            <Grid
              container
              style={{
                marginTop: '100px',
                marginBottom: '50px',
                justifyContent: 'center'
              }}
            >
              <Grid item xs={12}>
                <Paper
                  className={chartWidth ? classes.paperExpanded : classes.paper}
                  elevation={10}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="button"
                        component="div"
                        color="textSecondary"
                        style={{
                          margin: '5px 0px 0px 10px'
                        }}
                      >
                        <strong>Season stats</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={() =>
                          setChartWidth((chartWidth) => !chartWidth)
                        }
                      >
                        {chartWidth ? (
                          <LaunchIcon
                            style={{
                              transform: 'rotate(180deg)'
                            }}
                          />
                        ) : (
                          <LaunchIcon />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
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
                          panels[i] === 'Points'
                            ? pointsOptions
                            : panels[i] === 'Rebounds'
                            ? reboundsOptions
                            : panels[i] === 'Assists'
                            ? assistsOptions
                            : panels[i] === 'Steals'
                            ? stealsOptions
                            : blocksOptions
                        }
                        series={seasonSeries[i]}
                        type="line"
                        height={500}
                        className={
                          chartWidth ? classes.chartExpanded : classes.chart
                        }
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
              <Grid item xs={12}>
                <Paper
                  className={chartWidth ? classes.paperExpanded : classes.paper}
                  elevation={10}
                >
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography
                        variant="button"
                        component="div"
                        color="textSecondary"
                        style={{
                          margin: '5px 0px 0px 10px'
                        }}
                      >
                        <strong>Player value progress</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={() =>
                          setChartWidth((chartWidth) => !chartWidth)
                        }
                      >
                        {chartWidth ? (
                          <LaunchIcon
                            style={{
                              transform: 'rotate(180deg)'
                            }}
                          />
                        ) : (
                          <LaunchIcon />
                        )}
                      </Button>
                    </Grid>
                  </Grid>

                  <Chart
                    options={progressOptions}
                    series={progressSeries}
                    type="line"
                    height={500}
                    className={
                      chartWidth ? classes.chartExpanded : classes.chart
                    }
                    style={{
                      backgroundColor: '#8a8a8a',
                      color: 'black',
                      borderRadius: '4px',
                      margin: '10px auto'
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </>
    </>
  )
}
export default Charts
