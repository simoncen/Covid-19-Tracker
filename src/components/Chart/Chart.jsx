import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => { // data is used for bar chart, dailyData is for global chart
    const [dailyData, setDailyData] = useState([]); // stores an empty array at first, gonna be an array of objects

    useEffect(() => { // must only use async function inside the useEffect callback function
        const fetchAPI  = async() => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, [])

    const lineChart = (
        dailyData.length // not equal to 0 then it's true 
            ? (
                <Line 
                data={{
                    labels: dailyData.map(({date}) => date), //return an arrya of all the dates
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true // fill the space below the line chart
                    }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0 ,0, 0.5)',
                        fill: true
                    }] // confirmed and the deaths, no daily data for recovered ppl on the api
                }} 
                />
            ) : null
    );


    const barCart = ( // confirmed is passed in as a prop of the functional component
        confirmed
            ? (
                <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current state in ${country}`}
                }}
                />
            ) : null
    );

    return (
        <div className={styles.container}>
            {country ? barCart : lineChart}
        </div>
    )
}

export default Chart;