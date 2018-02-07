import * as lib from '../lib';


export default function(cox)
{
	const { store, redirect, route, isDev, error } = cox;

	// print current route
	if (isDev)
	{
		console.warn(`REDIRECT TO : ${route.name} :: ${route.path}`);
	}

	// check auth
	if (!store.state.system.hash)
	{
		redirect('/auth/login');
	}

	// if (store.state.status.error)
	// {
	// 	error({
	// 		statusCode: store.state.status.errorCode || 500,
	// 		title: 'error page',
	// 		message: store.state.status.errorMessage || 'System error',
	// 	});
	// 	return;
	// }
}