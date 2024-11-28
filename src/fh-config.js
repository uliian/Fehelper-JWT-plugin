{
    "jwt-decode": {
        "name": "JWT解析",
        "tips": "JWT解析工具",
        "noPage": false,
        "contentScript": false,
        "contentScriptCss": false,
        "menuConfig": [
            {
                "icon": "Ⓙ",
                "text": "jwt-decode",
                "onClick": function (info, tab) {                    
                    chrome.DynamicToolRunner({
                        query: "tool=jwt-decode"
                    });
                }
            }
        ],
        "updateUrl": null
    }
}