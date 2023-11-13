// //保留所有符合条件的队列
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeType !== node.nodeType || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last,list = []
//     while(node !== null){
//         let len = node.attributes.length
//         for(let attr in node.attributes){
//             len--
//             if(node.attributes[attr].value !== sibl.attributes[attr]?.value && /^[A-Za-z\-]*/.exec(node.attributes[attr].value)[0] !== /^[A-Za-z\-]*/.exec(sibl.attributes[attr]?.value)[0]){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(node !== last){
//                     list.push(last)
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())‘


// //仅保留首次获得的队列
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeType !== node.nodeType || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last = null,list = []
//     walk: while(node !== null){
//         let len = node.attributes.length
//         for(let attr in node.attributes){
//             len--
//             if(node.attributes[attr].value !== sibl.attributes[attr]?.value && /^[A-Za-z\-]*/.exec(node.attributes[attr].value)[0] !== /^[A-Za-z\-]*/.exec(sibl.attributes[attr]?.value)[0]){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(last !== null && node !== last){
//                     //list.push(last)
//                     break walk
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())

// //优化，优化储存JSON属性的比较方式，修复无值属性不比较的BUG，修复attributes本身属性也比较的bug。现在只会比较标签上的attr节点。
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeType !== node.nodeType || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last = null,list = []
//     walk: while(node !== null){
//         let len = node.attributes.length
//         for(let attrNode of node.attributes){
//             len--
//             let attr = attrNode.nodeName
//             let isJSON = function(str){
//                 try{
//                     JSON.parse(str)
//                 }catch(err){
//                     return false
//                 }
//                 return true
//             }
//             if(!sibl.attributes.hasOwnProperty(attr) || !isJSON(node.attributes[attr].value) && node.attributes[attr].value !== sibl.attributes[attr]?.value && /^[A-Za-z\-]*/.exec(node.attributes[attr].value)[0] !== /^[A-Za-z\-]*/.exec(sibl.attributes[attr]?.value)[0]){
//                 break
//             }
//             if(isJSON(node.attributes[attr].value) && sibl.attributes[attr]?.value === undefined){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(last !== null && node !== last){
//                     break walk
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())

// //修复在拉钩招聘中误判id=__Next
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeType !== node.nodeType || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last = null,list = []
//     walk: while(node !== null){
//         let len = node.attributes.length
//         for(let attrNode of node.attributes){
//             len--
//             let attr = attrNode.nodeName
//             let isJSON = function(str){
//                 try{
//                     JSON.parse(str)
//                 }catch(err){
//                     return false
//                 }
//                 return true
//             }
//             if(!sibl.attributes.hasOwnProperty(attr) || !isJSON(node.attributes[attr].value) && node.attributes[attr].value !== sibl.attributes[attr]?.value && /^[A-Za-z\-_]*/.exec(node.attributes[attr].value)[0] !== /^[A-Za-z\-_]*/.exec(sibl.attributes[attr]?.value)[0]){
//                 break
//             }
//             if(isJSON(node.attributes[attr].value) && sibl.attributes[attr]?.value === undefined){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(last !== null && node !== last){
//                     break walk
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())

// //修复同类型的但不同名的节点可以通过检测的bug
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeName !== node.nodeName || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last = null,list = []
//     walk: while(node !== null){
//         let len = node.attributes.length
//         for(let attrNode of node.attributes){
//             len--
//             let attr = attrNode.nodeName
//             let isJSON = function(str){
//                 try{
//                     JSON.parse(str)
//                 }catch(err){
//                     return false
//                 }
//                 return true
//             }
//             if(!sibl.attributes.hasOwnProperty(attr) || !isJSON(node.attributes[attr].value) && node.attributes[attr].value !== sibl.attributes[attr]?.value && /^[A-Za-z\-_]*/.exec(node.attributes[attr].value)[0] !== /^[A-Za-z\-_]*/.exec(sibl.attributes[attr]?.value)[0]){
//                 break
//             }
//             if(isJSON(node.attributes[attr].value) && sibl.attributes[attr]?.value === undefined){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(last !== null && node !== last){
//                     break walk
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())


// // 修复一个属性存在多个值时被正则表达式过滤而导致实际不同但却能通过检测的bug，增加了注释，现在相似条件更加清晰并容易理解。
// function getJobList(){
//     let walker = document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT,(node)=>{
//         if(node.nextElementSibling === null || node.nextElementSibling.nodeName !== node.nodeName || ['SCRIPT','LINK','SPAN','A'].indexOf(node.nodeName) !== -1){
//             return NodeFilter.FILTER_SKIP
//         }
//         return NodeFilter.FILTER_ACCEPT
//     })
//     let node = walker.nextNode()
//     let sibl = node.nextElementSibling
//     let last = null,list = []
//     walk: while(node !== null){
//         let len = node.attributes.length
//         for(let attrNode of node.attributes){
//             len--
//             let attr = attrNode.nodeName
//             let isJSON = function(str){
//                 try{
//                     JSON.parse(str)
//                 }catch(err){
//                     return false
//                 }
//                 return true
//             }
//             let notSimilar = function(){//不相似？
//                 if(!sibl.attributes.hasOwnProperty(attr)){//如果sibl没有该属性
//                     return true
//                 }
//                 if(isJSON(node.attributes[attr].value)){//如果是JSON字符串，那么很大概率sibl的该属性也是JSON字符串，无需比较。
//                     return false
//                 }
//                 //如果不是JSON字符串，继续下面的判断
//                 if(node.getAttribute(attr) === '' && sibl.getAttribute(attr) === ''){//如果两者的属性值均为''
//                     return false
//                 }
//                 let values1 = node.attributes[attr].value.split(' ')
//                 let values2 = sibl.attributes[attr].value.split(' ')
//                 if(values1.length !== values2.length){//如果分割后的属性值数量不相等
//                     return true
//                 }
//                 while(values1.length > 0 && values2.length > 0){//过滤，然后比较
//                     let regexp =  /^[A-Za-z\-_]*/
//                     if(regexp.exec(values1.shift())[0] !== regexp.exec(values2.shift())[0]){//如果存在一对属性值不相等
//                         return true
//                     }
//                 }
//                 //如果通过了所有比较，则表示近似。
//                 return false
//             }
//             if(notSimilar()){
//                 break
//             }
//             if(len === 0 && node.getElementsByTagName('img').length > 0 && node.getElementsByTagName('div').length > 0){
//                 if(last !== null && node !== last){
//                     break walk
//                 }
//                 list.push(node)
//                 last = sibl
//             }
//         }
//         node = walker.nextNode()
//         sibl = node?.nextElementSibling
//     }
//     list.push(last)
//     return list
// }
// console.log(getJobList())


//修复在面对简陋网站无法通过img标签栓选元素的bug。
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
console.log(getJobList())