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
        throw Error('Type error,please check the file named "Data.js" to fixed and retry.')
    }
    if(typeof t === 'object'){
        for(let prop in data){
            if(t[prop] === undefined || typeof t[prop] !== typeof data[prop]){
                throw Error('Type error,please check the file named "Data.js" to fixed and retry.')
            }
        }
        for(let prop in t){
            if(data[prop] === undefined || typeof t[prop] !== typeof data[prop]){
                throw Error('Type error,please check the file named "Data.js" to fixed and retry.')
            }
        }
    }else if(typeof t !== typeof data || t !== data){
        throw Error('Type error,please check the file named "Data.js" to fixed and retry.')
    }
    
    return {[type]:data}
}

function getButton(name){//根据字符串，获取一个绑定了点击事件的块元素。
    let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
        let eventListeners = window.getEventListeners(node)
        if(eventListeners.click === undefined || eventListeners.click.useCapture){
            return NodeFilter.FILTER_SKIP
        }
        return NodeFilter.FILTER_ACCEPT
    })
    for(let node = walker.nextNode();node !== null;node = walker.nextNode()){
        //8203为零宽字符，小小ZH，可笑可笑。
        if(new RegExp(`[\\s${String.fromCharCode(8203)}]*${name}(?![\\s${String.fromCharCode(8203)}]*\\S)`,"y").test(node.innerText)){
            return node
        }
    }
    return null
}