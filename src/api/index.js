import axios from 'axios'; // used to make api request, used to fetch data from the client side

const url = 'https://covid19.mathdro.id/api';

// async function, promises

// 1. fetch the data to App.js and pass the data to Card.js after componentDidMount
// 2. fetch the data of a specific country to the handleCountryChange function in App.js
export const fetchData = async(country) => {
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl); // detructured data

        return {confirmed, recovered, deaths, lastUpdate}; // return the object containing the key value pairs

    } catch (error){
        console.log(error);
    }
}

// fetch the daily data to Chart.js
export const fetchDailyData = async() => {
    try{
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    }catch(error){
        console.log(error);
    }
}

// fetch the data of all the countries to countrypicker
export const fetchCountries = async() => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    }catch(error){
        console.log(error);
    }
}