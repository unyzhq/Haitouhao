let search = ''
let click = {target:'',index:''}
let types = {search,click}
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
export {Data}