<?php

$contents = file_get_contents($argv[1]);
$contents = json_decode($contents, 1);

$output = [];
foreach ($contents as $key => $text) {
	if (preg_match_all('/\$(\w+);?/', $text, $text_match)) {
		$datas = array_flip($text_match[1]);
		$datas = array_map(function($v) {return '__VALUE__';}, $datas);
		ksort($datas);
		$output[] = [
			"name" => $key,
			"datas" => $datas
		];
	}
}

echo json_encode($output, JSON_PRETTY_PRINT);
