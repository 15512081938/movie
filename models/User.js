import config from '../config/url.js'
import http from '../utils/http.js'
class User{
    update(data) {
        return http.axios({
            url: config.user,
            data,
            method: 'PUT'
        });
    }
}
export default new User;