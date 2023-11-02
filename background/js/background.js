import {createWebsiteCard} from "../component/WebsiteCard.js"
import "../component/JobCard.js"
window.onload = ()=>{
    let jc = document.createElement("div",{is:"job-card"})
    let content = document.getElementById('content')
    for(let i = 0;i < 20;i++){
        content.appendChild(jc.cloneNode(true))
    }
    let website = document.getElementById('website')
    website.appendChild(createWebsiteCard('Boss直聘','https://www.zhipin.com'))
    website.appendChild(createWebsiteCard('猎聘&emsp;&emsp;','https://wow.liepin.com/'))
    website.appendChild(createWebsiteCard('拉钩招聘','https://www.lagou.com/'))
    website.appendChild(createWebsiteCard('前程无忧','https://mkt.51job.com/tg/sem/LP_2022_BC.html'))
    website.appendChild(createWebsiteCard('智联招聘','https://landing.zhaopin.com/'))
}

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
