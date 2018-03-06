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
		logined: 'You are not logged in.',
		failedLogout: 'Failed logout.',
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
		title: 'Dashboard',
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
		title: 'Receive',
		addAddress: 'Add address',
		labelName: 'Label name',
		addAddress_description: 'Enter a label for the new address.',
		addAddress_placeholder: 'Please input label',
	},
	transactions: {
		title: 'Transactions',
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
			turnOffCore: 'Do you really want to turn off the Qtum-core?',
			failedOffCore: 'Failed turn off qtum-core.',
			failedOnCore: 'Failed turn on qtum-core.',
			failedUnlockWallet: 'Failed unlock wallet.',
			questionLockWallet: 'Do you really want to lock it?',
			failedLockWallet: 'Failed lock wallet.',
		},
		layout: {
			description: 'Layout setting area',
			theme: 'Theme',
			language: 'Language',
			itemsCount: 'Items count',
			light: 'Light',
			dark: 'Dark',
			updateLayout: 'Update layout',
			msg_setCountRecentTransactions: `Set count from "Recent transactions".`,
			msg_setCountTransactions: `Set count from "Transaction".`,
			failedUpdateLayout: 'Failed to update layout.',
		}
	},
};


module.exports = tree;