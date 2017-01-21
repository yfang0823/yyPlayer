var bar = e('.play-control')
var player = e('#id-audio-player')
bar.addEventListener('click', function(event){
    log('click this ', this)
    const e = event || window.event;
    var barWidth = bar.clientWidth
    var left = e.clientX
    // log('bar click', barWidth, left)
    var d = Math.floor(left - barWidth / 2)
    // log('d', d)
    var percent = d / barWidth
    if(percent < 0) {
        percent = 0
    }else if(percent > 1) {
        percent = 1
    }
    player.currentTime = percent * player.duration;
});

setInterval(function(){
    var playedTime = player.currentTime
    var fullTime = player.duration
    var percent = playedTime / fullTime
    var played = e('.played')
    played.style.width = percent * 100 + '%'
}, 100)

const thumbMove = function(event){
    log('thumbMove', event)
    const ele = event || window.event;
    var barWidth = bar.clientWidth
    var left = ele.clientX
    // log('bar click', barWidth, left)
    var d = Math.floor(left - barWidth / 2)
    // log('d', d)
    var percent = d / barWidth
    if(percent < 0) {
        percent = 0
    }else if(percent > 1) {
        percent = 1
    }
    var played = e('.played')
    played.style.width = percent * 100 + '%'
    player.currentTime = percent * player.duration;
    // player.pause()
};
//
const thumbUp = function(event){
    log('thumbUp', event)
    document.removeEventListener('mouseup', thumbUp);
    document.removeEventListener('mousemove', thumbMove);
    // if (isNaN(this.audio.duration)) {
    //     this.updateBar('played', 0, 'width');
    // }
    // else {
    //     this.audio.currentTime = parseFloat(bar.playedBar.style.width) / 100 * this.audio.duration;
    //     this.playedTime = setInterval(() => {
    //         this.updateBar('played', this.audio.currentTime / this.audio.duration, 'width');
    //         if (this.option.showlrc) {
    //             this.updateLrc();
    //         }
    //         this.element.getElementsByClassName('aplayer-ptime')[0].innerHTML = this.secondToTime(this.audio.currentTime);
    //         this.trigger('playing');
    //     }, 100);
    // }
    // player.play()
};

var thumb = e('.thumb')
thumb.addEventListener('mousedown', function(event){
    log('thumb click', event)
    // barWidth = bar.barWrap.clientWidth;
    // clearInterval(this.playedTime);
    document.addEventListener('mousemove', thumbMove);
    document.addEventListener('mouseup', thumbUp);
});
