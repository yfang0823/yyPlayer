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

var player = $('audio')[0]
var playerBar = $('#id-player-slider')
var voiceBar = $('#id-voice-slider')

playerBar.on('input', function(event){
    player.currentTime = playerBar.val()
})

voiceBar.on('input', function(event){
    player.volume = voiceBar.val()
})


var init = function() {
    var max = player.duration
    playerBar.attr('max', max)
    playerBar.val(player.currentTime)
}

bindEvent(player, 'canplay', init)

var showTime = function() {
    var curString = convert(player.currentTime)
    var durString = convert(player.duration)
    var display = `${curString} / ${durString}`
    $('.player-time-show').text(display)
}

setInterval(function(){
    playerBar.val(player.currentTime)
    voiceBar.val(player.volume)
    showTime()
}, 100)
