import { useMemo } from 'react'
import data from './data.json'
const DataProvide = props =>
	useMemo(
		() =>
			data.map(year =>
				year['countries']
					.filter(country => country.income && country.life_exp)
					.map(country => {
						country.income = +country.income
						country.life_exp = +country.life_exp
						return country
					})
			),
		[]
	)
export default DataProvide
