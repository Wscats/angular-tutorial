<?php
	$_GET['name'];
	$_GET['password'];
	if($_GET['name']&&$_GET['password']){
		echo json_encode(array('token'=>'abcdefghijk','userId'=>'1',"xss"=>"/><script>alert('123')</script><img src="));
	}else{
		echo "註冊失敗";
	}
?>