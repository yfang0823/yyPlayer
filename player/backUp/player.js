// 自动播放 初始为关闭
autoPlay = false

// 音乐路径数组
musicPaths = []

// 音量
vol = 0.5

// 播放模式
mode = ['none', 'repeat', 'loop']
playMode = mode[0]

// 音乐列表中音乐总数
const numberOfMusiceItems = 5

// 添加路径到数组
var addPaths = function() {
    for (var i = 1; i <= numberOfMusiceItems; i++) {
        var path = `music/${i}.mp3`
        musicPaths.push(path)
    }
}

addPaths()

// 播放按钮
var bindEventPlay = function() {
    var element = e('.play-button')
    bindEvent(element, 'click', function() {
        log('play click')
        var player = e('#id-audio-player')
        player.play()
    })
}

bindEventPlay()

// 暂停按钮
var bindEventPause = function() {
    var element = e('.pause-button')
    bindEvent(element, 'click', function() {
        log('pause click')
        var player = e('#id-audio-player')
        player.pause()
    })
}

bindEventPause()

// 获取下一首歌的路径
var nextItem = function(currentPath) {
    var str = currentPath.slice(-11)
    var result = ''
    var index = arrayIncluded(musicPaths, str)
    if(index != -1) {
        var length = musicPaths.length
        var newIndex = (index + 1) % length
        result = musicPaths[newIndex]
    }else {
        result = musicPaths[0]
    }
    return result
}

// 获取上一首歌的路径
var previousItem = function(currentPath) {
    var str = currentPath.slice(-11)
    var result = ''
    var index = arrayIncluded(musicPaths, str)
    if(index != -1) {
        var length = musicPaths.length
        var newIndex = (index - 1 + length) % length
        result = musicPaths[newIndex]
    }else {
        result = musicPaths[0]
    }
    return result
}

// 下一首按钮
var bindEventNext = function() {
    var element = e('.next-button')
    bindEvent(element, 'click', function() {
        log('next click')
        var player = e('#id-audio-player')
        var curr = player.src
        var newPath = nextItem(curr)
        player.src = newPath
        if(autoPlay == false) {
            autoPlay = true
        }
    })
}

bindEventNext()

// 上一首按钮
var bindEventPrevious = function() {
    var element = e('.previous-button')
    bindEvent(element, 'click', function() {
        log('previous click')
        var player = e('#id-audio-player')
        var curr = player.src
        var newPath = previousItem(curr)
        player.src = newPath
        if(autoPlay == false) {
            autoPlay = true
        }
    })
}

bindEventPrevious()

// 单曲循环按钮
var bindEventRepeat = function() {
    var element = e('.repeat-button')
    bindEvent(element, 'click', function() {
        log('repeat click')
        playMode = mode[1]
    })
}

bindEventRepeat()

// 列表循环按钮
var bindEventLoop = function() {
    var element = e('.loop-button')
    bindEvent(element, 'click', function() {
        log('loop click')
        playMode = mode[2]
    })
}

bindEventLoop()

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

// 定时获取当前播放时间并更新显示
setInterval(function() {
    var player = e('#id-audio-player')
    var curr = e('.current-time')
    var display = convert(player.currentTime)
    curr.innerHTML = display
    // 底部时间显示
    var time = e('.player_music_time')
    var total = convert(player.duration)
    time.innerHTML = `${display} / ${total}`
}, 100)

// 点击歌名切歌
var bindEventChange = function() {
    bindAll('.music-item', 'click', function(event){
        log('change ', event.target.dataset.path)
        var item = event.target.dataset.path
        var player = e('#id-audio-player')
        player.src = `music/${item}`
        if(autoPlay == false) {
            autoPlay = true
        }
    })
}

bindEventChange()

// 检查数组中是否包含元素，返回元素下标
var arrayIncluded = function(array, element) {
    var a = array
    var e = element
    for (var i = 0; i < a.length; i++) {
        if(a[i] === e) {
            return i
        }
    }
    return -1
}

// 播放结束后事件绑定
var playLoop = function() {
    var player = e('#id-audio-player')
    bindEvent(player, 'ended', function(event){
        log('ended', event.target.src)
        var p = event.target
        var curr = p.src
        if(playMode == 'loop') {
            var newPath = nextItem(curr)
            p.src = newPath
        }else if(playMode == 'repeat') {
            p.src = curr
        }
        if(autoPlay == false) {
            autoPlay = true
        }
    })
}

// 绑定歌曲加载完成事件
var setCanPlay = function() {
    var player = e('#id-audio-player')
    bindEvent(player, 'canplay', function(event){
        log('can play')
        var element = event.target
        element.volume = vol
        var time = e('.duration-time')
        var dur = element.duration
        var display = convert(dur)
        time.innerHTML = display
        if(autoPlay == true) {
            element.play()
        }
    })
}

setCanPlay()
playLoop()
