const bcrypt = require('bcrypt');


/**
 * password
 *
 * @param {String} pw
 * @param {Number} saltRounds
 * @return {String}
 */
exports.create = function(pw='', saltRounds=10)
{
	return bcrypt.hashSync(pw, saltRounds);
};


/**
 * compare password
 *
 * @param {String} password
 * @param {String} hash
 * @return {Boolean}
 */
exports.compare = function(password='', hash='')
{
	return bcrypt.compareSync(password, hash);
};