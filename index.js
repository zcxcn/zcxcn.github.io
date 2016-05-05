function guahao() {
    showLoading();
    if (!document.getElementById('au')) {
        $('body').append('<audio id="au" loop   src="http://www.w3school.com.cn/i/horse.ogg" controls="controls"> Your browser does not support the audio element. </audio>');
    }



    function check() {
            var url = location.href;
        $.get(url, function(res) {
            var body = $(res);
            var yuyues = $('table:eq(2) table .detailtext a:contains("预约")', body);
            var newtable=$('table:eq(2) table:eq(1)',body);
            $('table:eq(2) table:eq(1)').replaceWith(newtable);
            if (yuyues.length > 0) {
                if ($('#au')[0].paused);
                $('#au')[0].play();
            } else {
                if (!$('#au')[0].paused);
                $('#au')[0].pause();
            }
        });

    }

    check();
    setInterval(function() {
        check();
    }, 30000);

    function showLoading() {
        var loading = $('<div class="loading">刷票中。。。</div>');
        $('body').append(loading);
        loading.css({
            'position': 'fixed',
            'left': '0',
            'top': '0',
            'background': '#ccc',
            'padding': '10px 20px',
        });
    }

    function closeLoading() {
        $('.loading').remove()
    }

}
status.innerHTML = '123'
chrome.windows.getCurrent({}, function(win) {
    debugger
    console.log(JSON.stringify(win))
    var div = win.document.createElement('div');
    div.innerHTML = '<script>' + guahao.toString() + '<script>';
    var script = div.firstChild;
    win.document.head.append(script);
})
