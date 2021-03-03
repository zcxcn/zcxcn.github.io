getGHScript();
function getGHScript() {
	var script = document.createElement('script');
	script.src = 'http://zcxcn.github.io/guahao/mainv2.js?'+Date.now();
	document.head.appendChild(script);
}
