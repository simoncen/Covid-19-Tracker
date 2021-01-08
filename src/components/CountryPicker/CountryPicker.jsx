import React, {useState, useEffect}from 'react';
import { NativeSelect, FormControl, StylesProvider } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = ({handleCountryChange}) => { // destructure with {}
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchedAPI = async() => {
            setFetchedCountries(await fetchCountries());
        }

        fetchedAPI();
    }, [setFetchedCountries]);


    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)} {/*React requires keys */}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;