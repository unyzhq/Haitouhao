import {createWebsiteCard} from "../component/WebsiteCard.js"
import "../component/JobCard.js"
import "./ListenerHandlers/job.js"
import { session } from "./ListenerHandlers/storage.js"
import { restore } from "./ListenerHandlers/website.js"
import {Data} from "./util.js"
window.addEventListener('load',()=>{
    document.addEventListener('click',function(event){//全局点击事件
        //职位类型 展示和隐藏筛选卡片
        let job = document.getElementById('SearchBar-job')
        if(event.target === job || job.contains(event.target)){
            if(job.hasAttribute('clicked') && (event.target === job || event.target === job.firstElementChild || event.target === job.firstElementChild.nextSibling)){
                job.removeAttribute('clicked') 
            }else{
                job.setAttribute('clicked','')
            }
        }else{
            job.removeAttribute('clicked') 
        }
    })
    let sbcontent = document.getElementById('SearchBar-content')
    sbcontent.addEventListener('mouseover',function(event){//筛选卡片选项的悬浮事件
        for(let node of document.getElementsByClassName('SearchBar-option')){
            if((node.contains(event.target) || node === event.target) && !node.hasAttribute('hovered')){
                document.querySelector('.SearchBar-option[hovered]')?.removeAttribute('hovered')
                node.setAttribute('hovered','')
            }else if((node.contains(event.target) || node === event.target) && node.hasAttribute('hovered')){
                break
            }
        }
    })
    sbcontent.addEventListener('click',function(event){//选项的点击事件
        if(event.target.nodeName === 'A'){
            let searchBar = document.getElementById('SearchBar')
            let input = searchBar.getElementsByTagName('input')[0]
            input.value = event.target.innerText
            let button = searchBar.getElementsByTagName('button')[0]
            button.click()
        }
    })
    let sb = document.getElementById('SearchBar')
    sb.getElementsByTagName('input')[0].addEventListener('keydown',function(event){//搜索框的回车事件
        if(event.key === 'Enter'){
            document.getElementById('SearchBar').getElementsByTagName('button')[0].click()
        }
    })

    sb.getElementsByTagName('button')[0].addEventListener('click',function(event){//搜索框回车、点击选项最终触发的按钮点击事件
        //首先，要清空已有的招聘信息
        for(let el of document.querySelectorAll('.zhilian,.lagou,.zhipin,.wyjob,.liepin')){
            el.onclick = null
            el.remove()
        }
        let value = document.getElementById('SearchBar').getElementsByTagName('input')[0].value
        let message = {
            type:'search',
            from:'home',
            data:new Data('search',value)
        }
        //向其他标签页发送消息
        chrome.tabs.query({url:["https://www.liepin.com/*","https://c.liepin.com/*","https://www.zhipin.com/*","https://www.lagou.com/*","https://mkt.51job.com/*","https://we.51job.com/*","https://landing.zhaopin.com/*","https://xiaoyuan.zhaopin.com/*"]},function(tabs){
            for(let tab of tabs){
                chrome.tabs.sendMessage(tab.id,message)
            }
        })
    })

    let website = document.getElementById('website')
    website.appendChild(createWebsiteCard('Boss直聘','https://www.zhipin.com/web/geek/job?'))
    website.appendChild(createWebsiteCard('猎聘&emsp;&emsp;','https://www.liepin.com/zhaopin/?'))
    website.appendChild(createWebsiteCard('拉钩招聘','https://www.lagou.com/wn/jobs?'))
    website.appendChild(createWebsiteCard('前程无忧','https://we.51job.com/pc/search?'))
    website.appendChild(createWebsiteCard('智联招聘','https://xiaoyuan.zhaopin.com/search/jn=2&pg=2'))

    let messages = session.getItem()
    for(let message of messages){
        restore(message)
    }
})
/*
猎聘：/^https:\/\/www\.liepin\.com\/job\//.test(window.location.href)
Boss直聘：/^https:\/\/www\.zhipin\.com\/job_detail\//.test(window.location.href)
智联招聘：/^https:\/\/xiaoyuan\.zhaopin\.com\/job\//.test(window.location.href)
拉钩招聘：/^https:\/\/www\.lagou\.com\/wn\/jobs\/\d*\.html$/.test(window.location.href)
前程无忧：/^https:\/\/jobs\.51job\.com\/.*\/\d*\.html/.test(window.location.href)
*/
// chrome.tabs.onCreated.addListener((createtab)=>{
//     chrome.tabs.getCurrent().then(tab=>{
//         let regexps = [    
//             /^https:\/\/www\.liepin\.com\/job\//,
//             /^https:\/\/www\.zhipin\.com\/job_detail\//,
//             /^https:\/\/xiaoyuan\.zhaopin\.com\/job\//,
//             /^https:\/\/www\.lagou\.com\/wn\/jobs\/\d*\.html$/,
//             /^https:\/\/jobs\.51job\.com\/.*\/\d*\.html/
//         ]
//         if(regexps.reduce((p,v) => p || v.test(window.location.href),false)){
//             chrome.tabs.update(tab.id,{active:true})
//         }
//     })
// })
var locked = false
chrome.tabs.onActivated.addListener(function(activeInfo){
    //activeInfo 与 tabs.query({active: true, currentWindow: true}) 都返回当前窗口正在显示的标签页
    //activeInfo 只有tabId、windowId两个属性
    //tabs.getCurrent()才是真正获得当前脚本执行时所在的标签页的方法。
    if(locked){
        return
    }
    chrome.tabs.get(activeInfo.tabId).then(activetab=>{//如果需要判断url是否匹配
        chrome.tabs.getCurrent().then(tab=>{
            let regexps = [    
                /^https:\/\/www\.liepin\.com\/job\//,
                /^https:\/\/www\.zhipin\.com\/job_detail\//,
                /^https:\/\/xiaoyuan\.zhaopin\.com\/job\//,
                /^https:\/\/www\.lagou\.com\/wn\/jobs\/\d*\.html$/,
                /^https:\/\/jobs\.51job\.com\/.*\/\d*\.html/
            ]
            if(activeInfo.tabId !== tab.id && regexps.reduce((p,v) => p || v.test(activetab.url || activetab.pendingUrl),false)){
                chrome.tabs.update(activeInfo.tabId,{active:false})
                chrome.tabs.update(tab.id,{active:true})
            }
        })
    })
    locked = false
})
