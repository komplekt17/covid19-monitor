import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../api';
import styles from '../styles/CountryPicker.module.css';

export const CountryPicker = ({ handleCountryChange }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const getFetchResult = async () => {
			const result = await fetchCountries();
			setCountries(result);
			// console.log(result);
		};

		getFetchResult();
	}, [setCountries]);

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect
				defaultValue=""
				onChange={(e) => handleCountryChange(e.target.value)}
			>
				<option value="">Global</option>
				{countries.map((country, i) => (
					<option key={i} value={country}>
						{country}
					</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};
