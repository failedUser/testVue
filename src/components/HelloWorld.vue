<template>
  <div class="hello">
    <div @click="clipWindow">切屏 </div>
     <div @click="domToImage">切屏 demo-to-iamge </div>
    <div @click="canvasBySelf"> 自己切屏</div>
    
    <!-- 处理水平居中的问题 -->
    <div class="demo-1 demo-item">
      <div class="demo-fixed">
        滚动切图这个问题很是不准。只能从顶部开始切
        <div class="img"></div>
      </div>
      <div class="demo-1-container">
          <div class="middle-line"> </div>
          <div class="demo-1-item">
              <!-- <img class="demo-1-img" src="https://static.caibeike.com/i/3b15547dc8e25fd51c01b2ad726361c1-cnRNZm" /> -->
              <!-- <img class="demo-3-img" src="https://static.caibeike.com/i/c1d28e58714c028f3c15b2bf3bb63cea-dq4O4R" /> -->
              <img  class="demo-3-img"  src="../assets/test11.png" />
              <div class="demo-shadow">shadow</div>
              <!-- <span class="resolve-baseline">121212121212121212</span> -->
              <!-- <span class="demo-2-clamp">                
                121212121212121212121212121212121212121 2121212121212121212121212
                </span> -->
              <p>正常的字体A12d.$#@^&*$ </p>
               <div class="back-img"></div>
              <div class="after-img"></div>
          </div>
          <div class="demo-absolute">
            滚动切图这个问题很是不准。只能从顶部开始切
            <div class="img"></div>
          </div>
      </div>
      <canvas id="canvas-demo1" />
    </div>
    
    <!-- 处理不支持截断的属性 -->
    <div class="demo-2 demo-item">
        
      </div>
  </div>
</template>

<script>
import domtoimage from '../dom2png';
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
      img.onload = function(){
        ctx.drawImage(img,0,0, 50 * 4, 56.333 * 4);
        ctx.stroke();
      }
      img.src = 'https://static.caibeike.com/i/c1d28e58714c028f3c15b2bf3bb63cea-dq4O4R';
    },
    domToImage() {
      // let _domContainer = document.querySelector(".demo-1-container");
      let _domContainer = document.body;
      domtoimage.toPng(_domContainer, {
        bgcolor: 'gray'
      })
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.onload = () => {
               let dom = document.querySelector('#canvas-demo1');
               let width = img.width;
               let height = img.height;
              let ctx = dom.getContext('2d');
              dom.width = img.width;
              dom.height = img.height;
               dom.style.cssText = `width:${dom.width/4}px;height:${dom.height/4}`;
              ctx.drawImage(img,0,0, width, height);
            }
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
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
<style lang="less" scoped>

.demo-item {
  margin-top: 20px;
}
.hello {
  position: relative;
  width: 100%;
  padding: 10px;
  overflow:hidden;
  box-sizing: border-box;
}

.demo-1-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100px;;
  overflow: scroll;
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
  height: 56.33px;
  background: url('../assets/test11.png') no-repeat;
  background-size: 100%;
  transform: translateZ(0) scale(1, 1);
  display: block;
}

.after-img::after {
  content: '';
  width: 26px;
  height: 25px;
  background: url('../assets/test11.png') no-repeat;
  background-size: 100%;
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
</style>
