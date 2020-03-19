# Git Good
**Web, 70pts**
> Did you know that angstrom has a git repo for all the challenges? I noticed that clam committed a very work in progress challenge so I thought it was worth sharing.

----------------------------------------

문제 이름과 설명을 보니 Git Repository를 확인해야 할 것으로 보였다. 문제 페이지의 `.git` 디렉토리에 접근을 시도했지만 불가능했다. 그래서 [GitTools](https://github.com/internetwache/GitTools)의 [gitdumper.sh](gitdumper.sh) 스크립트를 이용하여 `.git` 디렉토리를 다운로드하였다.

일단 `.git/logs/HEAD` 파일에서 커밋 로그를 확인하였다.

```sh
arachnex@NT900X3G:~/CTF/2020/angstromCTF/Git Good$ cat .git/logs/HEAD
0000000000000000000000000000000000000000 6b3c94c0b90a897f246f0f32dec3f5fd3e40abb5 aplet123 <jasonqan2004@gmail.com> 1583598444 +0000	commit (initial): haha I lied this is the actual initial commit
6b3c94c0b90a897f246f0f32dec3f5fd3e40abb5 e975d678f209da09fff763cd297a6ed8dd77bb35 aplet123 <jasonqan2004@gmail.com> 1583598464 +0000	commit: Initial commit
```

그리고 `git cat-file -p` 명령어를 사용하여 맨 처음으로 커밋된 내용을 확인하였다.

```sh
arachnex@NT900X3G:~/CTF/2020/angstromCTF/Git Good$ git cat-file -p 6b3c94c0b90a897f246f0f32dec3f5fd3e40abb5
tree b630430d9d393a6b143af2839fd24ac2118dba79
author aplet123 <noneof@your.business> 1583598444 +0000
committer aplet123 <jasonqan2004@gmail.com> 1583598444 +0000

haha I lied this is the actual initial commit
```

같은 명령어를 사용하여 트리를 확인하였다.

```sh
arachnex@NT900X3G:~/CTF/2020/angstromCTF/Git Good$ git cat-file -p b630430d9d393a6b143af2839fd24ac2118dba79
100644 blob c2658d7d1b31848c3b71960543cb0368e56cd4c7	.gitignore
100644 blob 638887a54973265c428cd51ce6dfd48f196d91c4	index.html
100644 blob 49b319c37dc674bca682cab0f2506473dda6bd9a	index.js
100644 blob 789fa5caf452f5f6f25bfa9b1c0ab1d593dce1b3	package-lock.json
100644 blob 8f08af35205d0ba80e94b4f4306311039d62e138	package.json
100644 blob 0f52598006f9cdb21db2f4c8d44d70535630289b	thisistheflag.txt
```

플래그로 예상되는 `thisistheflag.txt` 파일을 확인해보니 플래그가 있었다.

```sh
arachnex@NT900X3G:~/CTF/2020/angstromCTF/Git Good$ git cat-file -p 0f52598006f9cdb21db2f4c8d44d70535630289b
actf{b3_car3ful_wh4t_y0u_s3rve_wi7h}

btw this isn't the actual git server
```

```
actf{b3_car3ful_wh4t_y0u_s3rve_wi7h}
```