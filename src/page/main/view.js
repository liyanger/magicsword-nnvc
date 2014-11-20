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
                'click #test': 'test',
                'click .j-personal-icon': 'showPersonalMsg'
            },
            showPersonalMsg: function (event) {
                $('.j-personal-msg').show();
            },
            /**
             * 构造函数
             * @param {$HTMLElement} option.el view的顶层DOM：
             * @param {string} option.id
             * @constructor
             */
            initialize: function () {
                this.model = new Model();

                this.listenTo(
                    this.model,
                    'change:companyList',
                    function (model, data) {
                        $('.j-tbody').html(CompanyListTemplate.render(data));
                        $(".j-agination").pagination(50, {
                            prev_text: '上一页',
                            next_text: '下一页',
                            num_edge_entries: 1, //边缘页数
                            num_display_entries: 4, //主体页数
                            callback: function () {
                                alert();
                            },
                            items_per_page:1 //每页显示1项
                        });
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
                this.bindEvent();
            },

            bindEvent: function () {
                $(document).mousedown(function (e) {
                    // 如果点击的是个人信息下拉框里面的内容，就不隐藏下拉框
                    if (!$.contains($('.j-personal-box')[0], e.target)) {
                        $('.j-personal-msg').hide();
                    }
                });
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