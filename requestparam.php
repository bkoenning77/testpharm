<?php
	$hn = 'localhost';
	$db = 'drugdb';
	$un = 'drugadm';
	$pw = 'Amlodipine2!';

	if (isset($_POST['url'])) {
		$input = $_POST['url'];
		$conn = new mysqli($hn, $un, $pw, $db);

		if ($conn->connect_error) die('Fatal error');

		$query = "SELECT * FROM druglabelers WHERE labeler LIKE '%". $input . "%'";

		$result = $conn->query($query);

		$rows = $result->num_rows;

	//print($rows);
	//print("\n");
		$string = "";

		for ($j = 0; $j < $rows; $j++) {
			$row = $result->fetch_array(MYSQLI_ASSOC);
			$string .= $row['labeler_code'];
			$string .= "\n";
		//print($row['labeler_code']);
		//print("\t");
		//	print($row['labeler']);
		//	print("\n");
		}

		$result->close();

		$conn->close();

		echo $string;
	}

?>