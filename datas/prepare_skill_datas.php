<?php

$trees = [
	'mastermind',
	'enforcer',
	'technician',
	'ghost'
];

// 載入語系檔
$local = [];
foreach ($trees as $treeName) {
	$local = array_merge($local, loadFromJson("skills_new_{$treeName}.json"));
}

// 處理技能樹
foreach ($trees as $index => $treeName) {
	$index += 1;
	$tree = [
		"name" => $treeName,
		"subtrees" => []
	];

	// 處理子技能樹 1~3
	foreach (range(1, 3) as $subtreeName) {
		$subtreeName = "{$treeName}_{$subtreeName}";
		$subtree = [
			"name" => $subtreeName,
			"skills" => []
		];

		// 處理技能 1~6
		$skills = [];
		foreach (range(1, 6) as $skillName) {
			$skillName = "{$subtreeName}_{$skillName}";
			$skill = [
		        "name" => $skillName,
				"icon" => "unknown"
			];

			$localText = $local["menu_{$skillName}_desc"];
			if (preg_match_all('/\$(\w+);?/', $localText, $matches)) {
				$datas = array_diff($matches[1], ['basic', 'pro']);

				if ($datas) {
					$skill['datas'] = array_combine($datas, $datas);
				}
			}

			array_push($skills, $skill);
			array_push($subtree['skills'], $skillName);
		}

		$content = [
			'subtrees' => [ $subtree ],
			'skills' => $skills
		];
		saveToJson("datas/{$index}_{$subtreeName}.json", $content);

		array_push($tree['subtrees'], $subtreeName);
	}

	$content = [
		'trees' => [ $tree ]
	];
	saveToJson("datas/{$index}_{$treeName}.json", $content);
}


function loadFromJson($filename, $toArray = true) {
	return json_decode(file_get_contents($filename), $toArray);
}

function saveToJson($filename, $content, $pretty = true) {
	$content = ($pretty)
		? json_encode($content, JSON_PRETTY_PRINT)
		: json_encode($content);

	file_put_contents($filename, $content);
}

function fetchLocalValue($local) {
	if (preg_match_all('/\$(\w+);?/', $local, $matches)) {
		$result = array_diff($matches[1], ['basic', 'pro']);
		return array_combine($result, $result);
	}
}
