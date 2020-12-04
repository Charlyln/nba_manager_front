const getPlayerInterest = (PlayerValue, salary) => {
  let pourcentage

  if (PlayerValue < 75) {
    pourcentage = 0.01
  } else if (PlayerValue < 80) {
    pourcentage = 0.05
  } else if (PlayerValue >= 80 && PlayerValue < 85) {
    pourcentage = 0.15
  } else if (PlayerValue >= 85 && PlayerValue < 90) {
    pourcentage = 0.2
  } else if (PlayerValue >= 90) {
    pourcentage = 0.3
  }
  const salaryExpected = 100000000 * pourcentage

  const valueCal = (salary / salaryExpected) * 100

  if (valueCal <= 0) {
    return 0
  } else if (valueCal >= 100) {
    return 100
  } else {
    return valueCal
  }
}

export default getPlayerInterest
