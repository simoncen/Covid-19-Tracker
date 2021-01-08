import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api'; // dont have to specify index.js

import coronaImage from './images/c2.png';

class App extends React.Component {
    // no need for the constructor in this case
    state = {
        data: {},
        country: '',
    }

    // the lifecycle is async due to the async fetchdata from api/index.js
    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data: fetchedData});
    }

    handleCountryChange = async(country) => {
        // fetch the data 
        const fetchedData = await fetchData(country);
        // set the state
        this.setState({data: fetchedData, country: country});  // change the global data to the data of the seleted country, also the country name
    }

    render(){
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/> 
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;