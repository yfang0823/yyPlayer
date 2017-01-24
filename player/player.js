// 播放时间转换为时分秒 hh:mm:ss
const convert = function(string) {
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

// 播放器，进度条，音量条
const player = $('audio')[0]
const playerBar = $('#id-player-slider')
const voiceBar = $('#id-voice-slider')

playerBar.on('input', function(event){
    player.currentTime = playerBar.val()
})

voiceBar.on('input', function(event){
    player.volume = voiceBar.val()
})

// 载入完成时初始化
const init = function() {
    var max = player.duration
    playerBar.attr('max', max)
    playerBar.val(player.currentTime)
    bindControls()
}

bindEvent(player, 'canplay', init)


// 显示音乐时间信息
const showTime = function() {
    var curString = convert(player.currentTime)
    var durString = convert(player.duration)
    var display = `${curString} / ${durString}`
    $('.player-time-show').text(display)
}

// 定时更新进度条，音量条，时间信息
setInterval(function(){
    playerBar.val(player.currentTime)
    voiceBar.val(player.volume)
    showTime()
}, 100)

const triggerPlay = function() {
    player.play()
}

const triggerPause = function() {
    player.pause()
}

// play图片绑定播放事件
var bindControls = function() {
    bindPlay()
    bindPrev()
    bindNext()
}

var bindPlay = function() {
    $('.controls-play').on('click', function(event){
      log('play click', this)
      var className = 'control-stop'
      toggleClass(this, className)
      if(this.classList.contains(className)) {
          triggerPause()
      }else {
          triggerPlay()
      }
    })
}

var bindPrev = function() {
    $('.controls-prev').on('click', function(event){
      log('prev click', this)
    })
}

var bindNext = function() {
    $('.controls-next').on('click', function(event){
      log('next click', this)
    })
}
