<?php
	$_GET['name'];
	$_GET['password'];
	if($_GET['name']=='18680576357'&&$_GET['password']=='aaaaaa'){
		echo json_encode(array('token'=>'abcdefghijk','userId'=>'1',"xss"=>""."&quot;/><script>alert("."123".")</script><img src=&quot;".""));
	}else{
		echo "登陸失敗";
	}
	/*$rawpostdata = file_get_contents("php://input");
	$post = json_decode($rawpostdata, true);*/
	/*echo $post;
	echo $_POST['name'];
	//$_POST['password'];
	if($_POST['name']=='yao'&&$_POST['password']=='123'){
		//echo "登陸成功";
		echo json_encode(array('token'=>'abcdefghijk','userId'=>'1','infomation'=>array()));
		//var_dump(json_decode(array('token'=>'abcdefghijk')));
	}else{
		echo "登陸失敗";
	}*/
?>