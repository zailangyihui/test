export default{
	getCookie: function(name) {
		var reg = RegExp(name + '=([^;]+)');
		var arr = document.cookie.match(reg);
		if(arr) {
			return arr[1];
		} else {
			return '';
		}
	},
	setCookie: function(name, value, day) {
		var date = new Date();
		date.setDate(date.getDate() + day);
		document.cookie = name + '=' + value + ';expires=' + date;
	},
	delCookie: function(name) {
		this.setCookie(name, null, -1);
	},
	
}
