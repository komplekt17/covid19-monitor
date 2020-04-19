import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (nameCountry) => {
	let ChangeableUrl = url;

	if (nameCountry) ChangeableUrl = `${url}/countries/${nameCountry}`;

	try {
		const response = await axios.get(ChangeableUrl);
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
		const modifiedData = data.map((itemData) => {
			return {
				confirmed: itemData.confirmed.total,
				deaths: itemData.deaths.total,
				recovered: itemData.recovered.total,
				date: itemData.reportDate,
			};
		});

		return modifiedData;
	} catch (error) {
		console.log('FetchDailyData error: ', error);
	}
};

export const fetchCountries = async () => {
	try {
		const response = await axios.get(`${url}/countries`);
		const {
			data: { countries },
		} = response;

		// console.log(data);
		return countries.map((country) => {
			return country.name;
		});
	} catch (error) {
		console.log('FetchCountriesData error: ', error);
	}
};
