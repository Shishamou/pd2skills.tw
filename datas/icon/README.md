# Icon
## root
    {
        "icon": [ ... ]
    }

- `icon` : 見 [icon](#icon)。

## icon
    {
        "src": "res/skills.png",
        "prefix": "skill_",
        "options": {
            "frames": [8, 16]
        },
        "names": [
            "icon_1",
            "icon_2",
            ...
        ]
    }

- `src` : 圖片路徑 (`public` 目錄下相對路徑)。
- `options` : Sprite 裁切選項，細部如下：
  - `frames`: 依行列數量裁切。例如`4*4`的 Sprite，此屬性設置為`"frames": [4, 4]`。 
  - `size`: 依尺寸裁切。例如`128px`，此屬性設置為`"size": [128, 128]` 或 `"size": 128`。
- `prefix` : icon 名稱前綴。
- `names` : icon 名稱。從第一行開始左至右依序排列。
