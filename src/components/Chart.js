import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../api';
import styles from '../styles/Chart.module.css';

export const Chart = ({ data, country }) => {
	const { confirmed, recovered, deaths } = data;
	const [dailyData, setDailyData] = useState({});

	useEffect(() => {
		const getFetchResult = async () => {
			const result = await fetchDailyData();
			setDailyData(result);
		};

		getFetchResult();
	}, []);

	const lineChart = dailyData[0] ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: 'Infected',
						borderColor: '#3333ff',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths * 1.5),
						label: 'Recovered',
						borderColor: 'green',
						backgroundColor: 'rgba(0, 255, 0, 0.5)',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(250, 0, 0, 0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)',
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: true },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>
			{country ? barChart : lineChart}
		</div>
	);
};
