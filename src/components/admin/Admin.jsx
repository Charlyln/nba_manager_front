import {
  AppBar,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { apiUrl } from '../../apiUrl'
import ProgressBall from '../mutliple/ProgressBall'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useHistory } from 'react-router-dom'
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { forwardRef } from 'react'
import Chart from 'react-apexcharts'
import CloudDoneIcon from '@material-ui/icons/CloudDone'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
}
const useStyles = makeStyles((theme) => ({
  chart: {
    padding: '10px 0px'
  },
  grid: {
    marginBottom: '6px',
    justifyContent: 'center'
  },
  paper: {
    margin: '0px 3px'
  }
}))

function Admin() {
  const classes = useStyles()
  let history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [token] = useState(sessionStorage.getItem('token'))
  const [adminData, setAdminData] = useState({})
  const [data, setData] = useState([])
  const [loadData, setLoadData] = useState(false)
  const columns = [
    { title: 'Pseudo', field: 'pseudo' },
    { title: 'Creation', field: 'creationDate' },
    { title: 'Team', field: 'userTeamName' },
    { title: 'Games', field: 'UsersGamesPlayed' },
    { title: 'Seasons', field: 'usersSeason' },
    { title: 'Trophies', field: 'userTrophies' }
  ]

  const getUsers = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/users/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAdminData(res.data)
      setData(res.data.usersData)
      console.log(res.data)
      setIsLoading(false)
      setLoadData(false)
    } catch (err) {
      history.push('/')
      setIsLoading(false)
    }
  }

  const deleteUser = async (rowData) => {
    try {
      console.log(rowData.userUuid)
      let newData = data

      const dataSet = newData.filter(
        (user) => user.userUuid !== rowData.userUuid
      )

      setData(dataSet)

      await Axios.delete(`${apiUrl}/users/${rowData.userUuid}`)
      setLoadData(true)
      await getUsers()
    } catch (err) {
      console.log(err)
    }
  }

  const disconnect = () => {
    localStorage.clear()
    sessionStorage.clear()
    history.push('/')
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AppBar className="appBar">
        <Toolbar>
          <Typography
            variant="h6"
            component="h6"
            style={{ marginLeft: '30px', fontSize: 'medium' }}
          >
            ADMIN
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={disconnect}
            style={{ marginLeft: 'auto' }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {isLoading ? (
        <>
          <ProgressBall />
        </>
      ) : (
        <>
          <Grid
            container
            style={{
              justifyContent: 'center',
              marginBottom: '6px',
              marginTop: '100px'
            }}
          >
            <div style={{ width: '918px' }}>
              <Grid
                container
                style={{
                  justifyContent: 'center'
                }}
              >
                <Paper
                  elevation={5}
                  style={{ margin: '0px 3px', width: '403px' }}
                >
                  <Grid item style={{ textAlign: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textAlign: 'left', marginLeft: '5px' }}
                    >
                      Number of users
                    </Typography>
                    <Typography variant="h3" gutterBottom>
                      {adminData.NbrUsers}
                    </Typography>
                  </Grid>
                </Paper>
                <Paper
                  elevation={5}
                  style={{ margin: '0px 3px', width: '403px' }}
                >
                  <Grid item style={{ textAlign: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ textAlign: 'left', marginLeft: '5px' }}
                    >
                      Number of games simulated
                    </Typography>
                    <Typography
                      variant="h3"
                      gutterBottom
                    >
                      {adminData.NbrGamesPlayed}
                    </Typography>
                  </Grid>
                </Paper>
                <Paper
                  elevation={5}
                  style={{ margin: '0px 3px', width: '93px' }}
                >
                  <Grid item style={{ textAlign: 'center', marginTop: '30px' }}>
                    {loadData ? (
                      <CircularProgress />
                    ) : (
                      <CloudDoneIcon style={{ fontSize: '2.5rem' }} />
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </div>
          </Grid>
          <Grid container className={classes.grid}>
            {adminData.arrayOfChartData.map((chartData) => (
              <Paper elevation={5} className={classes.paper}>
                <Chart
                  className={classes.chart}
                  options={chartData.options}
                  series={chartData.series}
                  type="donut"
                />
              </Paper>
            ))}
          </Grid>
          <Grid
            container
            style={{
              justifyContent: 'center',
              marginBottom: '30px'
            }}
          >
            <div style={{ maxWidth: '100%', width: '912px' }}>
              <Paper elevation={5}>
                <MaterialTable
                  icons={tableIcons}
                  columns={columns}
                  data={data}
                  title="Users"
                  actions={[
                    {
                      icon: tableIcons.Delete,
                      tooltip: 'Delete user',
                      onClick: (event, rowData) => {
                        deleteUser(rowData)
                      }
                    }
                  ]}
                  options={{
                    actionsColumnIndex: -1
                  }}
                />
              </Paper>
            </div>
          </Grid>
        </>
      )}
    </>
  )
}
export default Admin
