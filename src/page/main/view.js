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
                'click .j-personal-icon': 'showPersonalMsg',
                'click .j-level-label': 'showLabelLevelBtn',
                'click .j-interest-level-controller .add': 'addLevel',
                'click .j-interest-level-controller .reduce': 'reduceLevel',
                'click .j-interest-level-controller .delete': 'deleteLevel'
            },
            showPersonalMsg: function (event) {
                $('.j-personal-msg').show();
            },
            showLabelLevelBtn: function (event) {
                var $target = $(event.target);
                var tagName = event.target.tagName.toLowerCase();
                if ( tagName === 'a' || tagName === 'li') {
                    if ( tagName === 'a') {
                        $target = $target.parent();
                    }
                    $('.j-interest-level-controller').hide();
                    $target.find('div').show();
                    // 把当前按钮框保存到this
                    this.$levelBtns = $target;
                }
            },
            addLevel: function (event) {
                var $target = $(event.target);
                var $levelEl = $target.parent().parent();
                var curLevel = $levelEl.attr('level');
                if (curLevel >= 5) {
                    return;
                }
                $levelEl.removeClass('level-' + curLevel);
                curLevel ++;
                $levelEl.addClass('level-' + curLevel);
                $levelEl.attr('level', curLevel);
                event.stopPropagation();
            },
            reduceLevel: function (event) {
                var $target = $(event.target);
                var $levelEl = $target.parent().parent();
                var curLevel = $levelEl.attr('level');
                if (curLevel <= 1) {
                    return;
                }
                $levelEl.removeClass('level-' + curLevel);
                curLevel --;
                $levelEl.addClass('level-' + curLevel);
                $levelEl.attr('level', curLevel);
                event.stopPropagation();
            },
            deleteLevel: function (event) {
                var $target = $(event.target);
                $target.parent().parent().remove();
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
                                //alert();
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
                var me = this;
                $(document).mousedown(function (e) {
                    // 如果点击的是个人信息下拉框里面的内容，就不隐藏下拉框
                    if (!$.contains($('.j-personal-box')[0], e.target)) {
                        $('.j-personal-msg').hide();
                    }
                    // 如果是当前按钮容器内的按钮动作，就不隐藏按钮区域
                    if (!$.contains(me.$levelBtns[0], e.target)) {
                        $('.j-interest-level-controller').hide();
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