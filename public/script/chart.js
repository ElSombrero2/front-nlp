const ctx = document.getElementById('chart').getContext('2d');

const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
const  backgroundColor = [
  'hsl(217, 71%, 53%)', 
  'hsl(141, 53%, 53%)', 
  'hsl(348, 100%, 61%)', 
  'hsl(0, 0%, 21%)', 
  'hsl(48, 100%, 67%)', 
  '#EE66FF'
]

const labels = Object.keys(graph).map((key) => key)
const _data = Object.keys(graph).map((key) => graph[key])

const data = {
  labels,
  datasets: [
    {
      label: 'Sentiments',
      data: _data,
      backgroundColor: [
        'hsl(217, 71%, 53%)', 
        'hsl(141, 53%, 53%)', 
        'hsl(348, 100%, 61%)', 
        'hsl(0, 0%, 21%)', 
        'hsl(48, 100%, 67%)', 
        '#EE66FF'
      ]
    }
  ]
};

const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: {
        plugins: {
            filler: { propagate: false },
            'samples-filler-analyser': { target: 'chart-analyser'},
            legend: { position: 'bottom' },
        },
        interaction: { intersect: false}
    },
    
});

document.getElementById('submit')
.addEventListener('click', () => {
  document.getElementById('correct').submit()
})

document.getElementById('submit-log')
.addEventListener('click', () => {
  document.getElementById('log-form').submit()
})