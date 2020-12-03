import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import getMyTeam from '../../api calls/getMyTeam'
import AccountVerify from '../../mutliple/AccountVerify'
import ProgressBall from '../../mutliple/ProgressBall'

function Charts() {
  const [myteamData, setMyTeamData] = useState({})
  const [UserUuid] = useState(window.localStorage.getItem('uuid'))
  const [isLoading, setIsLoading] = useState(true)
  const [series, setSeries] = useState([])
  const [series2, setSeries2] = useState([])
  const [options] = useState({
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
    dataLabels: {
      // enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Value',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['2020', '2021', '2022', '2023', '2024'],
      title: {
        text: 'Year'
      }
    },
    yaxis: {
      title: {
        text: 'Value'
      },
      min: 65,
      max: 99
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    }
  })

  const [options2] = useState({
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
    dataLabels: {
      // enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Scoring',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    xaxis: {
      categories: ['2020', '2021', '2022', '2023', '2024'],
      title: {
        text: 'Year'
      }
    },
    yaxis: {
      title: {
        text: 'Value'
      },
      min: 65,
      max: 99
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    }
  })

  useEffect(() => {
    getAllData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllData = async () => {
    try {
      const res = await getMyTeam(UserUuid)
      setMyTeamData(res.data)
      console.log(myteamData)
      const array = res.data.Players.sort(function (a, b) {
        return new Date(b.value) - new Date(a.value)
      }).map((player) => {
        return {
          name: player.firstName + ' ' + player.lastName,
          data: [
            player.value,
            player.lastName === 'Curry'
              ? player.value + 3
              : player.lastName === 'Wiggins'
              ? player.value + 2
              : player.lastName === 'Green'
              ? player.value + 1
              : player.lastName === 'Thompson'
              ? player.value - 2
              : player.value + 1,
            player.value,
            player.lastName === 'Curry'
              ? player.value - 2
              : player.lastName === 'Wiggins'
              ? player.value + 1
              : player.lastName === 'Green'
              ? player.value - 1
              : player.lastName === 'Thompson'
              ? player.value + 2
              : player.value + 1,
            player.value
          ]
        }
      })

      const array2 = res.data.Players.sort(function (a, b) {
        return new Date(b.value) - new Date(a.value)
      }).map((player) => {
        return {
          name: player.firstName + ' ' + player.lastName,
          data: [
            player.value,
            player.lastName === 'Curry'
              ? player.value - 2
              : player.lastName === 'Wiggins'
              ? player.value + 1
              : player.lastName === 'Green'
              ? player.value - 1
              : player.lastName === 'Thompson'
              ? player.value + 2
              : player.value + 1,
            player.value,
            player.lastName === 'Curry'
              ? player.value - 4
              : player.lastName === 'Wiggins'
              ? player.value + 0
              : player.lastName === 'Green'
              ? player.value + 3
              : player.lastName === 'Thompson'
              ? player.value + 4
              : player.value + 4,
            player.value
          ]
        }
      })

      setSeries(array)
      setSeries2(array2)
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
            <Paper elevation={10} style={{ margin: '5px' }}>
              <Chart
                options={options}
                series={series}
                type="line"
                width={500}
                height={500}
                style={{
                  backgroundColor: '#8a8a8a',
                  color: 'black',
                  borderRadius: '4px'
                }}
              />
            </Paper>
            <Paper elevation={10} style={{ margin: '5px' }}>
              <Chart
                options={options2}
                series={series2}
                type="line"
                width={500}
                height={500}
                style={{
                  backgroundColor: '#8a8a8a',
                  color: 'black',
                  borderRadius: '4px'
                }}
              />
            </Paper>
          </Grid>
        )}
      </>
    </>
  )
}
export default Charts
