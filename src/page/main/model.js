/**
 * @file:    页面-Model
 * @author:  lzt(lztlovely@126.com)
 * @depend:  page/main/model
 * @date:    2014/11/17
 */
define(['url'], function (Url) {

    return Backbone.Model.extend({

        /**
         * 构造函数
         *
         * @constructor
         */
        initialize: function () {},
        /**
         * 加载公司列表
         * @public
         */
        loadCompanyList: function () {
            var me = this;
            $.ajax({
                url: Url.loadCompanyList(),
                type: 'GET',
                success: function (response) {
//                    if (response.status === 0) {
//                        alert('main');
//                    }
                    me.set({ 'companyList': response.result });
                }
            });
        },
        /**
         * 加载个人兴趣列表
         * @public
         */
        loadPersonalInterestList: function () {
            var me = this;
            $.ajax({
                url: Url.loadPersonalInterestList(),
                type: 'GET',
                success: function (response) {
//                    if (response.status === 0) {
//                        alert('main');
//                    }
                    me.set({ 'personalInterestList': response });
                }
            });
        }
    });
});