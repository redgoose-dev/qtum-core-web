/**
 * to locale number
 *
 * @param {Number} n
 * @param {Number} fix correction number
 * @return {String}
 */
export function toLocaleNumber(n, fix=1)
{
	if (typeof n !== 'number') return '0';
	n = n * fix;
	return n.toLocaleString();
}
