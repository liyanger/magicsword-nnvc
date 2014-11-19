/**
 * @file:    页面-View
 * @author:  lzt(lztlovely@126.com)
 * @depend:  page/main/model
 * @date:    2014/11/17
 */
define(
    [
        'constant',
        'page/main/model',
        'page/main/company-list-template',
        'page/main/personal-info-template',
        'page/main/interest-list-template'
    ],
    function (
        Constant,
        Model,
        CompanyListTemplate,
        PersonalInfoTemplate,
        InterestListTemplate
    ) {

        return Backbone.View.extend({
            events: {
                'click #test': 'test'
            },

            /**
             * 构造函数
             * @param {$HTMLElement} option.el view的顶层DOM：
             * @param {string} option.id
             * @constructor
             */
            initialize: function () {
                var me = this;
                this.model = new Model();

                this.listenTo(
                    this.model,
                    'change:companyList',
                    function (model, data) {
                        $('.j-tbody').html(CompanyListTemplate.render(data));
                    }
                );
                this.listenTo(
                    this.model,
                    'change:personalInterestList',
                    function (model, data) {
                       $('.j-personal-info').html(PersonalInfoTemplate.render(data));
                       $('.j-interestLabel').html(InterestListTemplate.render(data.weighted_tags));
                    }
                );
                this.model.loadCompanyList();
                this.model.loadPersonalInterestList();
            },
            /**
             * test
             *
             * @param {event} event 下拉框值改变的事件
             * @public
             */
            test: function (event) {
                alert('测试');
            },
            /**
             * 销毁当前view
             *
             * @public
             */
            destroy: function () {
                // 销毁 model
                this.model.clear({ silent: true });
                // 停止监听model事件
                this.stopListening();
                // 解绑jq事件
                this.$el.unbind().empty();
            }
        });
    });