/**
 * convert tree to list
 *
 * @param {Object} src
 * @param {String} keyName
 * @param {String} valueName
 * @param {Boolean} sort
 * @return {Array}
 */
export function treeToList(src, keyName='key', valueName='value', sort=false)
{
	let index = [];
	let keys = Object.keys(src);

	if (sort)
	{
		keys = keys.sort();
	}
	keys.forEach(function (o, k) {
		let item = src[o];
		item.forEach(function(value) {
			index.push({
				[keyName]: o,
				[valueName]: value
			});
		});
	});

	return index;
}


/**
 * find key in array
 *
 * @param {Array} arr
 * @param {String} key
 * @return {Boolean}
 */
export function findKeyInArray(arr=[], key='')
{
	return arr.indexOf(key) > -1;
}