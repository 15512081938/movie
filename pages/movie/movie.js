import config from '../../config/url.js'
import http from '../../utils/http'
Page({
  data: {
    list: [],  //电影数据
    topnum: 0, //回到顶部的起始位置
    show: 'hide', //控制回到顶部按钮显示
    movieIds: {}, //电影数据id
    i: 0,       //控制加载更多的id

    items: [    //swiper切换标题
      { title: "正在热映" }, 
      { title: "即将上映" }
    ],
    shownow: ['now', ''],  //显示红色
  },

  change(e){
    let i = e.detail.current;
    this.swiperfn(i);
  },
  shownav(e){
    let i = e.target.dataset.index;
    this.swiperfn(i);
  },
  swiperfn(index){
    let shownow = this.data.shownow.map(value => '');
    shownow[index] = 'now';
    this.setData({
      shownow,
      index
    });
  },

  gotop() {
    this.setData({
      topnum: 0
    })
  },
  scroll(e) {
    let scrollTop = e.detail.scrollTop;
    let show = 'hide';
    if (scrollTop >= 200) {
      show = 'show'
    }
    this.setData({
      show
    })
  },
  lower() {
    this.getMore();
  },
  onLoad(options) {
    this.getFirst();
  },
  getFirst(){
    http.axios({
      url: config.index,
    }).then(res => {
      let { movieIds, movieList } = res.data;
      this.data.movieIds = movieIds;
      this.data.i = 12;
      this.setData({
        list: [...this.data.list, ...movieList]
      })
    })
  },
  getMore(data) {
    let movies = this.data.movieIds;
    let movieIds = movies.slice(this.data.i, this.data.i + 10).join(',');
    this.data.i = this.data.i + 10;
    http.axios({
      url: config.more,
      data: { movieIds }
    }).then(res => {
      let { coming } = res.data;
      this.setData({
        list: [...this.data.list, ...coming]
      })
    })
  }
})