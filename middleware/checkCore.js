export default function(cox)
{
	const { store, error } = cox;

	// check on qtum-core
	if (!store.state.status.core)
	{
		error({
			statusCode: 600,
			title: 'error page',
			message: 'qtum-core is turned off.',
		});
	}
}