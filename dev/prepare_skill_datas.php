<?php
/**
 * 分析 localization 翻譯中的技能變數並生成技能datas
 */

if (PHP_SAPI !== 'cli') {
	die('請以 Command line 運行');
}

try {
	$loadpath = (isset($argv[1]))? $argv[1] : '../datas/localization/datas/tc';
	$savepath = (isset($argv[2]))? $argv[2] : '';
	$loadpath = __DIR__ . '/' . $loadpath;
	$savepath = __DIR__ . '/' . $savepath;

	$trees = [
		'mastermind',
		'enforcer',
		'technician',
		'ghost',
		'hoxton_pack'
	];

	$local = loadLocal($trees, $loadpath);
	prepareSkillDatas($trees, $local, $savepath);

} catch (Exception $e) {
	echo $e;
}


// =============================================================================
// = 處理技能樹
// =============================================================================


/**
 * 載入語系檔
 */
function loadLocal($trees, $loadpath) {
	$local = [];
	foreach ($trees as $treeName) {
		$local = array_merge($local, loadFromJson("{$loadpath}/skills_new_{$treeName}.json"));
	}

	return $local;
}

function loadFromJson($filename, $toArray = true) {
	return json_decode(file_get_contents($filename), $toArray);
}

/**
 * 處理技能樹
 */
function prepareSkillDatas($trees, $local, $savepath) {
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

			$subtrees = array($subtree);
			saveToJson("{$savepath}/{$index}_{$subtreeName}.json", compact('subtrees', 'skills'));

			array_push($tree['subtrees'], $subtreeName);
		}

		$trees = array($tree);
		saveToJson("{$savepath}/{$index}_{$treeName}.json", compact('trees'));
	}
}

function fetchLocalValue($local) {
	if (preg_match_all('/\$(\w+);?/', $local, $matches)) {
		$result = array_diff($matches[1], ['basic', 'pro']);
		return array_combine($result, $result);
	}
}

function saveToJson($filename, $content, $pretty = true) {
	$content = ($pretty)
		? json_encode($content, JSON_PRETTY_PRINT)
		: json_encode($content);

	file_put_contents($filename, $content);
}
