# qtum-core-web
Qtum core wallet for web


## qtum core

먼저 qtum core 데몬이 실행되어 있어야 합니다. 다음 주소에서 자신의 환경에 맞는 cli 버전을 설치합니다.

https://github.com/qtumproject/qtum/releases


## using

1. clone repo
1. run `yarn install`
1. run `yarn run setup`
1. edit `.env.js` file
1. run `yarn run build`
1. run `yarn run start`


## setup `.env.js` file

기본적으로 상황에 맞게 수정해주시면 됩니다.  
`yarn run setup` 명령을 실행하면 `.env.js`파일이 만들어지는데 여기서 `qtum-cli` 파일의 절대경로로 수정해줘야 합니다.


## development

1. run `yarn run dev`
1. connect browser `http://localhost:3000`
