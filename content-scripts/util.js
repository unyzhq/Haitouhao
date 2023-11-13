let img = {src:''}
let signout = true

let types = {img,signout}
//简易的类型检查函数。
function Data(type,data){
    let t
    for(let prop in types){
        if(prop === type){
            t = types[prop]
        }
    }
    if(t === undefined){
        throw Error('Type error,please check the file named "util.js" to fixed and retry.')
    }
    if(typeof t === 'object'){
        for(let prop in data){
            if(t[prop] === undefined || typeof t[prop] !== typeof data[prop]){
                throw Error('Type error,please check the file named "util.js" to fixed and retry.')
            }
        }
        for(let prop in t){
            if(data[prop] === undefined || typeof t[prop] !== typeof data[prop]){
                throw Error('Type error,please check the file named "util.js" to fixed and retry.')
            }
        }
    }else if(typeof t !== typeof data){
        throw Error('Type error,please check the file named "util.js" to fixed and retry.')
    }
    
    return {[type]:data}
}
//暂时不需要，另外getEventListeners只在浏览器控制台可用。
// function getButton(name){//根据字符串，获取一个绑定了点击事件的块元素。
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         let eventListeners = window.getEventListeners(node)
//         if(eventListeners.click === undefined || eventListeners.click.useCapture){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     for(let node = walker.nextNode();node !== null;node = walker.nextNode()){
//         //8203为零宽字符，小小ZH，可笑可笑。
//         if(new RegExp(`[\\s${String.fromCharCode(8203)}]*${name}(?![\\s${String.fromCharCode(8203)}]*\\S)`,"y").test(node.innerText)){
//             return node
//         }
//     }
//     return null
// }

function getJobList(){
    let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
        if(node.nextElementSibling === null || node.nextElementSibling.nodeName !== node.nodeName || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
            return NodeFilter.FILTER_SKIP
        }
        return NodeFilter.FILTER_ACCEPT
    })
    let node = walker.nextNode()
    let sibl = node.nextElementSibling
    let last = null,list = []
    walk: while(node !== null){
        let len = node.attributes.length
        for(let attrNode of node.attributes){
            len--
            let attr = attrNode.nodeName
            let isJSON = function(str){
                try{
                    JSON.parse(str)
                }catch(err){
                    return false
                }
                return true
            }
            let notSimilar = function(){//不相似？
                if(!sibl.attributes.hasOwnProperty(attr)){//如果sibl没有该属性
                    return true
                }
                if(isJSON(node.attributes[attr].value)){//如果是JSON字符串，那么很大概率sibl的该属性也是JSON字符串，无需比较。
                    return false
                }
                //如果不是JSON字符串，继续下面的判断
                if(node.getAttribute(attr) === '' && sibl.getAttribute(attr) === ''){//如果两者的属性值均为''
                    return false
                }
                let values1 = node.attributes[attr].value.split(' ')
                let values2 = sibl.attributes[attr].value.split(' ')
                if(values1.length !== values2.length){//如果分割后的属性值数量不相等
                    return true
                }
                while(values1.length > 0 && values2.length > 0){//过滤，然后比较
                    let regexp =  /^[A-Za-z\-_]*/
                    if(regexp.exec(values1.shift())[0] !== regexp.exec(values2.shift())[0]){//如果存在一对属性值不相等
                        return true
                    }
                }
                //如果通过了所有比较，则表示近似。
                return false
            }
            if(notSimilar()){
                break
            }
            let filter = function(){//对通过相似判断的元素进行过滤，仅保留包含招聘信息的元素
                if(/^https:\/\/xiaoyuan.zhaopin.com/.test(window.location.href)){
                    return /[0-9]/.test(node.innerText) //元素中仅需要包含数字
                }else{
                    return node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0//元素中必须包含至少一个img元素和一个div元素
                }
            }
            if(len === 0 && filter()){
                if(last !== null && node !== last){
                    break walk
                }
                list.push(node)
                last = sibl
            }
        }
        node = walker.nextNode()
        sibl = node?.nextElementSibling
    }
    list.push(last)
    return list
}