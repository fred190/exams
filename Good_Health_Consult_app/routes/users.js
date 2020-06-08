const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");

//User model
const User = require("../models/User");

mongoose
	.connect("mongodb://localhost/goodhealthDb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("MongoDB Connected...");
	})
	.catch((error) => {
		console.log(error);
	});

//Login page
router.get("/login", (req, res) => {
	res.render("login");
});

//Register page
router.get("/register", (req, res) => {
	res.render("register");
});


router.post("/register", (req, res) => {
	const { name, email, password, password2 } = req.body;
	let errors = [];

	//Check required fields
	if (!name || !email || !password || !password2) {
		res.send('input all fields');
	}

	if (password !== password2) {
		res.send('password dont match');
	}

	//Check password length
	if (password.length < 6) {
		res.send('password less that 6 characters');
	}
	 else {
		//validating user
		User.findOne({ email: email }).then((user) => {
			if (user) {
				// if User exist
				res.send('user exsist')
			} else {
				const newUser = new User({
					name,
					email,
					password,
				});

				//Hashing Password
				bcrypt.genSalt(10, (error, salt) =>
					bcrypt.hash(newUser.password, salt, (error, hash) => {
						if (error) throw error;

						//setting password to hash
						newUser.password = hash;

						//save user
						newUser
							.save()
							.then((user) => {
								
								res.redirect("/users/login");
								
							})
							.catch((error) => console.log(error));
					})
				);
			}
		});
	}
});


//Login Post Handle
router.post("/login", (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/users/login",
		failureFlash: true,
	})(req, res, next);
});


// Logout Get Handle
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/users/login");
});


module.exports = router;