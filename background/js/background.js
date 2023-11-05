import {createWebsiteCard} from "../component/WebsiteCard.js"
import "../component/JobCard.js"
import { session } from "./ListenerHandlers/storage.js"
import { restore } from "./ListenerHandlers/website.js"
window.addEventListener('load',()=>{
    let jc = document.createElement("div",{is:"job-card"})
    let content = document.getElementById('content')
    for(let i = 0;i < 20;i++){
        content.appendChild(jc.cloneNode(true))
    }

    let website = document.getElementById('website')
    website.appendChild(createWebsiteCard('Boss直聘','https://www.zhipin.com/web/user/?ka=header-login'))
    website.appendChild(createWebsiteCard('猎聘&emsp;&emsp;','https://www.liepin.com/'))
    website.appendChild(createWebsiteCard('拉钩招聘','https://www.lagou.com/'))
    website.appendChild(createWebsiteCard('前程无忧','https://we.51job.com/pc/my/myjob'))
    website.appendChild(createWebsiteCard('智联招聘','https://xiaoyuan.zhaopin.com/search/jn=2&pg=2'))

    let messages = session.getItem()
    for(let message of messages){
        restore(message)
    }
})
// chrome.runtime.onMessage.addListener((data,sender,callback)=>{
//     console.log(data)
//     console.log(sender)
//     callback()
//     let cards = document.getElementsByClassName('WebsiteCard')
//     let card,button,avatar,statue
//     if(data.from === 'zhipin'){
//         card = cards[0]
//     }
//     avatar = card.getElementsByClassName('WebsiteCard-avatar')[0]
//     statue = card.getElementsByClassName('WebsiteCard-status')[0]
//     button = card.getElementsByTagName('button')[0]
//     switch(data.type){
//         case 'img':
//             avatar.style.setProperty('background-image',`url(${data.data.src})`)
//             statue.setAttribute('online','true')
//             button.style.setProperty('opacity','0')
//             break
//         case 'signout':
//             avatar.style.removeProperty('background-image')
//             statue.setAttribute('online','false')
//             button.style.removeProperty('opacity')
//             break
//     }
// })

// function createRemoteClick(fn,type,callback){
//     return function(){
//         try{
//             chrome.tabs.query({},function(tabs){
//                 for(let tab of tabs){
//                     chrome.tabs.sendMessage(tab.id,type,callback)
//                 }
//             })
//             fn()
//         }catch(err){
//             console.log(err)
//         }
//     }
// }
