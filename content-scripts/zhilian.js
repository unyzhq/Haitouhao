if(window.name === 'zhaopin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('span.name-info-normal')
            if(el !== null){
                let src = document.querySelector('link[rel="shortcut icon"]').href
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('div.zppp.zppp-wrapper.zppp-wrapper-normal') !== null){
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data(new Data('signout',true))
                }
                chrome.runtime.sendMessage(message)
            }
        }
        setTimeout(func,1000)

        let job = function(){
            let sendMessage = function(){
                let data = []
                for(let item of getJobList()){
                    let arr = item.innerText.split(/\s/)
                    data.push(arr)
                }
                chrome.runtime.sendMessage({type:'job',from:'zhilian',data})
            }
            observeJobList('div.el-tabs__content',sendMessage)
            sendMessage()
        }
        setTimeout(job,1000)

    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'search'){
            let input = document.querySelector('input#search_input_one')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            document.querySelector('span.search_btn')?.click()
        }
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'job' && message.data?.click?.target === 'zhilian'){
            getJobList()[message.data.click.index].querySelector('div[class="fn-left position"]').click()
        }
    })
}else if(/^https:\/\/xiaoyuan.zhaopin.com\//.test(window.location.href)){
    window.addEventListener('load',function(){
        let func = function(){
            let message = {
                type:'desc',
                from:'zhilian',
                data:Array.from(document.querySelectorAll('span[class="name"] span,p[class="company-name"] span,span[class="address"] span,div[class="describe"]'),v=>v.innerText)
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
Array.from(document.querySelectorAll('span[class="name"] span,p[class="company-name"] span,span[class="address"] span,div[class="describe"]'),v=>v.innerText)
(5) ['Web开发工程师', '深圳市天软科技开发有限公司', '上海', '-浦东新区', '岗位职责：\n1. 根据产品及运营需求进行软件设计；\n2. 设计开发数据库脚本、编写web后端代码；\n…欢迎应届生。\n\n\n职位福利：五险一金、年底双薪、带薪年假、弹性工作、定期体检、节日福利、周末双休\n']
*/