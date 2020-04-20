# CSEC Invasion
**Web, 100pts**
> Oh no! It looks like UMD CSEC's website has been invaded by Aliens! Can you help us fend them off?
>
> Author: t0pc4r

--------------------------------------------------------------------------------

[UMD CSEC](https://csec.umd.edu/) 웹사이트에 들어가서 일단 페이지 소스 코드에 플래그가 숨어있는지 확인했다. 그렇게 `noscript` 태그 부분에서 플래그를 발견하였다.

```
Flag: UMDCTF-{@l13ns_@r3_b3tt3r_th@n_hum@ns}
```


# CSEC Invasion - 2
**Web, 100pts**
> Good job fending off the aliens on UMD CSEC's website, but it looks like some robots have started to invade as well.
>
> Good luck.
>
> Author: t0pc4r

--------------------------------------------------------------------------------

문제 설명에 로봇에 대한 이야기가 나와서 `robots.txt` 파일을 확인해보니 플래그를 획득할 수 있었다.

```
Flag: UMDCTF-{d0m0_@r1g@t0_mr_r0b0t0}
```


# CSEC Invasion - 3
**Web, 200pts**
> Those robots were tough, but are you any match for the monsters that are looking to mash their way through UMD CSEC's website.
>
> Author: t0pc4r

--------------------------------------------------------------------------------

해당 페이지에서 공략할만한 것이 파일 업로드 부분밖에 보이지 않았다. 이런저런 시도를 해봤지만 별다른 기능을 하지 않는 것 같았다. 그러다 우연히 `manifest.json` 파일을 보게 되었는데 그곳에 플래그가 있었다. `React`에 대한 무지 때문에 헤맸다는 생각이 든다.

```
Flag: UMDCTF-{w3_d1d_th3_m@th}
```