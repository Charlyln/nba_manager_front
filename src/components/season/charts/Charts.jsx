import { Box, Grid, Paper, Typography, Tab, Tabs } from '@material-ui/core'
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
  assistsOptions
} from './chartsOptions'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '5px',
    padding: '0px 0px 30px 0px',
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
  chart: {
    [theme.breakpoints.down('xs')]: {
      width: '99%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '99%'
    },
    [theme.breakpoints.up('md')]: {
      width: 600
    },
    [theme.breakpoints.up('lg')]: {
      width: 600
    },
    [theme.breakpoints.up('xl')]: {
      width: 600
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
  const [panels] = useState([
    'Points',
    'Rebounds',
    'Assists',
    'Blocks',
    'Steals'
  ])
  const [seasonSeries, setSeasonSeries] = useState([])

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
            <Paper className={classes.paper} elevation={10}>
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
                    width={classes.chart.width}
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
