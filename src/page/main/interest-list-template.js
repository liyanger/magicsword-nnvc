define(['template'], function (template) {
    function anonymous($data,$filename) {
        'use strict';
        $data=$data||{};
        var $utils=template.utils,$helpers=$utils.$helpers,$each=$utils.$each,$item=$data.$item,index=$data.index,$escape=$utils.$escape,$out='';$each($data,function($item,index){
        $out+='\r\n    <li class="level-';
        $out+=$escape($item);
        $out+=' j-level-label" level="';
        $out+=$escape($item);
        $out+='">\r\n        <a href="#">';
        $out+=$escape(index);
        $out+='</a>\r\n        <div class="interest2 hide">\r\n            <a href="#"><img src="../css/images/icon1.jpg" /></a>\r\n            <a href="#"><img src="../css/images/icon2.jpg" /></a>\r\n            <a href="#"><img src="../css/images/icon3.jpg" /></a>\r\n        </div>\r\n    </li>\r\n';
        });
        return $out;
    }
    return { render: anonymous };
});