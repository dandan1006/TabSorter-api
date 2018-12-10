var express = require('express');
var router = express.Router();
var query = require('../mysql');
var sql = require('../mysql/sql');
/* GET home page. */
router.get('/api/get/list', function(req, res, next) {
    var type = req.query.type,
        page = req.query.page,
        pageSize = req.query.pageSize;
    var start = (page - 1) * pageSize;
    var Sql = `select * from tab where type=? limit ${start},${pageSize}`;
    var SqlCount = `select count(*) from data where type=?`
    query(SqlCount, [type], function(err, results) {
        if (err) {
            res.json({ code: 0, data: err })
        } else {
            var total = Math.ceil(results[0]['count[*]']) / pageSize;
            selectList(total);
        }
    })

    function selectList(total) {
        query(Sql, [type], function(err, results) {
            if (err) {
                res.json({ code: 0, data: err })
            } else {
                res.json({ code: 1, data: results, total: total })
            }
        })
    }

});
module.exports = router;