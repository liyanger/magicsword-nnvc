/**
 * @file: 报表配置端url信息
 * @author: lizhantong(lztlovely@126.com)
 * @date: 2014-08-22
 */

define(function () {

    //--------------------------------
    // 类型声明
    //--------------------------------

    var Url = {};

    var webRoot;

    /**
     * 得到运行时的web base
     *
     * @public
     * @return {string} 运行时的web base
     */
    Url.getWebRoot = function() {
        return webRoot;
    };

    /**
     * 设置根路径
     *
     * @param {string} 根路径
     * @public
     */
    Url.setWebRoot = function(root) {
        if (root === '') {
            webRoot = root;
        } else {
            webRoot = root + '/';
        }
    };

    //--------------------------------
    // 主页面URL
    //--------------------------------
    /**
     * 获取公司列表Url
     *
     * @public
     * @return {string} url
     */
    Url.loadCompanyList = function () {
        return this.getWebRoot() + 'companys';
    };
    /**
     * 获取个人兴趣列表Url
     *
     * @public
     * @return {string} url
     */
    Url.loadPersonalInterestList = function () {
        return this.getWebRoot() + 'personal-interest';
    };

    return Url;
});