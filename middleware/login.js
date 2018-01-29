export default function({ store, req, redirect })
{
	if (store.state.system.hash)
	{
		redirect('/');
	}
}