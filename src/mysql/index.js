var mysql = require('mysql');
var option = {
    user: 'root',
    password: 'root',
    database: 'userlist'
}
var pool = mysql.createPool(option);
module.exports = function(sql, query, fn) {
    fn = fn ? fn : query;
    query = query || [];
    pool.getConnection(function(err, con) {
        if (err) {
            fn(err)
        } else {
            con.query(sql, query, function(err, results) {
                queryCallback(err, results);
                con.release();
            })
        }
    })

    function queryCallback(err, results) {
        if (err) {
            fn(err)
        } else {
            fn(null, results)
        }
    }
}