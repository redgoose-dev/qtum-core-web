import config from '../nuxt.config';


let timer = null;


/**
 * make title
 *
 * @param {String} childName
 * @return {String}
 */
export function makeTitle(childName)
{
	return `${process.env.TITLE || config.head.title} / ${childName}`;
}


/**
 * get config
 *
 * @return {Object}
 */
export function getConfig()
{
	return config;
}


/**
 * sleep
 *
 * @param {Number} delay
 * @return {Promise}
 */
export function sleep(delay=300)
{
	return new Promise(function(resolve) {
		if (timer)
		{
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(resolve, delay);
	});
}

/**
 * printf
 *
 * @param {String} str
 * @param {String} values
 * @return {String}
 */
export function printf(str, ...values)
{
	for (let i = 0; i < values.length; i++)
	{
		let pattern = `\\{${i}\\}`;
		let replace = new RegExp(pattern, 'g');
		str = str.replace(replace, values[i]);
	}
	return str;
}