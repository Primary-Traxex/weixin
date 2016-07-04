var Category = require('../models/category');

// admin new page
exports.new = function (req,res) {
    res.render('category_admin', {
        title: '淘通科技后台录入页',
        category: {}
    })
};

// admin post movie
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);
    category.save(function (err, category) {
        if (err) {
            console.log(err)
        }
        res.redirect('/admin/category/list')
    });
};

// categorylist page
exports.list = function (req,res) {
    Category.fetch(function (err,categories) {
        if (err) {
            console.log(err)
        }
        res.render('categorylist', {
            title: '淘通科技用户分类列表页',
            categories: categories
        })
    });
};


