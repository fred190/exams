const router = require('express').Router();
const Student = require('../database/students')

router.get('/', (req,res)=>{
    res.render('admin') 
});

router.post('/register', (req, res)=>{
    const data = {
        fullname: req.body.fullname,
        level: req.body.level,
        program: req.body.program,
        email: req.body.email,
        password: req.body.password
    }
    Student.create(data).then(stu=>{
        res.redirect('/');
    })
    .catch(error => {
        console.log(error.message)
    });

});


module.exports = router;