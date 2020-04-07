# gg no re
**Web, 50pts**
> A junior dev built this site but we want you to test it before we send it to production.

--------------------------------------------------------------------------------

## Step 1
```
Nothing to see here
```

문제 페이지에 접속하면 위와 같은 내용만 볼 수 있다. 스크립트 태그 안에 `authentication.js` 라고 적혀있어서 해당 파일을 확인해봤다.

```js
var _0x44ff=['TWFrZSBhIEdFVCByZXF1ZXN0IHRvIC9oaWRkZW4vbmV4dHN0ZXAucGhw','aW5jbHVkZXM=','bGVuZ3Ro','bG9n'];(function(_0x43cf52,_0x44ff2a){var _0x2ad1c9=function(_0x175747){while(--_0x175747){_0x43cf52['push'](_0x43cf52['shift']());}};_0x2ad1c9(++_0x44ff2a);}(_0x44ff,0x181));var _0x2ad1=function(_0x43cf52,_0x44ff2a){_0x43cf52=_0x43cf52-0x0;var _0x2ad1c9=_0x44ff[_0x43cf52];if(_0x2ad1['UmZuYF']===undefined){(function(){var _0x4760ee=function(){var _0x335dc0;try{_0x335dc0=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x3b3b3e){_0x335dc0=window;}return _0x335dc0;};var _0x1ecd5c=_0x4760ee();var _0x51e136='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1ecd5c['atob']||(_0x1ecd5c['atob']=function(_0x218781){var _0x1c7e70=String(_0x218781)['replace'](/=+$/,'');var _0x1fccf7='';for(var _0x2ca4ce=0x0,_0x55266e,_0x546327,_0x17b8a3=0x0;_0x546327=_0x1c7e70['charAt'](_0x17b8a3++);~_0x546327&&(_0x55266e=_0x2ca4ce%0x4?_0x55266e*0x40+_0x546327:_0x546327,_0x2ca4ce++%0x4)?_0x1fccf7+=String['fromCharCode'](0xff&_0x55266e>>(-0x2*_0x2ca4ce&0x6)):0x0){_0x546327=_0x51e136['indexOf'](_0x546327);}return _0x1fccf7;});}());_0x2ad1['hdhzHi']=function(_0x5d9b5f){var _0x24b0b1=atob(_0x5d9b5f);var _0x5c5f21=[];for(var _0x390988=0x0,_0xd8eac0=_0x24b0b1['length'];_0x390988<_0xd8eac0;_0x390988++){_0x5c5f21+='%'+('00'+_0x24b0b1['charCodeAt'](_0x390988)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5c5f21);};_0x2ad1['wrYKfR']={};_0x2ad1['UmZuYF']=!![];}var _0x175747=_0x2ad1['wrYKfR'][_0x43cf52];if(_0x175747===undefined){_0x2ad1c9=_0x2ad1['hdhzHi'](_0x2ad1c9);_0x2ad1['wrYKfR'][_0x43cf52]=_0x2ad1c9;}else{_0x2ad1c9=_0x175747;}return _0x2ad1c9;};function authenticate(_0x335dc0){if(validate(_0x335dc0)){console[_0x2ad1('0x2')](_0x2ad1('0x3'));}};function validate(_0x3b3b3e){return _0x3b3b3e[_0x2ad1('0x1')]>=0x5&&_0x3b3b3e[_0x2ad1('0x0')]('$');}
```

코드가 난독화되어 있어 읽기 편하게 바꾼 다음에 함수 부분을 확인했다.

```js
function authenticate(_0x335dc0) {
    if (validate(_0x335dc0)) {
        console[_0x2ad1('0x2')](_0x2ad1('0x3'));
    }
};

function validate(_0x3b3b3e) {
    return _0x3b3b3e[_0x2ad1('0x1')] >= 0x5 && _0x3b3b3e[_0x2ad1('0x0')]('$');
}
```

`authenticate` 함수가 콘솔에 특정 내용을 출력해줄 것으로 예상되었다. 전체 JS 파일을 브라우저 콘솔에 입력하고 `_0x2ad1('0x2')`와 `_0x2ad1('0x3')` 함수를 확인해보니 이동해야 할 파일을 알 수 있었다.

![Console](console.png)

## Step 2
```
Howdy neighbor!
```

`nextstep.php` 파일로 이동해보니 위와 같은 내용만 출력되어 있었다. 딱히 확인할 만한 것이 없어서 해당 페이지의 응답을 프록시 툴로 확인해보니 헤더에 다음과 같은 내용이 있었다.

```
ROT13: Znxr n CBFG erdhrfg gb /ncv/svany.cuc
```

문자열을 원래대로 돌려보니 다음과 같았다.

```
Make a POST request to /api/final.php
```

여담이지만 대회가 종료된 후에 문제 파일을 확인해보니 헤더가 랜덤으로 결정되기 때문에 base64로 인코딩된 헤더도 출력된다는 것을 알 수 있었다.

```
BAS64: TWFrZSBhIFBPU1QgcmVxdWVzdCB0byAvYXBpL2ZpbmFsLnBocA==
```

## Step 3
```
Send a request with the flag variable set
```

`final.php`로 이동해보면 `flag` 변수를 설정하여 요청을 보내라고 한다. GET 방식으로 URL에 입력해 보내봤지만 반응이 없었다. 그래서 POST 방식으로 아래와 같이 요청을 보냈다.

```bash
arachnex@NT900X3G:~$ curl -d 'flag=1' http://challenges.auctf.com:30022/api/final.php
auctf{1_w@s_laZ_w1t_dis_0N3}
```

응답으로 플래그를 획득할 수 있었다.

```
Flag: auctf{1_w@s_laZ_w1t_dis_0N3}
```