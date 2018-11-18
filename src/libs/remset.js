!function(designWidth){
    var clientWidth = document.documentElement.clientWidth;
    var scale = clientWidth /designWidth;
    var w = scale *100;
    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = 'html {font-size:'+w+'px!important}';  /**使用rem作为单位**/

    document.head.appendChild(styleSheet);

    // document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 * 100 + 'px';

}(375);