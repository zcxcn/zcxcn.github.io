javascript: showLoading();
if (!document.getElementById('au')) {
  document.body.insertAdjacentHTML('beforeEnd', '<audio id="au" loop="loop" preload="metadata" src="http://zcxcn.github.io/guahao/di.mp3"></audio>');
}
if (Notification && Notification.permission !== "granted") {
  Notification.requestPermission(function (status) {
    if (Notification.permission !== status) {
      Notification.permission = status;
    }
  });
}
async function start() {
  const search = async (option) => {
    return fetch("https://www.114yygh.com/web/product/list?_time=1614753697591", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6",
        "content-type": "application/json;charset=UTF-8",
        "request-source": "PC",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrer": "https://www.114yygh.com/hospital/1/2feb85b952a4dcd6dbf832100f6ef595/200048529/source",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": JSON.stringify(option.body),
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }).then((res) => { return res.json() })
      .then((resData) => { return resData })
  }
  console.log('请求中');
  const [, , hosCode, firstDeptCode, secondDeptCode] = location.pathname.split('/')
  const opt = {
    body: {
      "firstDeptCode": firstDeptCode,
      "secondDeptCode": secondDeptCode,
      "hosCode": hosCode,
      "week": 1
    }
  }
  const res1 = await search(opt);
  const res2 = await search({ ...opt, week: 2 });
  const result = res1.data.calendars.concat(res2.data.calendars);
  result.forEach(item => {
    console.log(`${item.dutyDate},${item.weekDesc},${item.status}`)
  })
  const availables = result.filter(item => {
    return item.status !== 'NO_INVENTORY'
  })
  if (availables.length > 0) {
    // alert(`有${availables.length}天可约`);
    const au = document.getElementById('au')
    if (au.paused) {
      au.play();
    }

    showNotice('%E5%88%B7%E5%88%B0%E5%8F%B7%E5%95%A6', `有${availables.length}天可约`);
    flashTitleStart();
  } else {
    console.log(`有0天可约`)
    const au = document.getElementById('au')
    if (!au.paused) {
      au.pause();
    }
  }

}
start()

setInterval(function() {
	start();
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
	var loading = '<div class="loading">正在刷...</div>'
	document.body.insertAdjacentHTML('afterBegin',loading)
	// loading.css({'position': 'fixed', 'left': '0', 'top': '0', 'background': '#ccc', 'padding': '10px 20px'});
}

function flashTitleStart() {
	var titleDom = document.getElementsByTagName('title')[0];
	var oldTitle = titleDom.innerText;
	setTimeout(function() {
		if (titleDom.innerText == oldTitle) {
			titleDom.innerText='***';
		} else {
			titleDom.innerText=oldTitle;
		}
		setTimeout(arguments.callee, 500);
	}, 500)
}

function closeLoading() {
	$('.loading').remove();
}

