<template>
  <div class="hello">
    <!-- <div @click="clipWindow">切屏 </div> -->
     <div @click="domToImage">切屏 demo-to-iamge </div>
    <div @click="canvasBySelf"> 自己切屏</div>
    <!-- <img  style="width:100%" src="../assets/img14.png" /> -->
     <!-- <img  style="width:100%" src="../assets/logo.png" /> -->
      <img  style="width:100%" src="../assets/bg.jpeg" />
        <canvas style="margin-top:50px;" id="canvas-demo1" />
    <!-- 处理水平居中的问题 -->
    <div class="demo-1 demo-item">
       <!-- 检查fixed 定位模块 -->
      <!-- <div class="demo-fixed  demo-fixed1">
        fix-top-0
        <div class="img"></div>
      </div> -->
      <!-- <div class="demo-fixed demo-fixed1">
        fix-top-
        <div class="img"></div>
      </div>
      <div class="demo-fixed demo-fixed2">
        fix-top-0
        <div class="img"></div>
      </div> -->
       <!-- 处理各种字体 -->
      <!-- <div class="demo-1-container">
      
          <div class="middle-line"> </div>
          <div class="demo-1-item">
              
              <div style="font-size:20px;">12</div>
              <div style="font-size:20px;color: red;font-family: PingFangSC-Regular;">你好</div>
              <div style="font-size:20px;color: red;font-family: PingFangSC-Medium;">你好</div>
              <div style="
                  border-bottom-left-radius: 1rem;
                  border-top-left-radius: 1rem;
                  background: #FF6D71;">12</div>
                <div style="
                border-radius: .7rem;
                background: #fff;">12</div>
                <div class="demo-shadow">shadow</div>

          </div>
      </div> -->
      <!-- 处理各种图片 -->
      <!-- <div class="demo-1-container">
          <div class="middle-line"> </div>
          <div class="demo-1-item">
              <img class="demo-1-img" style="height:100px;width:100px;" src="http://alpha-2115.caibeike.com/i/700267dc82a2d317e5b250fe8f27acd4-cxh02W@!750c1624" />
              
              <img class="demo-3-img" src="https://static.caibeike.com/i/c1d28e58714c028f3c15b2bf3bb63cea-dq4O4R" />
              <img  class="demo-3-img after-img back-img "  src="../assets/img14.png" />
               <div class="back-img"></div>
               <div class="back-img-much"></div>
              <div class="after-img"></div>
          </div>
          <div class="demo-absolute">
            滚动切图这个问题很是不准。只能从顶部开始切
            <div class="img"></div>
          </div>
      </div> -->
      <!-- <div class="demo-1-container">
          <div class="middle-line"> </div>
          <div class="demo-1-item">
              <img class="demo-3-img" src="https://static.caibeike.com/i/c1d28e58714c028f3c15b2bf3bb63cea-dq4O4R" />
              <img  class="demo-3-img"  src="../assets/test11.png" />
              <div class="demo-shadow">shadow</div>
              <span class="resolve-baseline">121212121212121212</span>
              <span class="demo-2-clamp">                
                121212121212121212121212121212121212121 2121212121212121212121212
                </span>
              <p>正常的字体A12d.$#@^&*$ </p>
               <div class="back-img"></div>
              <div class="after-img"></div>
          </div>
          <div class="demo-absolute">
            滚动切图这个问题很是不准。只能从顶部开始切
            <div class="img"></div>
          </div>
      </div> -->
    
    </div>
    
    <!-- 处理不支持截断的属性 -->
    <!-- <div class="demo-2 demo-item">
        
      </div> -->
  </div>
</template>

<script>
import domtoimage from '../dom2png';
import img2window from '../dom2png/img2window';
import cbkHtml2Canvas from './cbkHtml2canvas';


