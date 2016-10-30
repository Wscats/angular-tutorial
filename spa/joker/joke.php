<?php
	$url = "http://japi.juhe.cn/joke/content/list.from?key=2341037fb7fe30504eb0bea9a589dfca&page=".$_GET['page']."&pagesize=".$_GET['pagesize']."&sort=asc&time=1418745237";
	//服务器代理 后端
	$data = file_get_contents($url);
	echo $data;
?>