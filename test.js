//用户信息
var userRegister = require('./model/userRegister');

//注册一个用户
// userRegister.register('2', '1111', "测试", '12345', '1', function(err, data) {
//     console.log(err, data);
// });



function dg(p, o) {
    for (var i = 0; i < o.length; i++) {
        var t = o[i];
        if (t.menuKey.length == p.menuKey.length + 2 && t.menuKey.indexOf(p.menuKey) > -1) {
            p.menus.push(t);
            dg(t, o);
        }
    }
}


var menus = [
    { "id": 1, "parentId": 0, "menuKey": 'main', "menuName": "tree", "url": "#", "icon": "icon-Management" },
    { "id": 2, "parentId": 1, "menuKey": 'logs', "menuName": "日志信息", "url": "/logsList.go", "icon": "icon-Management" },
    { "id": 3, "parentId": 1, "menuKey": 'menuManager', "menuName": "菜单管理", "url": "/menuManager.go", "icon": "icon-Management" },
    { "id": 4, "parentId": 2, "menuKey": 'blackList', "menuName": "黑名单", "url": "#", "icon": "icon-Management" },
    { "id": 5, "parentId": 2, "menuKey": 'sysConfig', "menuName": "系统设置", "url": "/sysConfig.go", "icon": "icon-Management" },
    { "id": 6, "parentId": 3, "menuKey": 'accountInfo', "menuName": "账户信息", "url": "/accountInfo.go", "icon": "icon-Management" },
    { "id": 7, "parentId": 3, "menuKey": 'userManager', "menuName": "用户管理", "url": "/userManager.go", "icon": "icon-Management" },
    { "id": 8, "parentId": 3, "menuKey": 'logse', "menuName": "日志信息2", "url": "/logsList.go", "icon": "icon-Management" },
    { "id": 9, "parentId": 4, "menuKey": 'menuManager2', "menuName": "菜单管理2", "url": "/menuManager.go", "icon": "icon-Management" }
];


var usermenus = [
    { "id": 1, "parentId": 0, "menuKey": 'main', "menuName": "tree", "url": "#", "icon": "icon-Management" },
    { "id": 2, "parentId": 1, "menuKey": 'logs', "menuName": "日志信息", "url": "/logsList.go", "icon": "icon-Management" }
];

var treeobj = require('./library/tree');
var tree = treeobj.getAuthorityTree(menus, 0, usermenus);
console.log("-", JSON.stringify(tree));