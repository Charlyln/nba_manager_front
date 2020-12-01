let apiUrl

if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:8080'
} else {
  apiUrl = 'https://nbamanager.herokuapp.com'
}

export { apiUrl }
