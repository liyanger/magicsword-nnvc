define(['template'], function (template) {
    function anonymous($data,$filename) {
        'use strict';
        $data=$data||{};
        var $utils=template.utils,$helpers=$utils.$helpers,$escape=$utils.$escape,$each=$utils.$each,$invround=$data.$invround,index=$data.index,$out='';$out+='<dl class="indexPic">\r\n    <dt><img src="../css/images/personalPic.jpg" /></dt>\r\n    <dd>\r\n        <strong>';
        $out+=$escape($data.name);
        $out+='</strong>\r\n    </dd>\r\n</dl>\r\n<h3 class="introduction"><strong>教育</strong></h3>\r\n<p class="introduction1">河南工业大学,食品科学与工程食品工程</p>\r\n<h3 class="introduction"><strong>简介</strong></h3>\r\n<p class="introduction1">';
        $out+=$escape($data.brief);
        $out+='</p>\r\n<h3 class="introduction"><strong>工作</strong></h3>\r\n<p class="introduction1">';
        $out+=$escape($data.pitch);
        $out+='</p>\r\n<h3 class="introduction"><strong>所在地</strong></h3>\r\n<p class="introduction1">';
        $out+=$escape($data.location);
        $out+='</p>\r\n<h3 class="introduction"><strong>投资阶段</strong></h3>\r\n<p class="introduction1">\r\n    ';
        $each($data.invest_round,function($invround,index){
        $out+=' ';
        $out+=$escape($invround);
        $out+='\r\n    ';
        });
        $out+='\r\n</p>\r\n<h3 class="introduction"><strong>投资领域</strong></h3>\r\n<div class="introduction2">\r\n    <span>移动游戏</span>\r\n    <span>电子商务</span>\r\n    <span>移动APP</span>\r\n    <span>互联网广告</span>\r\n    <span>移动游戏</span>\r\n    <span>电子商务</span>\r\n    <span>移动APP</span>\r\n    <span>互联网广告</span>\r\n    <span>移动游戏</span>\r\n    <span>电子商务</span>\r\n    <span>移动APP</span>\r\n    <span>互联网广告</span>\r\n</div>';
        return $out;
    }
    return { render: anonymous };
});