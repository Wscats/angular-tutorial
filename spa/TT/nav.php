<?php
// 指定允许其他域名访问
header('Access-Control-Allow-Origin:*');
    $ch = curl_init();
    $url = 'http://www1.ttplus.cn/publish/app/list//day/2016-08-09.json';
    $header = array(
 		'Host:www1.ttplus.cn',
		'Accept:*/*',
 		'Cookie:SERVERID=270886d04b8d25f40f05bc5de02008ec|1470723814|1470723813',
 		'User-Agent:Tian_IOS/1.4.3 (iPhone; iOS 9.3.3; Scale/3.00)',
 		'Accept-Language:zh-Hans-CN;q=1',
 		'Accept-Encoding:gzip, deflate',
 		'Connection:keep-alive',
    );
    // 添加apikey到header
    curl_setopt($ch, CURLOPT_HTTPHEADER  , $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // 执行HTTP请求
    curl_setopt($ch , CURLOPT_URL , $url);
    $res = curl_exec($ch);

    //var_dump(json_decode($res));
	echo $res
?>