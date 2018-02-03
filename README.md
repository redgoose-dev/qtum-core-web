# qtum-core-web
Qtum core wallet for web


## qtum core

먼저 qtum core 데몬이 실행되어 있어야 합니다. 다음 주소에서 자신의 환경에 맞는 cli 버전을 설치합니다.

https://github.com/qtumproject/qtum/releases


## using

1. clone repo
1. run `yarn install`
1. run `yarn run setup`
1. input password
1. edit `.env.json` file
1. run `yarn run build`
1. run `yarn run start`


## setup `.env.json` file

기본적으로 상황에 맞게 수정해주시면 됩니다.  
`yarn run setup` 명령을 실행하면 `.env.json`파일이 만들어지는데 여기서 `qtum-cli` 파일의 절대경로로 수정해줘야 합니다.

- `TITLE` : 브라우저에 표시되는 제목
- `API_URL`
- `TESTNET`
- `CORE_ADDRESS`
- `LANGUAGE`
- `USE_AUTH`
- `NOT_ALLOW` : 허용하지 않는 페이지를 설정합니다.
  - `all` : all pages
  - `index` : dashboard
  - `transactions`
  - `wallets`
  - `send`
  - `settings`
  - `unlock-wallet`
  - `layout` : 레이아웃 상단의 정보를 노출할지 결정
- `HASH`


## development

1. run `yarn run dev`
1. connect browser `http://localhost:3000`


## Donation

Thank you for your donation.

Qtum wallet : `QXJZPwJTT3mnuVASuPMChCPaPZ7vm9mJU1`
