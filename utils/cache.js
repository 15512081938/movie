class Cache {
    set(k, v, time = 3600) {
        time = new Date().getTime() + 1000 * time;
        let data = { v, time };
        wx.setStorageSync(k, data);
        return true;
    }
    get(k, val = '默认值') {
        if (!this.has(k)) return val || '';
        let { v } = wx.getStorageSync(k);
        return v;
    }
    del(k) {
        wx.removeStorageSync(k);
        return true
    }
    has(k) {
        let nowtime = new Date().getTime();
        let data = wx.getStorageSync(k);
        if (data == '') return false;
        if (data.time < nowtime) {
            wx.removeStorageSync(k);
            return false
        };
        return true;
    }
    forever(k, v) {
        this.set(k, v, 999999999999);
    }
}
export default new Cache;