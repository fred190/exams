const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
	patientID: {
		type: String,
		required: true,
	},
	FullName: {
		type: String,
		required: true,
	},
	LastName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	emergencyContact: {
		type: String,
		required: true,
	},
	residentialAddress: {
		type: String,
		required: true,
	},
	dob: {
        type: Date,
        default: Date.now,
	}
});

const Patient = mongoose.model("patient", PatientSchema);

module.exports = Patient;
