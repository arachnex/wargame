# Miyazaki Trivia
**Web, 50pts**
> Here's a bit of trivia for you vidya game nerds.

--------------------------------------------------------------------------------

```
Find this special file.
```

문제 페이지에 접속하면 위와 같은 내용만 볼 수 있어서 `robots.txt` 파일이 있는지 확인해봤다.

```
VIDEO GAME TRIVIA: What is the adage of Byrgenwerth scholars? MAKE a GET request to this page with a header named 'answer' to submit your answer.
```

설명을 보니 질문에 맞는 답을 `answer` 헤더에 추가하여 GET 요청을 보내면 될 것으로 보였다.

```bash
arachnex@NT900X3G:~$ curl -H 'answer: fear the old blood' http://challenges.auctf.com:30020/robots.txt
Master Willem was right.auctf{f3ar_z_olD3_8l0oD}
```

```
Flag: auctf{f3ar_z_olD3_8l0oD}
```