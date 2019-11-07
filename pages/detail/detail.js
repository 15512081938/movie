import config from '../../config/url.js'
import http from '../../utils/http.js'
Page({
  data: {
    detailMovie:{},
    movieId:0
  },
  onLoad(options) {
    // console.log(options.id);
    this.data.movieId = options.id;
    this.getList();
  },
  getList() {
    http.axios({
      url: config.detail,
      data:{movieId:this.data.movieId}
    }).then(res => {
      let {detailMovie} = res.data;
      this.data.detailMovie = detailMovie;
      console.log(this.data.detailMovie);
      this.setData({
        detailMovie:this.data.detailMovie
      })
    })
  }
})