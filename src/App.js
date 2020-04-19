import React, { useState, useEffect } from 'react';
import { CountryPicker, Cards, Chart } from './components';

import { fetchData } from './api';
import styles from './styles/App.module.css';
import image from './images/covid-full.png';

function App() {
	const [data, setData] = useState({});
	const [country, setCountry] = useState('');

	useEffect(() => {
		const getFetchResult = async () => {
			const result = await fetchData();
			setData(result);
		};

		getFetchResult();
	}, []);

	const handleCountryChange = async (nameCountry) => {
		const data = await fetchData(nameCountry);

		setCountry(nameCountry);
		setData(data);
	};

	return (
		<div className={styles.container}>
			<img className={styles.image} src={image} alt="COVID-19" />
			<Cards data={data} />
			<CountryPicker handleCountryChange={handleCountryChange} />
			<Chart data={data} country={country} />
		</div>
	);
}

export default App;
