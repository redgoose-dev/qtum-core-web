export default function({ store, req })
{
	if (process.server)
	{
		// 처음 불러올때..
		//console.log('AAA')
	}
	else
	{
		//console.log('BBB');
	}
}