# Super Secret Flag Vault
**Web, 100pts**
> See if you can get into the super secret flag vault! I have used the latest and greatest techniques with php to make sure you cant get past my vault.
>
> https://super-secret-flag-vault.cha.hackpack.club/

--------------------------------------------------------------------------------

`index.php` [파일](index.php)이 제공된다.

```php
<?php
      // this is how I store hashes right?
      $hash = "0e770334890835629000008642775106";
      if(array_key_exists("combination",$_REQUEST) && $_REQUEST["combination"] !== ''){
          //Isn't it great that == works in every language?
          if(array_key_exists("debug", $_REQUEST)){
              echo "<br> ". md5($_REQUEST["combination"]);
          }
          if(md5($_REQUEST["combination"]) == $hash){
              echo "<br> The Flag is flag{...}<br>";
          }
          else{
              echo "<br>Wrong!<br>";
          }

      }
?>
```

`hash` 값이 0e 뒤로는 모두 숫자이고 입력한 값을 MD5로 암호화하기 때문에 Magic Hash 문제인 것을 확인하고 입력창에 `240610708`을 입력해 플래그를 획득하였다.

```
Flag: flag{!5_Ph9_5TronGly_7yPed?}
```