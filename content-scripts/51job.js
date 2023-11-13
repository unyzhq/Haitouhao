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
    })
    chrome.runtime.onMessage.addListener((message,sender,callback)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type = 'search'){
            let input = document.querySelector('input#keywordInput')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('button#search_btn')
            if(button !== null){
                button.click()
            }
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
            console.log(data)
            callback({type:'job',from:'51job',data})
        }
    })
}