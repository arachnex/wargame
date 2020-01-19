# webhacking.kr - 250pts

## old-10
```html
<a id=hackme style="position:relative;left:0;top:0" onclick="this.style.left=parseInt(this.style.left,10)+1+'px';if(this.style.left=='1600px')this.href='?go='+this.style.left" onmouseover=this.innerHTML='yOu' onmouseout=this.innerHTML='O'>O</a>
```
페이지 소스 코드를 보면, O를 클릭하면 오른쪽으로 1px씩 이동하고 1600px이 되었을 때 `go` 파라미터에 1600px 이라는 값이 전달되는 것을 확인할 수 있다. `go` 파라미터에 직접 값을 입력해봤지만 `no hack` 이라는 결과만 출력되었다. `style` 속성을 수정해서 `left` 값을 1600px로 만들었지만 파라미터에 값이 전달되지는 않았다. 1599px로 설정하고 O를 한 번 클릭하여 1600px로 만들었더니 `go` 파라미터에 값이 전달되고 문제가 해결되었다.

## old-12
문제에 접속하면 javascript challenge 라고만 적혀있다. 페이지 소스 코드를 확인해보면 스크립트 태그 안에 일본어 이모티콘만이 빼곡하다. 다행히 XSS 관련해서 검색하다가 지나가면서 본 적이 있는 내용이었다. 이것은 **aaencode**라는 자바스크립트 인코딩 방식이다. 문제의 스크립트를 디코딩하면 일반적인 스크립트를 얻을 수 있다.

```js
var enco='';
var enco2=126;
var enco3=33;
var ck=document.URL.substr(document.URL.indexOf('='));
for(i=1;i<122;i++){
  enco=enco+String.fromCharCode(i,0);
}
function enco_(x){
  return enco.charCodeAt(x);
}
if(ck=="="+String.fromCharCode(enco_(240))+String.fromCharCode(enco_(220))+String.fromCharCode(enco_(232))+String.fromCharCode(enco_(192))+String.fromCharCode(enco_(226))+String.fromCharCode(enco_(200))+String.fromCharCode(enco_(204))+String.fromCharCode(enco_(222-2))+String.fromCharCode(enco_(198))+"~~~~~~"+String.fromCharCode(enco2)+String.fromCharCode(enco3)){
  location.href="./"+ck.replace("=","")+".php";
}
```

조건문이 참이 되면 `ck` 변수의 값이 이름인 PHP 파일로 이동하게 된다. 브라우저 콘솔에서 조건문 위의 내용들을 입력하여 변수와 함수를 선언해주고, `ck` 변수와 비교하는 식을 입력해보면 이동해야 할 파일의 이름을 확인할 수 있다. 그렇게 해당 파일로 이동하면 문제가 해결된다.

## old-21
**Blind SQL Injection** 문제이다. 먼저 서버의 반응을 확인해봤다. 임의의 값을 입력했을 때는 'login fail' 이라는 결과가 출력된다. `id` 를 `admin` 으로 가정하고 `pw` 의 길이를 확인하기 위해 `length()` 함수를 사용해보면 'wrong password' 라는 결과가 출력된다. 종합해보면 `admin` 이라는 계정이 존재하고, `pw` 의 길이는 5글자이며, `pw` 가 참이 되면 'wrong password' 라는 결과를 출력한다는 결론을 내릴 수 있다.

필터링은 확인되지 않기 때문에 SQL의 `substr()` 함수와 `ascii()` 함수를 이용하였다. 자동화를 위해 파이썬 코드를 작성하여 실행해봤다. 그런데 로그인이 되지 않았다. 구한 패스워드는 `ghere` 인데 딱히 의미가 보이지 않아서 패스워드의 길이를 더 늘려 실행해봤다. 그랬더니 패스워드는 36글자였고, 최종적으로 어떤 문장을 얻을 수 있었다.

문장 전체를 보니 `ghere` 이 아닌 `there` 이라는 느낌이 들어서 수정하여 로그인을 시도하였더니 정상적으로 로그인되어 문제를 해결할 수 있었다. 이 문제에 대해서 검색을 해봤더니 다른 계정의 데이터도 존재하기 때문에 알파벳 우선 순위에 의해 발생할 수 있는 상황이었다.

## old-37
문제를 보면 파일 목록과 파일을 업로드 할 수 있는 폼이 있다. 페이지 접속을 포함하여 새로고침 할 때마다 현재 시간을 이름으로 `127.0.0.1` 이라는 IP를 포함하는 파일을 생성한다. 그리고 사용자가 파일을 업로드하면 파일명이 필터링된 후에 사용자의 IP로 내용으로 덮어쓴다. 이제 다음 소스 코드에 주목하자.

