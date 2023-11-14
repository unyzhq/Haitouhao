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
                    data: new Data(new Data('signout',true))
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
        if(message.type = 'search'){
            let input = document.querySelector('input#search_input') || document.querySelector('input.search-input__1smvz')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })
}