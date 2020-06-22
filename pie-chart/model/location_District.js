const { Schema, model } = require('mongoose')

const LocationDistrictSchema = new Schema({
	label: String,
	value: { long: String, lat: String },
})

module.exports = model(
	'LocationDistrict',
	LocationDistrictSchema
)
