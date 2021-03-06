/*
  1, 绑定播放进度条click事件
  2，绑定音量控制条click事件
  3，
*/
var log = function() {
    console.log.apply(console, arguments)
}
// 播放时间转换为时分秒 hh:mm:ss
var convert = function(string) {
    var number = parseInt(string)
    var ss = number % 60
    if(ss < 10) {
        ss = '0' + ss
    }
    number = Math.floor(number / 60)
    var mm = number % 60
    if(mm < 10) {
        mm = '0' + mm
    }
    number = Math.floor(number / 60)
    var hh = number % 60
    if(hh < 10) {
        hh = '0' + hh
    }
    if(hh == '00') {
        return `${mm}:${ss}`
    }else {
        return `${hh}:${mm}:${ss}`
    }
}

// 定时更新时间 与 播放进度条
setInterval(function(){
    var player = $('audio')[0]
    var duration = player.duration
    var currentTime = player.currentTime
    var d = convert(duration)
    var c = convert(currentTime)
    var play_time = $('.player_music_time')[0]
    play_time.innerHTML = `${c} / ${d}`
    // 计算播放进度比例 改变进度条宽度百分比
    var percent = currentTime / duration * 100 + '%'
    $('#spanplaybar').width(percent)
}, 100)

// 获取元素左端距离边界的距离
function getElementLeft(element) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;
    let elementScrollLeft;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    return actualLeft - elementScrollLeft;
}

// 绑定播放进度条click事件
var bar = $('.player_progress')[0]
bar.addEventListener('click', function(event){
    log('bar click ', this)
    const e = event || window.event;
    var barLeft = getElementLeft(bar)
    var left = e.clientX
    log('bar click', barLeft, left)
    var d = left - barLeft
    var barWidth = $(bar).width()
    // log('d', d)
    var percent = d / barWidth
    if(percent < 0) {
        percent = 0
    }else if(percent > 1) {
        percent = 1
    }
    var player = $('audio')[0]
    player.currentTime = percent * player.duration;
});

// 绑定音量控制条click事件
var voiceBar = $('.player_voice')[0]
voiceBar.addEventListener('click', function(event){
    log('voiceBar click ', this)
    const e = event || window.event;
    var barLeft = getElementLeft(voiceBar)
    var left = e.clientX
    log('bar click', barLeft, left)
    var d = left - barLeft
    var barWidth = $(voiceBar).width()
    var volume = d / barWidth
    var percent = volume * 100 + '%'
    if(percent < 0) {
        percent = 0
    }else if(percent > 1) {
        percent = 1
    }
    var player = $('audio')[0]
    player.volume = volume;
    $('#spanvolumebar').width(percent)
    log('volume changed ', player.volume, percent)
});

// 鼠标拖动滚动条效果
const dotMove = function(event) {
    log('dot moving ', event)
    const e = event || window.event;
    var barLeft = getElementLeft(bar)
    var left = e.clientX
    log('bar click', barLeft, left)
    var d = left - barLeft
    var barWidth = $(bar).width()
    var percent = d / barWidth
    if(percent < 0) {
        percent = 0
    }else if(percent > 1) {
        percent = 1
    }
    var player = $('audio')[0]
    player.currentTime = percent * player.duration;
};

const dotStop = function() {
    log('dot stop')
    $('.player_progress').unbind()
};

var dot = $('.player_progress_dot')
$(dot).mousedown(function(){
    log('dot click')
    var progress = $('.player_progress')
    $(progress).mousemove(dotMove);
    $(progress).mouseup(dotStop);
});
