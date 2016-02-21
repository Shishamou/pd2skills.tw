<?php

$contents = file_get_contents('local.json');
$contents = json_decode($contents, 1);

$output = [];
foreach ($contents['tc'] as $key => $text) {
	if (preg_match('/^menu_(\w+)_desc$/', $key, $key_match)
		AND preg_match_all('/\$(\w+);?/', $text, $text_match)
	) {
		$datas = array_flip($text_match[1]);
		$datas = array_map(function($v) {return '__VALUE__';}, $datas);
		ksort($datas);
		$output[] = [
			"name" => $key_match[1],
			"datas" => $datas
		];
	}
}

echo json_encode($output, JSON_PRETTY_PRINT);