import * as lib from '../lib';


export default function(cox)
{
	const { store, redirect, route, isDev, error } = cox;

	// print current route
	if (isDev)
	{
		console.warn(`REDIRECT TO : ${route.name} :: ${route.path}`);
	}

	if (store.state.status.error)
	{
		error({
			statusCode: store.state.status.errorCode || 500,
			title: 'error page',
			message: store.state.status.errorMessage || 'System error',
		});
		return;
	}

	// check on qtum-core
	if (!store.state.status.core)
	{
		error({
			statusCode: 600,
			title: 'error page',
			message: 'qtum-core is turned off.',
		});
		return;
	}

	// check auth
	if (store.state.system.useAuth && !store.state.system.hash)
	{
		// `NOT_ALLOW`값이 all이라면 무조건 로그인 페이지로 보내버린다.
		if (lib.object.findKeyInArray(store.state.system.notAllow, 'all'))
		{
			redirect('/auth/login');
		}

		// 허용되지않은 `route.name`값을 검사하여 로그인으로 이동
		if (lib.object.findKeyInArray(store.state.system.notAllow, route.name))
		{
			redirect('/auth/login');
		}
	}
}