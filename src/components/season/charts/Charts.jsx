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
    colors: ['#77B6EA', '#545454'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Value',
      align: 'left'
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      }
    },
    markers: {
      size: 1
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
      min: 75,
      max: 100
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
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
              : player.value + 1
          ]
        }
      })

      console.log(array)
      setSeries(array)
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
            <Paper elevation={10}>
              <Chart
                options={options}
                series={series}
                type="line"
                width={700}
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
