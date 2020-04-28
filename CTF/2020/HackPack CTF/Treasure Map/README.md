# Treasure Map
**Web, 100pts**
> Hmm, do pirates really think they can hide a treasure without us knowing? Find the treasure and prove they are wrong. Check here: https://treasure-map.cha.hackpack.club/

--------------------------------------------------------------------------------

![Main](main.png)

문제를 처음 봤을 때 1만 개의 링크가 있길래 이 중에 단 하나만 정상적인 링크일 것이라고 생각해서 스크립트를 작성해 전부 요청을 보내봤는데 모두 존재하지 않는 링크였다. 그 다음에 `robots.txt`를 확인해보니 `treasuremap.xml` 파일이 있다는 것을 알았다.

![XML](xml.png)

어떤 HTML 파일이 있어서 확인해보니 플래그를 획득할 수 있었다.

```
Flag: flag{tr3asur3_hunt1ng_fUn}
```