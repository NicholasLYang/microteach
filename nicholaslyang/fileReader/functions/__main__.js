const fs = require('fs');
/**
* A basic Hello World function
* @param {string} code Code you're writing to a file
* @returns {string}
*/

module.exports = (code, context, callback) => {

    fs.writeFile("/tmp/test", code, function(err) {
        if (err) {
            callback(null, err);
        }
    });
    fs.readFile("/tmp/test", function(err, data) {
        if (err) {
            callback(null, err);
        }
        callback(null, data.toString());
    });

};
