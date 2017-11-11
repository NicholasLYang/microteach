/**
* A basic ESLint function
* @param {string} code
* @returns {array}
*/
module.exports = (code, context, callback) => {
    var SourceCode = require("eslint").SourceCode;
    var Linter = require("eslint").Linter;
    var linter = new Linter();
    var errors = linter.verify(code, {
        rules: {
            semi: 2,
            eqeqeq: 2
        },
        env: {
            "node": true
        }
    });
    callback(null, errors);
};
