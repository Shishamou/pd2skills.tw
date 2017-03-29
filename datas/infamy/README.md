# Infamy
## root
    {
        "infamy": [ ... ],
        "tree": [
            "infamy_1",
            "infamy_2",
            ...
        ]
    }

- `infamy` : 惡名技能，見 [infamy](#infamy)。
- `tree` : 惡名樹表格，從左上依序排列 5*5 共 25 個。

## infamy
    {
        "name": "infamy_1",
        "icon": "icon_1_1",
        "datas": {
            "basic": "10%",
            "aced": "20%"
        },
        "reduce": [
            "mastermind",
            "hoxton_pack"
        ].
        "disable": false
    }

- `name` : 技能名稱。
- `icon` : icon 名稱，對應`icon.icon[].name`。
- `datas` : 技能數值，對應`localzation`內文的`##$變數名稱;#`。
- `reduce` : 減免的技能樹，對應`skills.trees[].name`。
- `disable` : 禁用。