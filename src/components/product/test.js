
const test_data = {
  "resourceConfig": {
		"config": {
            "houses": {
                "keys": ["db3f2c69536942ccbf4c3719e04e59d4"],
                "options": [{
                "key": "db3f2c69536942ccbf4c3719e04e59d4",
                "value": "db3f2c69536942ccbf4c3719e04e59d4",
                "children": "中国-北京-望京数据中心1F"
                }]
            },
            "config": {
                "1": {
                "notDefaultRes": true,
                "serverType": {
                    "limit": true,
                    "values": [1, 2],
                    "defaultValue": 1,
                    "userSee": true
                },
                "mem": {
                    "limit": true,
                    "values": ["4-32"],
                    "defaultValue": "4-32",
                    "userSee": true
                },
                "disk": {
                    "limit": true,
                    "values": [2],
                    "defaultValue": 2,
                    "userSee": true
                },
                "raid": {
                    "limit": true,
                    "values": [0, 1],
                    "defaultValue": 0,
                    "userSee": true
                },
                "networkNum": {
                    "limit": true,
                    "values": [3],
                    "defaultValue": "3",
                    "userSee": true
                },
                "minNum": 1
                },
                "2": {
                "notDefaultRes": true,
                "models": {
                    "limit": true,
                    "values": ["ATOM-D525", "E233", "E34-1230v2"],
                    "defaultValue": "ATOM-D525",
                    "userSee": true
                },
                "coreNum": {
                    "limit": true,
                    "values": ["0", "1", "2"],
                    "defaultValue": "0",
                    "userSee": true
                },
                "minNum": 1
                },
                "3": {
                "notDefaultRes": true,
                "memType": {
                    "limit": true,
                    "values": [1, 2],
                    "defaultValue": 1
                },
                "memSize": {
                    "limit": true,
                    "values": ["8", "16", "50"],
                    "defaultValue": "16"
                },
                "minNum": 1
                },
                "4": {
                "notDefaultRes": true,
                "diskShort": {
                    "limit": true,
                    "values": [0, 1],
                    "defaultValue": 0
                },
                "interfaceType": {
                    "limit": true,
                    "values": [0, 1],
                    "defaultValue": 0
                },
                "diskSize": {
                    "limit": true,
                    "values": ["1024"],
                    "defaultValue": "1024"
                },
                "deviceSpec": {
                    "limit": true,
                    "values": [1, 2],
                    "defaultValue": 1
                },
                "useType": {
                    "limit": true,
                    "values": [1, 2],
                    "defaultValue": "1"
                },
                "minNum": 1
                },
                "5": {
                "notDefaultRes": true,
                "minNum": 1
                },
                "6": {
                "notDefaultRes": true,
                "raid_type": {
                    "limit": true,
                    "values": [1, 2],
                    "defaultValue": 1
                },
                "raidCache": {
                    "limit": true,
                    "values": ["111", "16", "22"],
                    "defaultValue": "111"
                },
                "minNum": 1
                }
            }
        }
    },
	"tradingConfig": {
		"tradingMode": 1,
		"chargingMode": 1,
		"operatingCosts": 12,
		"currency": 1,
		"grossProfit": 1
	},
	"productLabelList": [{
		"labelId": "A",
		"labelName": ""
	}],
	"salesObjectList": [{
		"objectId": "big",
		"objectName": ""
	}],
	"salesRegionList": [{
		"areaId": "dl",
		"areaName": ""
	}, {
		"areaId": "hw",
		"areaName": ""
	}],
	"productMaster": {
		"categoryId": "0012095310f347109eacc980cd1ce509",
		"description": "请问",
		"logo": "string",
		"name": "cesh",
		"salesType": 2,
		"salesBegin": "2020-08-27T08:06:39.222Z",
		"salesEnd": "2020-09-28T08:06:39.744Z"
	}
}

export default test_data;