$(function () {
    var ulDom = $('#ulDom');
    var lis = ulDom.children();
    var ulWidth = lis.length * (parseInt(lis.css('width')) + parseInt(lis.css('marginRight')))
    ulDom.css('width', ulWidth)
    var cloneLis = lis.clone();
    ulDom.css('width', ulWidth * 2 + 'px')
    ulDom.append(cloneLis)
    // setInterval(function () {
    //     ulDom.css('left', ulDom.position().left - 1 + 'px')
    //     ulDom.css('left', ulDom.position().left - 1 + 'px');
    //     // -50 -45  -50 -55
    //     if (ulDom.position().left > (0 - ulWidth - 1) && ulDom.position().left < (0 - ulWidth + 1)) {
    //         ulDom.css('left', 0 + 'px')
    //     }
    // }, 30)



    // var header = $('.header')
    // $(window).scroll(function (e) {
    //     console.log($(window).scrollTop())
    //     if ($(window).scrollTop() > 0) {
    //         header.css({
    //             'position': 'fixed',
    //             'top': '0',
    //             'background-color': 'rgba(4, 14, 47, 1)',
    //         })
    //     } else {
    //         header.css({
    //             'position': 'absolute',
    //             'top': '0',
    //             'background-color': 'rgba(4, 14, 47, 0)',
    //         })
    //     }
    // })
})
