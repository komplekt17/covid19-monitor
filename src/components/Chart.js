import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../api';
import styles from '../styles/Chart.module.css';

export const Chart = () => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const getFetchResult = async () => {
			const result = await fetchDailyData();
			setDailyData(result);
		};

		getFetchResult();
	}, []);

	const lineChart =
		dailyData.length !== 0 ? (
			<Line
				data={{
					labels: dailyData(({ data }) => data),
					datasets: [
						{
							data: dailyData(({ confirmed }) => confirmed),
							label: 'Infected',
							BorderColor: '#3333ff',
							fill: true,
						},
						{
							data: dailyData(({ deaths }) => deaths),
							label: 'Deaths',
							BorderColor: 'red',
							backgroundColor: 'rgba(250, 0, 0, 0.5)',
							fill: true,
						},
						{
							data: dailyData(({ recovered }) => recovered),
							label: 'Recovered',
							BorderColor: 'rgba(0, 255, 0, 0.5)',
							fill: true,
						},
					],
				}}
			/>
		) : (
			'Loading...'
		);

	return <div className={styles.container}>{lineChart}</div>;
};
