// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleInfo: {}
    },

    // 处理时间格式
    handleDate(article) {
        let date = article.date // 2012-07-01T09:34:12.000Z
        let time = date.split('T')[1] // 09:34:12.000Z
        let hourMinute = time.split(':').slice(0, 2).join(':') // 09:34
        article.date = hourMinute;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',
            data: {id: id},
            success: (res) => {
                let article = res.data.result;
                this.handleDate(article);
                this.setData({
                    articleInfo: article
                })
            }
        })
    },

})