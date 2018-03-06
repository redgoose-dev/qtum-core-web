const tree = {
	global: {
		login: '로그인',
		processing: '처리중',
		login_upper: '로그인',
		processing_upper: '처리중',
		date: '날짜',
		type: '유형',
		balance: '수량',
		status: '상태',
		version: '버전',
		amount: '수량',
		fee: '수수료',
		confirm: '컨펌',
		transactionId: '거래 아이디',
		receive: '받기',
		send: '보내기',
		address: '주소',
		label: '꼬리표',
		testnet: '테스트넷',
		mainnet: '메인넷',
		layout: '레이아웃',
	},
	message: {
		notFoundItem: '항목이 없습니다.',
		apiFailed: 'API 가져오기 실패했습니다.',
		placeholder_password: '비밀번호를 입력해주세요.',
	},
	login: {
		password: {
			label: '비밀번호',
			placeholder: '비밀번호를 입력해주세요.',
		},
		rememberMe: '비밀번호 기억하기',
		usingTestnet: '테스트넷 사용하기',
		message: {
			failed: '로그인 실패했습니다.',
		},
	},
	layout: {
		profileMenu: {
			settings: '환경설정',
			logout: '로그아웃',
		},
	},
	dashboard: {
		totalBalance: '총 수량',
		staked: '스테이크된 수량',
		immature: '미성숙된 수량',
		unconfirmed: '확인안된 수량',
		currentBlock: '현재블럭',
		staking: '스테이킹',
		walletStatus: '지갑상태',
		networkWeight: '네트워크 비중',
		connections: '연결 수',
		recentTransactions: '최근 거래',
	},
	receive: {
		addAddress: '주소추가',
		labelName: '꼬리표 이름',
		addAddress_description: '새 주소의 꼬리표 이름을 입력하세요.',
		addAddress_placeholder: '꼬리표 이름을 입력하세요.',
	},
	settings: {
		qtum: {
			title: '퀀텀 코어',
			description: '퀀텀 코어를 관리하는 영역입니다.',
			warning_changeValue: '이 옵션의 변경에 주의해주세요.',
			changeCorePower: '코어전원 ON/OFF',
			lockWalletTitle: '지갑 잠금설정',
			forStakingOnly: '스테이킹을 위한 잠금해제',
			unlockWallet: '지갑 잠금해제',
			lockWallet: '지갑 잠그기',
		},
	},
};


module.exports = tree;