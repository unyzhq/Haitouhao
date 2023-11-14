if(window.name === 'zhipin'){
    window.addEventListener('load',function(){
        let login = function(){
            let el = document.querySelector('li.nav-figure')
            if(el !== null){
                let src = el.getElementsByTagName('img')[0].src
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(window.location.href === 'https://www.zhipin.com/web/user/?ka=header-login'){
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data(new Data('signout',true))
                }
                chrome.runtime.sendMessage(message)
            }
        }
        setTimeout(login,1000)
        
        let job = function(){
            let sendMessage = function(){
                let data = []
                for(let item of getJobList()){
                    let arr = Array.from(item.querySelectorAll('.job-name,.job-area,h3.company-name a,.salary,.salary ~ .tag-list li,.company-tag-list li,.job-card-footer .tag-list li,.info-desc'),v=>v.innerText)
                    data.push(arr)
                }
                chrome.runtime.sendMessage({type:'job',from:'zhipin',data})
            }
            observeJobList('div.search-job-result',sendMessage)
            sendMessage()
        }
        setTimeout(job,1000)
        // let job = function(){
        //     if(document.querySelector('div.search-job-result') !== null){
        //         let mutation = new MutationObserver(records=>{
        //             if(records[0].type === 'childList' && records[0].addedNodes[0].classList.contains('job-list-box')){
        //                 setTimeout(()=>{
        //                     let data = []
        //                     for(let li of document.querySelectorAll('li.job-card-wrapper')){
        //                         data.push({
        //                             jobname:li.querySelector('span.job-name').innerText,
        //                             salary:li.querySelector('span.salary').innerText,
        //                             tag:Array.from(li.querySelector('ul.tag-list').children,(v=>v.innerText)),
        //                             avatar:li.querySelector('img').src,
        //                             companyname:li.querySelector('h3.company-name').innerText,
        //                             industry:li.querySelector('ul.company-tag-list').firstElementChild.innerText,
        //                             financing:li.querySelector('ul.company-tag-list').children[1].innerText,
        //                             scale:li.querySelector('ul.company-tag-list').lastElementChild.innerText
        //                         })
        //                     }
        //                     let message = {
        //                         type: 'job',
        //                         from: window.name,
        //                         data: data
        //                     }
        //                     chrome.runtime.sendMessage(message)
        //                 },1000)
        //             }
        //         })
        //         mutation.observe(document.querySelector('div.search-job-result'),{childList:true})

        //         let data = []
        //         for(let li of document.querySelectorAll('li.job-card-wrapper')){
        //             data.push({
        //                 jobname:li.querySelector('span.job-name').innerText,
        //                 salary:li.querySelector('span.salary').innerText,
        //                 tag:Array.from(li.querySelector('ul.tag-list').children,(v=>v.innerText)),
        //                 avatar:li.querySelector('img').src,
        //                 companyname:li.querySelector('h3.company-name').innerText,
        //                 industry:li.querySelector('ul.company-tag-list').firstElementChild.innerText,
        //                 financing:li.querySelector('ul.company-tag-list').children[1].innerText,
        //                 scale:li.querySelector('ul.company-tag-list').lastElementChild.innerText
        //             })
        //         }
        //         let message = {
        //             type: 'job',
        //             from: window.name,
        //             data: data
        //         }
        //         chrome.runtime.sendMessage(message)
        //     }
        // }
        // this.setTimeout(job,1000)
        
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type = 'search'){
            let input = document.querySelector('input[name="query"].ipt-search') || document.querySelector('input[placeholder].input')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })    
}