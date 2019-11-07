import cache from '../../utils/cache.js';
import model from '../../models/User.js';
Page({
  data: {
    userinfo: {},
    show: false
  },
  onLoad(options) {
    if (cache.has('userinfo')) {
      this.setData({
        show: true,
        userinfo: cache.get('userinfo')
      })
    }
  },
  getuserinfo() {
    wx.getUserInfo({
      success: ({ userInfo }) => {
        let data = {
          avatar: userInfo.avatarUrl,
          nickname: userInfo.nickName,
          openid: cache.get('openid')
        }
        cache.set('userinfo', data);
        model.update(data);
        this.setData({
          show: true,
          userinfo: data
        })
      },
    });
  }
})