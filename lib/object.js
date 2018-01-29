/**
 * convert tree to list
 *
 * TODO: 조정작업 필요함
 */
export function treeToList(src)
{
	let index = [];
	Object.keys(src).forEach(function (o, k) {
		let item = src[o];
		item.forEach(function(key) {
			index.push(key);
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