export default function({ store, req })
{
	if (process.server)
	{
		//console.log('AAA', process.env.API_URL);
		// 처음 불러올때..
		//console.log('AAA')
	}
	else
	{
		//console.log('BBB', process.env.API_URL);
		//console.log('BBB');
	}
}