javascript : showLoading();
if (!document.getElementById('au')) {
  document.body.insertAdjacentHTML('beforeEnd','<audio id="au" loop preload="metadata" src="http://zcxcn.github.io/guahao/di.mp3"></audio>');
}
if (Notification && Notification.permission !== "granted") {
	Notification.requestPermission(function(status) {
		if (Notification.permission !== status) {
			Notification.permission = status;
		}
	});
}
search()

async  function search(){

let [a,b,hosCode,firstDeptCode,secondDeptCode,c]=location.pathname.split('/')
const body={hosCode,firstDeptCode,secondDeptCode,week:1}
const url="http://www.114yygh.com/web/v2/product/list?_time="+Date.now();
const headers={"credentials":"include","headers":{"accept":"application/json, text/plain, */*","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7,zh-TW;q=0.6","cache-control":"no-cache","content-type":"application/json;charset=UTF-8","pragma":"no-cache"},"referrer":"http://www.114yygh.com/hospital/133/0/200001345/source","referrerPolicy":"no-referrer-when-downgrade"}

const  searchWeek=async (week)=>{
return fetch(url,
{...headers,
"body":
JSON.stringify({...body,week:week})
,"method":"POST","mode":"cors"})
.then((res)=>{
return res.json()
})
}

const res1= await searchWeek(1)
const res2= await searchWeek(2)
const result=res1.data.calendars.concat(res2.data.calendars)

const availables=result.filter(item=>{
return item.status!=='NO_INVENTORY'
})
if(availables.length>0){
  // alert(`有${availables.length}天可约`);
  const au=document.getElementById('au')
  if (au.paused){
    au.play();
  }

  showNotice('%E5%88%B7%E5%88%B0%E5%8F%B7%E5%95%A6',`有${availables.length}天可约`);
  flashTitleStart();
}else{
  console.log(`有0天可约`)
  const au=document.getElementById('au')
  if (!au.paused) {
    au.pause();
  }
}


}

setInterval(function() {
	search();
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
