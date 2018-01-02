/**
 * check login
 * 필요하면 로그인이 되었는지 검사한다.
 */
export default function({ store, redirect })
{
	if (!!false)
	{
		// 로그인 실패했을 경우 login 페이지로 이동
		return redirect('/login');
	}
	else
	{
		return null;
	}
}