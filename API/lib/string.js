const queryString = require('query-string');


/**
 * url to query object
 *
 * @param {String} url
 * @return {Object}
 */
exports.urlToQueryObject = function(url)
{
	if (!url) return null;
	return queryString.parse(queryString.extract(url))
};
