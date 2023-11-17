if(window.name === '51job'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('a.uname.e_icon.at')
            if(el !== null){
                let src = document.querySelector('link[rel="icon"]').href
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('button#subBtn_m.btn') !== null){
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
                    let arr = Array.from(item.querySelectorAll('a,p[title]:not([data-v-61c80a42]),span:not([data-v-61c80a42])'),v=>v.innerText)
                    if(!/\d/.test(arr[1])){
                        arr.splice(1,0,'薪资面议')
                    }
                    if(['大专','本科','硕士','博士'].indexOf(arr[5]) === -1){
                        arr.splice(5,0,'')
                    }
                    if(!/\d/.test(arr[9])){
                        arr.splice(9,0,'')
                    }
                    data.push(arr)
                }
                chrome.runtime.sendMessage({type:'job',from:'51job',data})
            }
            observeJobList('div.job-list',sendMessage)
            sendMessage()
        }
        setTimeout(job,1000)
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'search'){
            let input = document.querySelector('input#keywordInput')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            document.getElementById('search_btn')?.click()
        }
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'job' && message.data?.click?.target === '51job'){
            getJobList()[message.data.click.index].querySelector('span[class="jname text-cut"]').click()
        }
    })
}else if(/^https:\/\/jobs.51job.com\//.test(window.location.href)){
    window.addEventListener('load',function(){
        let func = function(){
            let message = {
                type:'desc',
                from:'51job',
                data:Array.from(document.querySelectorAll('h1[title],div[class="cn"] strong,div[class="bmsg job_msg inbox"],p[class="fp"],a[class="com_name himg"] p'),v=>v.innerText)
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
Array.from(document.querySelectorAll('h1[title],div[class="cn"] strong,div[class="bmsg job_msg inbox"],p[class="fp"],a[class="com_name himg"] p'),v=>v.innerText)
(8) ['前端开发工程师（杭州/医疗）', '1.1-2万', '岗位职责：\n1. 负责公司现有产品的迭代开发和维护。\n2. 根据项目需求，定制前端界面，在Andro…年龄要求：\n35岁以下\n\n职能类别：\nWeb前端开发\n\n关键字：\nJavaScriptwebcss', '年龄要求：\n35岁以下', '职能类别：\nWeb前端开发', '关键字：\nJavaScriptwebcss', '上班地址：\n浙江省杭州市西湖区学院路77号黄龙国际中心B座9层901-1室', '上海清鹤科技股份有限公司']
*/