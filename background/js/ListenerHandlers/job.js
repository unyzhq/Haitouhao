import { Data } from "../util.js"
import { createLG } from "../../component/LG.js"
import { createLP } from "../../component/LP.js"
import { createWY } from "../../component/WY.js"
import { createZL } from "../../component/ZL.js"
import { createZP } from "../../component/ZP.js"
function createJob(message){
    if(message.type !== 'job'){
        return
    }
    console.log('正在接收来自',message.from,'的信息')
    let index = 0
    for(let texts of message.data){
        let el = null
        if(message.from === 'lagou'){
            el = createLG(texts)
        }
        if(message.from === 'liepin'){
            el = createLP(texts)
        }
        if(message.from === '51job'){
            el = createWY(texts)
        }
        if(message.from === 'zhilian'){
            el = createZL(texts)
        }
        if(message.from === 'zhipin'){
            el = createZP(texts)
        }
        if(el !== null){
            el.setAttribute('from',message.from)
            el.setAttribute('index',index)
            el.onclick = function(){
                let message = {
                    type:'job',
                    from:'home',
                    data:new Data('click',{target:this.getAttribute('from'),index:this.getAttribute('index')})
                }
                //向其他标签页发送请求招聘详细信息的消息
                chrome.tabs.query({url:["https://www.liepin.com/*","https://c.liepin.com/*","https://www.zhipin.com/*","https://www.lagou.com/*","https://mkt.51job.com/*","https://we.51job.com/*","https://landing.zhaopin.com/*","https://xiaoyuan.zhaopin.com/*"]},function(tabs){
                    for(let tab of tabs){
                        chrome.tabs.sendMessage(tab.id,message)
                        chrome.tabs.sendMessage(tab.id,{type:'close',from:'home'})
                    }
                })
            }
            document.getElementById('content').appendChild(el)
        }
        index++
    }
    console.log('来自',message.from,'的信息接收完成')
}


chrome.runtime.onMessage.addListener(function(message){
    if(message.type !== 'job'){
        return
    }
    createJob(message)
})

chrome.runtime.onMessage.addListener(function(message){
    if(message.type !== 'open'){//接收来自其他标签页的url，用不聚焦的方式打开它。
        return
    }
    chrome.tabs.create({url: message.data,active: false})
})

chrome.runtime.onMessage.addListener(function(message){//接收返回的招聘详细信息的消息
    if(message.type !== 'desc'){
        return
    }
    let lists = document.getElementById('desc_').getElementsByClassName('list')
    if(message.from === 'zhipin'){
        lists[0].innerText = message.data.shift()
        lists[1].innerText = message.data.shift()
        lists[4].innerText = message.data.shift()
    }
    if(message.from === 'liepin'){
        lists[0].innerText = message.data.shift()
        lists[2].innerText = message.data.shift()
        lists[3].innerText = message.data.shift()
        lists[4].innerText = message.data.shift()
        lists[1].innerText = message.data.shift()
    }
    if(message.from === 'zhilian'){
        lists[0].innerText = message.data.shift()
        lists[1].innerText = message.data.shift()
        lists[4].innerText = message.data.pop()
        let str = ''
        while(message.data.length > 0){
            str += message.data.shift()
        }
        lists[3].innerText = str
    }
    if(message.from === 'lagou'){
        console.log(message.data)
        lists[0].innerText = message.data.shift()
        lists[1].innerText = message.data.shift()
        lists[2].innerText = message.data.shift()
        lists[4].innerText = message.data.shift()
        let str = ''
        while(message.data.length > 0){
            str += message.data.shift()
        }
        lists[3].innerText = str
    }
    if(message.from === '51job'){
        lists[0].innerText = message.data.shift()
        lists[1].innerText = message.data.pop()
        lists[2].innerText = message.data.shift()
        lists[3].innerText = message.data.pop().slice(5)
        lists[4].innerText = message.data.reduce((p,v)=>p+v)
    }
})