export const assistsOptions = {
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
    max: 15
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
}

export const pointsOptions = {
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
}
