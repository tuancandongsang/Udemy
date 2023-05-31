const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {

        // // hiển thị kiểu json
        // res.json({
        //     name: Course
        // })
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });

                // // hiển thị json db
                // res.json( {
                //     courses: mutipleMongooseToObject(courses),
                // });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
