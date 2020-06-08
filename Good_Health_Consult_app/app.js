const express = require("express");
const passport = require("passport");
const app = express();


require("./config/passport")(passport);


app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs"); 



app.use(express.static(__dirname + "/public"));




app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/patients", require("./routes/patient"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server Running on port ${PORT}`))