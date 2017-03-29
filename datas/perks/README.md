# Perks
## root
    {
        "perks": [ ... ],
        "decks": [ ... ],
        "tierRequired": [
            200,
            300,
            400,
            ...
        ]
    }

- `perks` : Perk 樹，見 [perks](#perks)。
- `decks` : Deck 技能，見 [decks](#decks)。
- `tierRequired` : Perk 樹階層解鎖需求。

## perks
    {
        "name": 1,
        "decks": [
            "deck1_1",
            "deck1_2",
            "deck1_3",
            ...
        ]
    }

- `name` : Perk 樹名稱。
- `decks` : Deck 列表。對應 `perks.decks.name`。見 [decks](#decks)。

## decks
    {
        "name": "deck1_1",
        "datas": {
            "basic": "10%",
            "aced": "20%"
        }
    }

- `name` : Deck 名稱。
- `datas` : 技能數值，對應`localzation`內文的`##$變數名稱;#`。
