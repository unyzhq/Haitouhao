if(window.name === 'liepin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('div.jsx-2303460082.aside-photo')
            console.log(el)
            if(el !== null){
                let src = el.getElementsByTagName('img')[0].src
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('button.ant-btn.ant-btn-primary.ant-btn-round.ant-btn-lg.login-submit-btn') !== null){
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
            if(document.querySelector('ul.pull-up-content') !== null){

            }
        }
    })
    chrome.runtime.onMessage.addListener((message,sender,callback)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type = 'search'){
            let input = document.querySelector('input.jsx-4146333934')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('span.jsx-4146333934.search-btn')
            if(button !== null){//如果是首页，则点击按钮，招聘信息通过onload中的逻辑获取。
                button.click()
            }
            let data = []
            for(let item of getJobList()){
                let arr = Array.from(document.querySelectorAll('[style="margin-bottom: 10px;"]')[0].querySelectorAll('div[title],div.job-dq-box span,span.job-salary,div.job-labels-box span,img.company-logo-white-bg,span.company-name,div.company-tags-box span'),(v=>{
                    if(v.nodeName === 'img'){
                        return ''
                    }
                    return v.innerText
                }))
                arr.splice(0,4, arr[0] + '【' + arr[2] + '】')
                data.push(arr)
            }
            console.log(data)
            callback({type:'job',from:'liepin',data})
        }
    })


    // let data = []
    //     for(let li of document.querySelectorAll('li.pull-up-li')){
    //         data.push({
    //             jobname:li.querySelector('div.jsx-2693574896.ellipsis-1').innerText,
    //             salary:li.querySelector('span.jsx-2693574896.job-salary').innerText,
    //             tag:Array.from(li.querySelectorAll('span.jsx-2693574896.labels-tag'),v=>v.innerText),
    //             avatar:li.querySelector('div.jsx-2693574896.company-logo').firstElementChild.src,
    //             companyname:li.querySelector('span.jsx-2693574896.company-name.ellipsis-1').innerText,
    //             industry:li.querySelector('div.jsx-2693574896.company-tags-box.ellipsis-1')?.children[0]?.innerText,
    //             financing:li.querySelector('div.jsx-2693574896.company-tags-box.ellipsis-1')?.children[1]?.innerText,
    //             scale:li.querySelector('div.jsx-2693574896.company-tags-box.ellipsis-1')?.children[2]?.innerText
    //         })
    //     }
}