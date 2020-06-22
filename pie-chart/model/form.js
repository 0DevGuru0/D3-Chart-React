const { Schema, model } = require('mongoose')

const FormSchema = new Schema({
	title: String,
	PID: String,
	fields: [
		{
			type: Schema.Types.ObjectId,
			ref: 'FormFields',
		},
	],
	location_District: [
		{
			type: Schema.Types.ObjectId,
			ref: 'LocationDistrict',
		},
	],
})
module.exports = model('Forms', FormSchema)
