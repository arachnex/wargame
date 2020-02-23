<?php
    $header = json_encode(array(
        'alg' => 'sha256',
        'typ' => 'JWT'
    ));
    $payload = json_encode(array(
        'admin' => true,
        'iat' => time(),
    ));
    $sig = hash('sha256', $header.$payload);
    $result = base64_encode($header.'.'.$payload.'.'.$sig);

    echo $result;
?>