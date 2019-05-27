import domtoimage from './dom2image';

const defaultDevice = 4;
const defaultScale = 0.8;

export default function srceenHot (node, options) {
    let screenType = options.screenType;
    return  domtoimage.toPng(node, options)
        .then(dataUrl => {
            if (options.cutType === 'full') {
                renderInDocument(options, dataUrl, screenType, 1);
                return false;
            }
            if (!screenType || screenType === 'none') {
                return dataUrl;
            }
            let img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                let ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                // console.log(img.width, img.height);
                ctx.drawImage(img,0,0, width, height);
                renderInDocument(options, canvas, screenType, defaultDevice);
            };
        });
}


function renderInDocument(options, canvas, screenType, defaultDevice) {
    if (screenType === 'append') {
        canvas.style.cssText = `width:${canvas.width / defaultDevice}px;height:${canvas.height / defaultDevice}px`;
        document.body.append(canvas);
    } else if (screenType === 'fixed') {
        let canvasContainer = document.createElement('div');
        if (options.cutType === 'full') {
            canvas.style.cssText = 'transform: scale(0.7)';
            canvas.setAttribute('height', getComputedStyle(canvas).offsetHeight * 0.7 + 'px');
            canvas.setAttribute('width', getComputedStyle(canvas).offseWidth * 0.7 + 'px');
        } else {
            canvas.style.cssText = `width:${(canvas.width / defaultDevice) * defaultScale}px;height:${(canvas.height / defaultDevice) * defaultScale}px`;
        }
        
        canvasContainer.style.cssText = `
            position: fixed;
            top:0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0, .6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000
        `;
        canvasContainer.appendChild(canvas);
        document.body.appendChild(canvasContainer);
    }
}

