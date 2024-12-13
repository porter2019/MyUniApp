// 普通用户
let basic = [{

		"pagePath": "/pages/index/index",
		"text": "首页",
		"name": "home",
		"iconPath": "/static/tabbar/home.png",
		"selectedIconPath": "/static/tabbar/home-selected.png",
		"badge": 0,
		"dot": false
	},
	{

		"pagePath": "/pages/mine/mine",
		"text": "我的",
		"name": "mine",
		"iconPath": "/static/tabbar/user.png",
		"selectedIconPath": "/static/tabbar/user-selected.png",
		"badge": 0,
		"dot": false
	}
]
// 管理员用户
let admin = [{

		"pagePath": "/pages/index/index",
		"text": "首页",
		"name": "home", //每一个页面引用<tab-bar name="admin"></tab-bar>时传入，表示高亮显示哪个bar
		"iconPath": "/static/tabbar/home.png",
		"selectedIconPath": "/static/tabbar/home-selected.png",
		"badge": 0,
		"dot": false
	},
	{

		"pagePath": "/pages/sys/sys",
		"text": "admin",
		"name": "admin",
		"iconPath": "/static/tabbar/user.png",
		"selectedIconPath": "/static/tabbar/user-selected.png",
		"badge": 0,
		"dot": false
	},
	{

		"pagePath": "/pages/mine/mine",
		"text": "我的",
		"name": "mine",
		"iconPath": "/static/tabbar/user.png",
		"selectedIconPath": "/static/tabbar/user-selected.png",
		"badge": 0,
		"dot": false
	}
]
export default {
	basic,
	admin
}