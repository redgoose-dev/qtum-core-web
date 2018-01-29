import * as lib from '../lib';


export default function(cox)
{
	const { store, redirect, route, req, isDev } = cox;

	// print current route
	if (cox.isDev)
	{
		console.log(`REDIRECT TO : ${route.name} :: ${route.path}`);
	}

	// check auth
	if (store.state.system.useAuth && !store.state.system.hash)
	{
		// 허용되지않은 `route.name`값을 검사하여 로그인으로 이동
		if (lib.object.findKeyInArray(store.state.system.notAllow, route.name))
		{
			redirect('/auth/login');
		}
	}

	if (process.server)
	{
		// 처음 불러올때..
	}
	else
	{
		// 브라우저에서 이동
	}
}