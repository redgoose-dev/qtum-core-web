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