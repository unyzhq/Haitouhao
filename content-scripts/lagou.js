if(/^lagou/.test(window.name)){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('li.user_dropdown')
            if(el !== null){
                let src = document.querySelector('link[rel="Shortcut Icon"]').href
                let message = {
                    type: 'website',
                    from: /^lagou/.exec(window.name)[0],
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('a.login') !== null){
                let message = {
                    type: 'website',
                    from: /^lagou/.exec(window.name)[0],
                    data: new Data('signout',true)
                }
                chrome.runtime.sendMessage(message)
            }
        }
        setTimeout(func,1000)

        let job = function(){//拉钩会重定向，因此不需要监听元素。
            let data = []
            for(let item of document.getElementsByClassName('item__10RTO')){
                let arr_ = Array.from(item.querySelectorAll('div.position__21iOS a,div.company__2EsC8 a,div.p-bom__JlNur,div.industry__1HBkr,div.ir___QwEG span'),v=>{
                    if(/\dk/.test(v.innerText)){
                        let index = v.innerText.lastIndexOf('k') + 1
                        let str = v.innerText.slice(0,index) + ' ' + v.innerText.slice(index)
                        return str.split(/\s/)
                    }
                    return v.innerText.split(/\s/)
                })
                let arr = []
                for(let i = 0;i < arr_.length;i++){
                    arr.push(...arr_[i])
                }
                arr.splice(1,0,'')
                if(item.querySelector('[src="https://lagou-zhaopin-fe.lagou.com/fed/lg-www-fed/position/pc/xiaozhao.png"]')!==null){
                    arr[1] = '校招'
                }
                data.push(arr)
            }
            chrome.runtime.sendMessage({type:'job',from:'lagou',data})
        }
        setTimeout(job,1000)
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'search'){
            let input = document.querySelector('input#search_input') || document.querySelector('input.search-input__1smvz')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'job' && message.data?.click?.target === 'lagou'){
            getJobList()[message.data.click.index].querySelector('a[id="openWinPostion"]').click()
        }
    })
}else if(/^https:\/\/www.lagou.com\//.test(window.location.href)){
    window.addEventListener('load',function(){
        let func = function(){
            let data = Array.from(document.querySelectorAll('span[class="ceil-job"],span[class="name__36WTQ"],span[class="ceil-salary"],span[class="salary__22Kt_"],span[class="company"],div[class="job-detail"],dd[class="label-wrapper"],div[class="work_addr"] *:not(:last-child)'),v=>v.innerText)
            if(document.querySelector('dd[class="label-wrapper"]')){
                data.splice(3,2,data[3] + '\n' + data[4])
            }
            let message = {
                type:'desc',
                from:'lagou',
                data
            }
            chrome.runtime.sendMessage(message)
        }
        setTimeout(func,1000)
    })
    window.__close__ = Symbol()
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'close' && window.__close__){
            window.close()
        }
    })
}
/*
Array.from(document.querySelectorAll('span[class="ceil-job"],span[class="ceil-salary"],span[class="company"],div[class="job-detail"],div[class="work_addr"] *:not(:last-child)'),v=>v.innerText)
(9) ['雄岸區塊鏈集團', '前端开发工程师/', '20k-40k·16薪', '雄岸區塊鏈集團', '岗位职责：\n1、负责网站应用前端开发，与后台工程师协作，完成数据交互、动态信息展现；\n2、使用JS封…、具备较强的自驱力，良好的团队协作能力，能承受一定的工作压力。\n11、有微前端架构经验优先考虑。\n', '深圳', '南山区', '西丽', '- 科技园']
*/