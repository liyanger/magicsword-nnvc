define(['backbone', 'url'], function (Backbone, Url) {
    var set = function (options) {
        // merge默认配置信息
        var defaultOptions = {
            mock: 'asset',
            webRoot: '/api'
        };
        if (options) {
            $.extend(defaultOptions, options);
        }
        else {
            return;
        }
        var webRoot = {
            asset: '/api',
            mock: '/magicsword-nnvc/mock-data/api'
        };
        defaultOptions.webRoot = webRoot[defaultOptions.mock];

        // 模拟数据与线上数据的处理
        var temp = $.ajax;
        var ajax;
        if (defaultOptions.mock === 'mock') {
            ajax = function (paramObject) {
                paramObject.url += '-' + paramObject.type.toLowerCase() + '.json';
                if (paramObject.type == 'PUT' || paramObject.type == 'DELETE') {
                    paramObject.type = 'POST';
                }
                temp(paramObject);
            };
        }
        else {
            ajax = function (p) {
                if (p.type == 'PUT') {
                    p.type = 'POST';
                }
                temp(p);
            };
        }
        $.ajax = ajax;

        // 全局根路径的设置
        Url.setWebRoot(defaultOptions.webRoot);

        // 对应页面入口
        require(['page'], function (page) {
            if (defaultOptions.pageType) {
                page[defaultOptions.pageType]();
            }
        });
    };

    return {
        set: set
    };
});
