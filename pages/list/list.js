// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        types: [
            {
                abbreviation: 'gn', 
                name: '国内'
            }, {
                abbreviation: 'gj',
                name: '国际'
            }, {
                abbreviation: 'cj',
                name: '财经'
            }, {
                abbreviation: 'yl', 
                name: '娱乐'
            }, {
                abbreviation: 'js', 
                name: '军事'
            }, {
                abbreviation: 'ty', 
                name: '体育'
            }, {
                abbreviation: 'other', 
                name: '其他'
            }
        ],
        articles: [
        ],
        defaultImage: '../../images/1.jpg',
        current_type: 'gn'
    },

    // 处理时间格式
    handleDate(articles) {
        for (let article of articles) {
            let date = article.date // 2012-07-01T09:34:12.000Z
            let time = date.split('T')[1] // 09:34:12.000Z
            let hourMinute = time.split(':').slice(0,2).join(':') // 09:34
            article.date = hourMinute;
        }
    },

    // 获取新闻列表
    getNewsList(type) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {type: type},
            success: res => {
                let articles = res.data.result;
                this.handleDate(articles);
                this.setData({
                    articles: articles
                });
            },
            fail: res => {
                wx.showToast({
                    title: '网络开小差了，下拉刷新试试看？',
                    icon: 'none'
                })
            }
        })
    },

    // 切换新闻类型
    changeType(event) {
        this.setData({
            current_type: event.currentTarget.dataset.type
        })
        this.getNewsList(this.data.current_type)
    },

    // 跳转至详情页面
    toDetail(event) {
        let id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id='+id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getNewsList('gn')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getNewsList(this.data.current_type);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getNewsList(this.data.current_type);
        wx.stopPullDownRefresh();
    },

})