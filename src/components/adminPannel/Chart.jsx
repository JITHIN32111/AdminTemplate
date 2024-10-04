import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import authAPI from "../../apis/authApi";
const { getTransactionGraph } = authAPI();

const Charts = () => {
  const [series, setSeries] = useState([{
    name: 'Transactions',
    data: []
  }]);

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: 2, // Adjust this to move data labels further down from the top
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: [], // Your dynamic days
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
      max: (max) => max + 1,  // Add some buffer space at the top by extending the max value
    },
    title: {
      text: 'Transaction Counts for the Last 5 Days',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      
      }
    }
  });
  

  const getGraphData = async () => {
    try {
      const res = await getTransactionGraph();
      const graphData = res.data.data; // Array of days and counts
  
      // Function to convert "n day(s) ago" to a day name
      const getDayName = (daysAgo) => {
        const today = new Date();
        const targetDate = new Date(today.setDate(today.getDate() - daysAgo));
        const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
        return dayName;
      };
  
      const days = graphData.map(item => {
        const daysAgo = parseInt(item.day); // Extract the number from "n day(s) ago"
        return getDayName(daysAgo); // Convert it to a weekday name
      });
  
      const counts = graphData.map(item => item.count); // Get the count values
  
      // Update the chart with the fetched data
      setSeries([{
        name: 'Transactions',
        data: counts,
      }]);
  
      // Update the x-axis categories (day names)
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: {
          ...prevOptions.xaxis,
          categories: days, // Show actual day names
        }
      }));
    } catch (e) {
      console.log(e);
    }
  };
  

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <div>
          <h1 className="text-gray-700 text-md xs:text-xl pl-3 sm:pl-0 md:text-xl font-bold mb-5">
        Transactions  
      </h1>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default Charts;
