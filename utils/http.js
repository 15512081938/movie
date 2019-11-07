// http请求类
class Http {
    axios({ url, data = {}, method = 'GET' }) {
        wx.showLoading({
            title: 'Loading...',
            mask: true
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url,
                data,
                method,
                success: res => resolve(res),
                fail: err => reject(err),
                complete: () => {
                    wx.hideLoading();
                }
            });
        })
    }
}
export default new Http;