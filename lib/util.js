import config from '../nuxt.config';


/**
 * make title
 *
 * @param {String} childName
 * @return {String}
 */
export function makeTitle(childName)
{
	return `${config.head.title} / ${childName}`;
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