<?php
    $ch = curl_init();
    $url = 'http://apis.baidu.com/jidichong/school_search/school_search?name=%E6%B8%85%E5%8D%8E%E5%A4%A7%E5%AD%A6&npage=1';
    $header = array(
        'apikey: 0aea38d1a7c4443f2f00adc86c4c3e72',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);
    //var_dump(json_decode($res));
	echo $res;
?>