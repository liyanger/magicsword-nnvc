define(['template'], function (template) {
    function anonymous($data,$filename) {
        'use strict';
        $data=$data||{};
        var $utils=template.utils,$helpers=$utils.$helpers,$each=$utils.$each,$tr=$data.$tr,index=$data.index,$escape=$utils.$escape,$tag=$data.$tag,$index=$data.$index,$out='';$each($data,function($tr,index){
        $out+='\r\n<tr>\r\n    <td><a href="/company/';
        $out+=$escape($tr.id);
        $out+='">';
        $out+=$escape($tr.name);
        $out+='</a></td>\r\n    <td>\r\n        ';
        $each($tr.tags,function($tag,$index){
        $out+='\r\n        <span>';
        $out+=$escape($tag);
        $out+='</span>\r\n        ';
        });
        $out+='\r\n    </td>\r\n    <td>\r\n        ';
        if($tr.founders.length > 0 ){
        $out+='\r\n        <a href="/founder/';
        $out+=$escape($tr.founders[0]);
        $out+='">\r\n            ';
        $out+=$escape($tr.founders[0]);
        $out+='\r\n        </a>\r\n        ';
        }else{
        $out+='\r\n        <a href="/founder/未知">\r\n            未知\r\n        </a>\r\n        ';
        }
        $out+='\r\n    </td>\r\n    <td>无</td>\r\n</tr>\r\n';
        });
        return $out;
    }
    return { render: anonymous };
});