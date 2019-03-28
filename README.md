# qtum-core-web

이 프로젝트를 시작한 이유는 퀀텀코어로 채굴을 돌리고 있는 상태를 밖에서 쉬운 접근과 확인이 가능한 도구가 필요해서 만들게 되었다.  
현재 웹서버를 돌리고 있는 리눅스 컴퓨터에서 퀀텀코어를 실행하고 있어서 커멘드로 수량을 확인하거나 전송할 수 있어서 퀀텀코어를 컨트롤하여 개인용 서비스를 만들 수 있겠다싶어 이렇게 제작하게 되었다.


## Demo

1. Connect https://qtum.redgoose.me(closed)
1. Check `Using testnet`
1. Input password: `1234`
1. Login


## Using

### Qtum core

먼저 qtum-core 데몬이 설치되어 있어야 한다. 다음 주소에서 자신의 환경에 맞는 cli 버전을 설치한다.

https://github.com/qtumproject/qtum/releases

### Install

1. Clone repo
1. Run `yarn install`
1. Run `yarn run setup`
1. Set password and qtum-core location
1. (optional) Edit `.config/.env.json`, `.config/.private.json` files
1. Run `yarn run build`
1. Run `yarn run start`

### Preview page

1. Connect `http://localhost:3000`
1. Login


## Test & development

1. Clone repo
1. Run `yarn install`
1. Run `yarn run setup`
1. Run `yarn run dev`
1. Connect `http://localhost:3000`


## Donation

Thank you for your donation.

QTUM ADDRESS : `QXJZPwJTT3mnuVASuPMChCPaPZ7vm9mJU1`
