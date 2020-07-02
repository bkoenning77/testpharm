<?php
	$hn = 'localhost';
	$db = 'drugdb';
	$un = 'drugadm';
	$pw = 'Amlodipine2!';

	//if (isset($_POST['url'])) {
	//	$input = $_POST['url'];
	$conn = new mysqli($hn, $un, $pw, $db);

	if ($conn->connect_error) die('Fatal error');

	$query = "SELECT labeler_code, labeler FROM druglabelers";

	$result = $conn->query($query);

	$rows = $result->num_rows;

	//print($rows);
	//print("\n");
	$array = array();

	for ($j = 0; $j < $rows; $j++) {
		$row = $result->fetch_array(MYSQLI_ASSOC);
		$array[$row['labeler_code']] = $row['labeler'];
		//$string .= $row['labeler_code'];
		//$string .= "\n";
		//print($row['labeler_code']);
		//print("\t");
		//	print($row['labeler']);
		//	print("\n");
	}

	$result->close();

	$conn->close();
	
	echo json_encode($array);
	//}
?>
