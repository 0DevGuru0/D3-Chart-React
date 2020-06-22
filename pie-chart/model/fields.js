const { Schema, model } = require('mongoose')

const FieldsSchema = new Schema({
	name: String,
	title: String,
	type: { enum: ['Text', 'Number', 'Date', 'Location'] },
	options: [{ label: String, value: Schema.Types.Mixed }],
	required: Boolean,
	Answers: Schema.Types.Mixed,
})

module.exports = model('FormFields', FieldsSchema)
