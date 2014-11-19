require.config({
    baseUrl: '../src',  //本地模拟为src，线上版问asset
    paths: {
        'underscore': '../dep/underscore-1.6.0.min',
        'jquery': '../dep/jquery-1.11.1.min',
        'ajax': 'common/ms.ajax',
        'backbone': '../dep/backbone-1.1.2',
        'template': '../dep/template-3.0.0.min',
        'url': 'core/url',
        'constant': 'core/constant'
    },
    shim: {
        'backbone': {
            deps: [
                'underscore',
                'jquery',
                'ajax',
                'template'
            ]
        },
        'ajax': {
            deps: [
                'jquery'
            ]
        }
    }
});
