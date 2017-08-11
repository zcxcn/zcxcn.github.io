javascript : showLoading();
if (!document.getElementById('au')) {
	$('body').append('<audio id="au" loop   src="http://5.595818.com/download/ring/000/094/22929e2357c94cc95f37bdabf78a799d.mp3" controls="controls"> Your browser does not support the audio element. </audio>');
}
if (Notification && Notification.permission !== "granted") {
	Notification.requestPermission(function(status) {
		if (Notification.permission !== status) {
			Notification.permission = status;
		}
	});
}

function check() {
	var url = location.href;
	var text = $('.ksorder_box_top_p').text().trim();
	console.log('请求:' + url);
	$.get(url, function(res) {
		var body = $(res);
		if (body.find('html').length > 0) {
			console.log('请求成功');
		}
		var yuyues = $('.ksorder_kyy', body);
		console.log('可预约天数:', yuyues.length);
		var newtable = $('table', body);
		$('table').replaceWith(newtable);
		if (yuyues.length > 0) {
			if ($('#au')[0].paused){
				$('#au')[0].play();
			} 
			
			showNotice('%E5%88%B7%E5%88%B0%E5%8F%B7%E5%95%A6', text);
			flashTitleStart();
		} else {
			if (!$('#au')[0].paused) {
				$('#au')[0].pause();
			}
		}
	});
}
check();
setInterval(function() {
	check();
}, 30000);

function showNotice(title, body) {
	var options = {
		dir: "rtl",
		lang: "zh-CN",
		body: body,
		icon: "http://i.stack.imgur.com/dmHl0.png"
	};
	var n = new Notification(title, options);
}

function showLoading() {
	var loading = $('<div class="loading">正在刷...</div>');
	$('body').append(loading);
	loading.css({'position': 'fixed', 'left': '0', 'top': '0', 'background': '#ccc', 'padding': '10px 20px'});
}

function flashTitleStart() {
	var titleDom = $('title');
	var oldTitle = titleDom.text().trim();
	setTimeout(function() {
		if (titleDom.text().trim() == oldTitle) {
			titleDom.text('***');
		} else {
			titleDom.text(oldTitle);
		}
		setTimeout(arguments.callee, 500);
	}, 500)
}

function closeLoading() {
	$('.loading').remove();
}
