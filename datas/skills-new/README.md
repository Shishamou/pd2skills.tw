# Skills
## root
    {
        "trees": [ ... ],
        "subtrees": [ ... ],
        "skills": [ ... ],
        "tiersInformation": [ ... ]
    }

- `trees` : 技能樹列表，見 [trees](#trees)。
- `subtrees` : 子技能樹列表，見 [subtrees](#subtrees)。
- `skills` : 技能列表，見 [skills](#skills)。
- `tiersInformation` : 階層資訊，見 [tiersInformation](#tiersInformation)。

## trees
    {
        "name": "mastermind",
        "subtrees": [
            "mastermind_1",
            "mastermind_2",
            "mastermind_3"
        ]
    }

- `name` : 技能樹名稱。
- `subtrees` : 子技能樹，對應`skills.subtrees[].name`。見 [subtrees](#subtrees)。

## subtrees
    {
        "name": "mastermind_1",
        "skills": [
            "mastermind_1_1",
            "mastermind_1_2",
            "mastermind_1_3",
            ...
        ]
    }

- `name` : 子技能樹名稱。
- `skills` : 技能列表，對應`skills.skills[].name`。見 [skills](#skills)。

## skills
    {
        "name": "mastermind_1_1",
        "icon": "combat_medic",
        "datas": {
            "multibasic": "10",
            "multibasic2": "25%",
            "multipro": "30%"
        },
        "required": "joker"
    }

- `name` : 技能名稱。
- `icon` : icon 名稱，對應`icon.icon[].name`。
- `datas` : 技能數值，對應`localzation`內文的`##$變數名稱;#`。
- `required` : 可選。前置技能。

## tiersInformation
    {
        "tier_unlock_require"         : 4,
        "tier_unlock_require_reduced" : 4,
        "skill_point_basic"           : 2,
        "skill_point_ace"             : 4,
        "skill_cost_basic"            : 4500,
        "skill_cost_ace"              : 12500
    }

- `tier_unlock_require` : 階層解鎖需求。
- `tier_unlock_require_reduced` : 階層解鎖需求(惡名減免)。
- `skill_point_basic` : 基礎技能點花費。
- `skill_point_ace` : 王牌技能點花費。
- `skill_cost_basic` : 基礎費用花費。
- `skill_cost_ace` : 王牌費用花費。