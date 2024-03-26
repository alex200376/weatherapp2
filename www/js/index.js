document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Maxmin7days').addEventListener('click', async function() {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=22.2783&longitude=114.1747&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Hong_Kong');
        const data = await response.json();
    // Remove time/date conversion and use indices as labels
    const dates = data.daily.time.map(time => {
        const date = new Date(time); 
        // Your API might be using a different date string format 
        let day = date.getDate();
        let month = date.getMonth() + 1; 
        return `${day}/${month}`;
    });
        const temperatureMax = data.daily.temperature_2m_max.slice(0, dates.length);
        const temperatureMin = data.daily.temperature_2m_min.slice(0, dates.length);
 
        const ctx = document.getElementById('chart').getContext('2d'); // Assuming you have a canvas element with id 'chart'
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [
                    {
                      label: 'Max Temperature',
                      data: temperatureMax,
                      fill: false,
                      borderColor: 'rgb(255, 99, 132)', // Line color
                      tension: 0.1
                    },
                    {
                      label: 'Min Temperature',
                      data: temperatureMin,
                      fill: false,
                      borderColor: 'rgb(75, 192, 192)', // Line color
                      tension: 0.1
                    },
                ]
            },
            options: {
              responsive: true, // This will make the chart responsive
              maintainAspectRatio: false ,// This could be set to false to let chart take up full container width and height
              aspectRatio:3,
              responsive: true,
              scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    });
  });
  function showChart() {
    document.getElementById("chartWrapper").style.display = 'block';
  }

var buttons = document.querySelectorAll('#navbar ul li button');

var checkbox = document.querySelector('#check');

buttons.forEach(function(button) {
  button.addEventListener('click', function() {

    checkbox.checked = false;
  });
});