export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    clipWindow() {
      cbkHtml2Canvas(document.querySelector(".demo-1-container"), {
        Y:100,
        height: 300,
        scale: 10,
        // onclone: this.oncloneHtml,
        canvas: document.querySelector('#canvas-demo1'),
        allowTaint: true
      }).then(canvas => {
          document.body.appendChild(canvas)
      });
    },
    canvasBySelf() {
      let dom = document.querySelector('#canvas-demo1');
      let ctx = dom.getContext('2d');
      var img = new Image();
      img.onload = () => {
        dom.height = img.height;
        dom.width = img.width;
        ctx.drawImage(img,0,0, img.width, img.height);
        let img1 = document.createElement('img');
        img1.src = dom.toDataURL();
        ctx.stroke();
        this.makeSvgDataUri(img1, img.width, img.height).then(svg => {
          let img2 = document.createElement('img');
          img2.src = svg;
          document.body.append(img2);
          img2.onload = () => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.height = img2.height/img2.width * window.innerWidth;
            canvas.width = window.innerWidth;
            context.drawImage(img2,0,0,canvas.width/2, canvas.height/2 ,0,0, canvas.width, canvas.height);
            document.body.append(canvas);
          }
        })

      }
      img.src = require('../assets/bg.jpeg');
      //  img.src = require('../assets/img14.png');
    },
    escapeXhtml (string) {
        return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
    },
    makeSvgDataUri (node, width, height) {
    return Promise.resolve(node)
        .then(function (node) {
            node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            return new XMLSerializer().serializeToString(node);
        })
        .then(this.escapeXhtml)
        .then(function (xhtml) {
            return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
        })
        .then(function (foreignObject) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
                    foreignObject + '</svg>';
        })
        .then(function (svg) {
            return 'data:image/svg+xml;charset=utf-8,' + svg;
        });
    },
    domToImage() {
      // let _domContainer = document.querySelector(".demo-1-container");
      // let _domContainer = document.documentElement;
      // domtoimage.toPng(_domContainer, {
      //   bgcolor: 'gray'
      // })
      //   .then(function (dataUrl) {
      //       var img = new Image();
      //       img.src = dataUrl;
      //       img.onload = () => {
      //          let dom = document.querySelector('#canvas-demo1');
      //          let width = img.width;
      //          let height = img.height;
      //         let ctx = dom.getContext('2d');
      //         dom.width = img.width;
      //         dom.height = img.height;
      //         // console.log(img.width, img.height);
      //          dom.style.cssText = `width:${dom.width/4}px;height:${dom.height/4}px`;
      //         ctx.drawImage(img,0,0, width, height);
      //         dom.style.display = 'block';
      //       }
      //   })
      //   .catch(function (error) {
      //       console.error('oops, something went wrong!', error);
      //   });
        // let _domContainer = document.documentElement;
        let _domContainer = document.querySelector('.hello');
        img2window(_domContainer, {
            bgcolor: 'gray', // 背景色
            style: '', //被移除
            onclone: function(node) { // 定制dom 并且不影响原本的展示
                // node.style.marginTop = '100px';
            },
            // qrImage: , // 支持本地链接支持base64 如果有qrImage时忽略qrUrl
            qrUrl: 'www.baidu.com', // qrCode链接，如果没有的话不展示
            qrConfig: {}, //支持qrcode官方所有配置
            // qrWidth: 100, // 如果是number类型的话默认是px
            qrHeight: '5rem',
            top: '',//
            left: '', //
            right: '', //
            bottom: '2rem',
            screenType: 'fixed', // append, fixed, none
            remBaseSize: 20 //当前设计标准是20， 如果没有的话就是14
        })
        .catch(function (error) {
            // window.open(error.target.src);
            console.log(error.target.src);
            console.error('oops, something went wrong!', error.target.src);
        });
    }
  },
  watch: {
    msg() {
      console.log(222);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
body {
  margin: 0;
  padding: 0;
}
.demo-item {
  margin-top: 20px;
}
.hello {
  position: relative;
  width: 100%;
  overflow:hidden;
  box-sizing: border-box;
}

.demo-1-container {
  display: flex;
  margin-top: 50px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  // height: 100px;;
  // overflow: scroll;
  background: -webkit-linear-gradient(top, #D22D23, #D22D23 16%, #FB8065 55%, #FB8065);;
  /* background:linear-gradient(48deg,rgba(0,153,170,1) 0%,rgba(0,198,214,1) 100%); */
  /* margin-top: 10px; */
  /* background: yellow; */
}
.demo-1-item {
  height: 200px;
  /* background: red; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* font-size: 12px; */
}

.demo-1-item > img {
}
.demo-1-text {
  /* background: gray; */
  /* height: 12px; */
}
.demo-1-item > span, .demo-1-text > span {
  /* background: green; */
  /* display: inline-block;
  box-sizing: border-box; */
  /* height: 12px; */
  /* margin-bottom: 4px; */
}

.demo-2 {
  width:201px;
}
.demo-2-clamp {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  width: 100px;
    /* autoprefixer: ignore next */
}
.middle-line {
  display: block;
  height:1px;
  position: absolute;
  top: 100px;
  left: 0;
  background: gray;
  width: 100%;
}

.demo-1-item {
  box-sizing: border-box;
}
.resolve-baseline {
  /* margin-bottom: 4px; */
  width: 100px;
  word-break: break-all;
  line-height: 20px;
  height:80px;
}

.back-img {
  width: 50px;
  height: 70px;
  background: url('../assets/test11.png') no-repeat;
  background-size: 100%;
  // transform: translateZ(0) scale(1, 1);
  display: block;
}
.after-img::before {
  content: '';
  width: 100px;
  height: 50px;
  background: url('../assets/test11.png') 100% 0 no-repeat,  url('../assets/test11.png') 0 100% no-repeat;
  background-size: auto 100%;
  display: block;

}

.after-img::after {
  content: '';
  width: 100px;
  height: 50px;
  background: url('../assets/test11.png') 100% 0 no-repeat,  url('../assets/test11.png') 0 100% no-repeat;
  background-size: auto 100%;
  display: block;

}
.demo-3-img {
  width: 50px;
  height: 56.33px;
}
.demo-1-img {
  width: 26px;
  height: 25px;
}
.demo-shadow {
  width:17.25rem;
  height:2.25rem;
  background:rgba(255,255,255,1);
  box-shadow:0rem 0.1rem 0.4rem 0rem rgba(233,233,233,1);
  border-radius:1.13rem;
  border:0.03rem solid rgba(245,245,245,1);
}
.demo-fixed{
    position: fixed;
    padding: 15px;
    top: 0;
    left: 0;
    width: 100px;
    height: 200px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    .img {
      height: 110px;
      background: url('../assets/test11.png') 100% 0 no-repeat;
      background-size: auto 100%;
  }
}
.back-img-much {
  height: 50px;
  width: 100px;
  background: url('../assets/test11.png') 100% 0 no-repeat,  url('../assets/test11.png') 0 100% no-repeat;
  background-size: auto 100%;
}
.demo-fixed1 {
  top: 20px;
  left: 100px;
}
.demo-fixed2 {
  bottom: 10px;
  top: auto;
  left: 100px;
}
.demo-absolute{
    position: absolute;
    padding: 15px;
    top: 0;
    right: 0;
    width: 100px;
    height: 200px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    .img {
      height: 110px;
      background: url('../assets/test11.png') 100% 0 no-repeat;
      background-size: auto 100%;
  }
}
#canvas-demo1 {
  margin-top: 50px;
}
.demo-1-item > div {
  margin-right: 10px;
}

.title-bg {
  background: url('../assets/test11.png') rgba(0, 0, 0, .2) 1.1rem 2.3rem no-repeat;
  background-size: 83%;
  &::after {
      content: '';
      position: absolute;
      top: 4rem;
      right: 27%;
      left: 27%;
      height: 1.5rem;
      background: url('../assets/test11.png') 0 50% no-repeat;
      background-size: 100% auto;
  }
}
</style>