```php
$host = file_get_contents("tmp/tmp-{$time}");

$request = "GET /?{$flag} HTTP/1.0\r\n";
$request .= "Host: {$host}\r\n";
$request .= "\r\n";

$socket = fsockopen($host,7777,$errstr,$errno,1);
fputs($socket,$request);
fclose($socket);
```

이것은 플래그를 확인할 수 있는 부분의 소스 코드이다. `$time` 이 현재 시간을 의미하기 때문에 현재 시간에 해당되는 `tmp/tmp-{$time}` 파일의 내용을 `$host` 변수에 저장한다. 서버에 저장되는 파일들의 내용은 전부 IP 주소임을 위에서 알 수 있다. `$request` 변수에 플래그를 포함한 HTTP 요청 내용을 저장한다. 마지막으로 소켓 통신을 열어 요청을 전송한다.

플래그를 획득하기 위해서는 사용자 쪽에서 포트를 열어 수신 대기 상태를 만들고 문제 페이지에 접속하면 될 것으로 판단하였다. 그래서 처음에는 따로 파일을 업로드하지 않고 `127.0.0.1:7777` 로 포트를 열어 통신 대기 상태를 만들었다. 하지만 들어오는 내용은 없었다.

그래서 `tmp/tmp-{$time}` 형식을 갖추고 사용자가 파일을 업로드하면 `$time` 에 해당하는 시간에 내 IP 주소로 소켓 통신을 실행하기 때문에 이 방법을 시도해보기로 하였다. 우선 공유기를 사용하고 있어서 7777번 포트에 대한 포트포워딩 설정을 해주었다. 그리고 적당히 미래의 시간으로 형식을 갖춰 파일을 업로드한다. 마지막으로 터미널에서 `nc`로 7777번 포트를 수신 대기 상태로 만든 후에 업로드한 파일의 시간에 문제 페이지를 요청한다. 그러면 터미널에 플래그를 포함한 HTTP 요청이 남게 된다. 이 플래그를 인증하면 문제가 해결된다.

## old-41
*보류중*

## old-43
**웹쉘**을 업로드하여 `cat /flag` 명령을 실행하면 된다.

```php
<?php
    echo system("cat /flag");
?>
```

간단히 위와 같은 코드를 작성하여 업로드하면 그 파일에 대한 링크가 생성된다. 업로드된 경로에 접근하면 플래그를 확인할 수 있다.

## old-51
문제와 소스 코드를 보면 SQL Injection 문제로 보인다.

```php
<?php
  if($_POST['id'] && $_POST['pw']){
    $db = dbconnect();
    $input_id = addslashes($_POST['id']);
    $input_pw = md5($_POST['pw'],true);
    $result = mysqli_fetch_array(mysqli_query($db,"select id from chall51 where id='{$input_id}' and pw='{$input_pw}'"));
    if($result['id']) solve(51);
    if(!$result['id']) echo "<center><font color=green><h1>Wrong</h1></font></center>";
  }
?>
```

하지만 입력한 패스워드가 **md5**로 암호화된 후에 쿼리문에 들어가기 때문에 일반적인 SQL Injection이 불가능해보였다. 그래서 관련 내용을 검색해보다가 [Raw MD5](https://cvk.posthaven.com/sql-injection-with-raw-md5-hashes)에 대한 내용을 볼 수 있었다.

`md5()` 함수의 두 번째 인자는 기본값이 `false` 이기 때문에 결과값이 Hex 값으로 반환된다. 하지만 `true` 로 지정해주면 Raw 형태로 반환된다. 이 트릭을 이용하면 `'||'1` 과 같은 형태의 값을 만들어 SQL Injection을 수행할 수 있다. 문서에서 참고한 내용을 바탕으로 로그인에 성공하여 문제를 해결할 수 있었다.

## old-56
문제 페이지를 보면 게시물 목록과 검색창이 있다. `admin` 의 게시물은 권한이 없어 볼 수 없었고, `guest` 의 게시물은 내용을 확인할 수 있었다. 하단의 검색창은 무슨 역할을 하는지 몰랐는데, 이것저것 입력해보니 검색한 내용이 게시물에 있으면 해당 게시물을 표시한다는 것을 알게 되었다. 그래서 Blind SQL Injection과 비슷한 느낌으로 풀어보기로 하였다.

우선 검색 결과로 출력되는 게시물이 중복되지 않도록 하기 위해 `admin` 의 게시물이 `FLAG{...}` 와 같은 형식을 가지고 있는지 확인했다. 그리고 파이썬 `requests` 모듈을 활용하여 자동화 코드를 작성하여 플래그를 획득하였다.