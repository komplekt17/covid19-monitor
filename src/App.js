import React, { useState, useEffect } from 'react';
import { CountryPicker, Cards, Chart } from './components';
import { fetchData } from './api';
import styles from './styles/App.module.css';

function App() {
	const [data, setData] = useState({});

	useEffect(() => {
		const getFetchResult = async () => {
			const result = await fetchData();
			setData(result);
		};

		getFetchResult();
	}, []);

	return (
		<div className={styles.container}>
			<Cards data={data} />
			<CountryPicker />
			<Chart />
		</div>
	);
}

export default App;
