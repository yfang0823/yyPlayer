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

// 图片绑定播放控制事件
var bindPlay = function() {
    $('.controls-play').on('click', function(event){
        log('play click', this)
        togglePlay(this)
    })
}

var togglePlay = function(element) {
    var className = 'controls-stop'
    toggleClass(element, className)
    if(element.classList.contains(className)) {
        triggerPause()
        setImage('play')
    }else {
        triggerPlay()
        setImage('pause')
    }
}

var imgUrl = 'image/'

var setImage = function(imageName) {
    var img = e('.img-play')
    img.src = `${imgUrl}${imageName}.png`
}

var baseUrl = 'music/'
var musicLists = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3']

var bindPrev = function() {
    $('.controls-prev').on('click', function(event){
        log('prev click', this)
        var audio = e('.player-audio')
        var index = audio.dataset.index
        index = parseInt(index)
        var size = musicLists.length
        var newIndex = (index - 1 + size) % size
        log(newIndex)
        audio.dataset.index = newIndex
        var newSrc  = baseUrl + musicLists[newIndex]
        player.src = newSrc
        switchPlay()
    })
}

var bindNext = function() {
    $('.controls-next').on('click', function(event){
        log('next click', this)
        var audio = e('.player-audio')
        var index = audio.dataset.index
        index = parseInt(index)
        var size = musicLists.length
        var newIndex = (index + 1) % size
        log(newIndex)
        audio.dataset.index = newIndex
        var newSrc  = baseUrl + musicLists[newIndex]
        player.src = newSrc
        switchPlay()
    })
}

var switchPlay = function() {
    var className = 'controls-stop'
    var element = $('.controls-play')
    if(!element.hasClass(className)) {
        element.addClass(className)
        setImage('play')
    }
}

var bindControls = function() {
    bindPlay()
    bindPrev()
    bindNext()
}

bindControls()

// 点击volume图标切换音量条显示
$('.volume-control').on('click', function(event){
    $('.voice-bar').toggle()
})
