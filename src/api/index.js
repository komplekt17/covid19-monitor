import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
	try {
		const response = await axios.get(url);
		const { data } = response;

		const modifiedData = {
			confirmed: data.confirmed,
			recovered: data.recovered,
			deaths: data.deaths,
			lastUpdate: data.lastUpdate,
		};

		return modifiedData;
	} catch (error) {
		console.log('FetchData error: ', error);
	}
};

export const fetchDailyData = async () => {
	try {
		const response = await axios.get(`${url}/daily`);
		const { data } = response;
		// console.log(data);

		return data;
	} catch (error) {
		console.log('FetchDailyData error: ', error);
	}
};
