define(function () {
    var ajaxError;
    // 全局ajax设置重载
    $.ajaxSetup({
        cache: false,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        beforeSend: function (XMLHttpRequest) {},
        dataFilter: function (response, dataType) {
            var result;
            if (dataType === 'json' && JSON && JSON.parse) {
                result = JSON.parse(response);

                // 后台返回数据失败
                if (result.status && result.status !== 0) {
                    if (result.statusInfo === '') {
                        result.statusInfo = '后台错误';
                    }
                    ajaxError = {
                        status: result.status,
                        textStatus: result.statusInfo
                    };
                    // 抛出错误为了终止success的执行，以免扩大错误范围
                    this.error(ajaxError, result.statusInfo);
                }
                else {
                    ajaxError = undefined;
                }
            }
            return response;
        },
        // 如果具体调用时配置了 error，会覆盖此error
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var str;
            if (ajaxError === undefined) {
                str = 'status:' + XMLHttpRequest.status + ',' + textStatus;
                alert(str);
            }
            else {
                str = 'status:' + ajaxError.status + ',' + ajaxError.textStatus;
                alert(str);
            }
        }
    });

    //
    var options = {
        mock: false
    };
    var temp = $.ajax;
    var ajax;
    if (options.mock) {
        options.webRoot =  '/magicsword/mock-data';
        ajax = function (paramObject) {
            paramObject.url += '-' + paramObject.type.toLowerCase() + '.json';
            if (paramObject.type == 'PUT' || paramObject.type == 'DELETE') {
                paramObject.type = 'POST';
            }
            temp(paramObject);
        };
    }
    else {
        options.webRoot = '/magicsword';
        ajax = function (p) {
            if (p.type == 'PUT') {
                p.type = 'POST';
            }
            temp(p);
        };
    }
    $.ajax = ajax;
});
