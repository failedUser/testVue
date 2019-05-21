import html2canvas from 'html2canvas';
import { resolveClampNode, resolveBackgroundImageNode } from './resolveHtml';
import { findBackgroundNode } from './utils';

// const html2canvas = window.html2canvas;
const oncloneHtml = function(doc) {
    let cutContainer = doc.querySelector('.hello');
    const childrenIterator = (children) => {
      Array.from(children).forEach(element => {
        // 找出有lineClamp属性的元素
        let _style = getComputedStyle(element);
        // if (Number(_style.webkitLineClamp) > 0) {
        //     resolveClampNode(element)
        // }
        let hasBackImg = findBackgroundNode(element);
        hasBackImg && resolveBackgroundImageNode(element, hasBackImg);

        if (element.children) {
            childrenIterator(element.children);
        }
      });
    }
    childrenIterator(cutContainer.children);
};

export default function cbkHtml2canvas(dom, options) {
    return html2canvas(dom, {
        ...options,
        ...{
            // 暂时不支持用户定制clone里面的内容
            onclone: oncloneHtml 
        }
    })
}