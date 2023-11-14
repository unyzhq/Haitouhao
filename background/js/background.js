import {createWebsiteCard} from "../component/WebsiteCard.js"
import "../component/JobCard.js"
import "./ListenerHandlers/job.js"
import { session } from "./ListenerHandlers/storage.js"
import { restore } from "./ListenerHandlers/website.js"
import {Data} from "./util.js"
window.addEventListener('load',()=>{
    document.addEventListener('click',function(event){
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
    sbcontent.addEventListener('mouseover',function(event){
        for(let node of document.getElementsByClassName('SearchBar-option')){
            if((node.contains(event.target) || node === event.target) && !node.hasAttribute('hovered')){
                document.querySelector('.SearchBar-option[hovered]')?.removeAttribute('hovered')
                node.setAttribute('hovered','')
            }else if((node.contains(event.target) || node === event.target) && node.hasAttribute('hovered')){
                break
            }
        }
    })
    sbcontent.addEventListener('click',function(event){
        if(event.target.nodeName === 'A'){
            let searchBar = document.getElementById('SearchBar')
            let input = searchBar.getElementsByTagName('input')[0]
            input.value = event.target.innerText
            let button = searchBar.getElementsByTagName('button')[0]
            button.click()
        }
    })
    let sb = document.getElementById('SearchBar')
    sb.getElementsByTagName('input')[0].addEventListener('keydown',function(event){
        if(event.key === 'Enter'){
            document.getElementById('SearchBar').getElementsByTagName('button')[0].click()
        }
    })

    sb.getElementsByTagName('button')[0].addEventListener('click',function(event){
        let value = document.getElementById('SearchBar').getElementsByTagName('input')[0].value
        let message = {
            type:'search',
            from:'home',
            data:new Data('search',value)
        }
        console.log(value)
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
