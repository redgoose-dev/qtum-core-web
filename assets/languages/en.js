const tree = {
	global: {
		login: 'Login',
		processing: 'Processing',
		login_upper: 'LOGIN',
		processing_upper: 'PROCESSING',
		date: 'Date',
		type: 'Type',
		balance: 'Balance',
		status: 'Status',
		version: 'Version',
		amount: 'Amount',
		fee: 'Fee',
		confirm: 'Confirm',
		transactionId: 'Transaction ID',
		receive: 'Receive',
		send: 'Send',
		address: 'Address',
		label: 'Label',
		testnet: 'Testnet',
		mainnet: 'Mainnet',
		layout: 'Layout',
	},
	message: {
		notFoundItem: 'Not found item',
		apiFailed: 'Failed to import API.',
		placeholder_password: 'Please input password',
	},
	login: {
		password: {
			label: 'Password',
			placeholder: 'Please enter a password.',
		},
		rememberMe: 'Remember me',
		usingTestnet: 'Using testnet',
		message: {
			failed: 'Login failed',
		},
	},
	layout: {
		profileMenu: {
			settings: 'Settings',
			logout: 'Logout',
		},
	},
	dashboard: {
		totalBalance: 'Total balance',
		staked: 'Staked',
		immature: 'Immature',
		unconfirmed: 'Unconfirmed',
		currentBlock: 'Current block',
		staking: 'Staking',
		walletStatus: 'Wallet status',
		networkWeight: 'Network weight',
		connections: 'Connections',
		recentTransactions: 'Recent transactions',
	},
	receive: {
		addAddress: 'Add address',
		labelName: 'Label name',
		addAddress_description: 'Enter a label for the new address.',
		addAddress_placeholder: 'Please input label',
	},
	settings: {
		qtum: {
			title: 'Qtum core',
			description: 'The area that manages the core.',
			warning_changeValue: 'Please be careful about changing this option.',
			changeCorePower: 'core power on/off',
			lockWalletTitle: 'Lock wallet',
			forStakingOnly: 'For staking only',
			unlockWallet: 'Unlock wallet',
			lockWallet: 'Lock wallet',
		},
	},
};


module.exports = tree;