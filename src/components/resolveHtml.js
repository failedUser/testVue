
import { removePXToNumber } from './utils';



const getElementSizeByInnerHtml = function(element, innerHTML) {
    element.innerHTML = innerHTML;
    let _style = getComputedStyle(element);
    let height = removePXToNumber(_style.height);
    let width =  removePXToNumber(_style.width);
    return { height, width }
}

const resolveText = function(el,element, clampCount) {
    let str = el.data.trim();
    let baseHeight = getElementSizeByInnerHtml(element, str.substr(0, 1)).height;
    let maxHeight = baseHeight * clampCount;
    
    const getMaxContentByLimitHeight = function(str, appendStr) {
        let elementHeight = baseHeight;
        appendStr = appendStr || '';
        let index = 1;
        while (index < str.length && elementHeight <= maxHeight) {
            index++;
            elementHeight = getElementSizeByInnerHtml(element,str.substr(0, index)+appendStr).height;
        }
        return str.substr(0, index - 1) + appendStr;
    }
    
    const resolveElementMaxStr = function(maxStr) {
        let {textOverflow} = getComputedStyle(element);
        // 暂时只处理这2个属性， 拓展以后慢慢加
        switch(textOverflow) {
            case 'clip' : return maxStr;
            case 'ellipsis': return getMaxContentByLimitHeight(maxStr, '...');
        }
    }

    let maxStr = getMaxContentByLimitHeight(str);
    element.innerHTML = resolveElementMaxStr(maxStr);
}

export function findStrWithClampLine(element, clampCount) {
    // 目前只解决可能携带的文本，不处理img input 之类的功能性标签
    let nodes = Array.from(element.childNodes);
    nodes.forEach(el => {
        if (el instanceof Text) {
            resolveText(el,element, clampCount);
        } else if (el instanceof HTMLElement) {
            console.log(el);
        }
    })
}

export function resolveClampNode(element) {
    let queryStyle = getComputedStyle(element);
    const clampCount = queryStyle.webkitLineClamp;
    element.style.cssText = `
        display: inherit;
        -webkit-line-clamp: 0;
        -webkit-box-orient: none;
        text-overflow: ${queryStyle.textOverflow};
    `;
    findStrWithClampLine(element, Number(clampCount));
}



export function resolveBackgroundImageNode(element, pseudoClass) {
    if (typeof pseudoClass !== 'string') {
        pseudoClass = '';
    }
    let _style = getComputedStyle(element, pseudoClass);
    let scaleMultiple = 5;
    let height = removePXToNumber(_style.height) * scaleMultiple;
    let width = removePXToNumber(_style.width) * scaleMultiple;
    // if (!pseudoClass) {
    //     element.style.cssText = `
    //         width: ${width}px;
    //         height: ${height}px;
    //         transform: scale(${1/scaleMultiple});
    //     `
    // }

}