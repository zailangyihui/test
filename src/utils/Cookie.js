/*
	cookie操作
 */
const getCookie = (name) => {
	let reg = RegExp(name + '=([^;]+)');
	let arr = document.cookie.match(reg);
	if(arr) {
		return arr[1];
	} else {
		return '';
	}
}

const setCookie = (name, value, day) => {
	let date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = name + '=' + value + ';expires=' + date;
}

const delCookie = (name) => {
	setCookie(name, null, -1);
}

export { getCookie, setCookie, delCookie }