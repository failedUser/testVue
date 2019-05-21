export const removePXToNumber = function(str) {
    if (!str) {
        console.error('异常的尺寸', str);
        return 0;
    } else if (typeof str === 'number') {
        return str;
    } else if (typeof str === 'string') {
        let strNum = Number(str.replace('px', ''));
        return isNaN(strNum) ? 0 : strNum;
    }

}


export const findBackgroundNode = function(element) {
    let _style = getComputedStyle(element);
    const check = function (str) {
        return  str.indexOf('url(') >= 0;
    }
    return check(_style.background)
        || (check(getComputedStyle(element, ':after').background) && ':after')
        || check(getComputedStyle(element, ':before').background && ':before')
}