<template>
    <div class="test-container">
        <span @click="start">测试</span>
        <div id="test-content" class="test-content">
            <span>base text</span>
            <img class="demo-1-img" src="https://static.caibeike.com/i/3b15547dc8e25fd51c01b2ad726361c1-cnRNZm" />
        </div>
        <canvas id="container-canvas" />
    </div>
</template>
<script>
import html2canvas from 'html2canvas';


export default {
    methods: {
        start() {
            html2canvas(document.querySelector('.test-content'), {
                Y:0, // 开始截图的Y坐标相对于容器
                height: 100, // 截图的高度
                // 如果截取的节点就是document， 如果不是就取背景色，否则为null
                // 如果是document 背景色优先级 document -> body => 配置
                backgroundColor: 'red',
                // 制定要绘制的canvas容器
                canvas: document.getElementById('container-canvas'),
                onclone: this.oncloneHtml,
                allowTaint: true, // 是否可以截取图片
            }).then(canvas => {
                document.querySelector(".test-container").appendChild(canvas)
            });
        },
        // 这个方法克隆了一份html代码。可以在这个基础上修改并且不影响正在显示的元素
        oncloneHtml(e) {
            // console.log(_document.querySelector('.test-content'));
            // e.querySelector('.test-content').style.background = 'green';
            let dom = e.createElement('p');
            dom.innerHTML = '1212';
            e.querySelector('.test-content').appendChild(dom)
        }
    }
}
</script>
<style>
.test-content {
    min-height: 200px;
    background:linear-gradient(48deg,rgba(0,153,170,1) 0%,rgba(0,198,214,1) 100%);
}

</style>
