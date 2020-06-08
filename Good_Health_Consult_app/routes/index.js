const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/authenticate");

const Patient = require("../models/Patient");

//Landing Page
router.get("/", (req, res) => {
    res.render("home");
});



//DashBoard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
	const patients = await  Patient.find()
	res.render("board", {
		UserName: req.user.name,
		patients: patients
	});
});



module.exports = router;