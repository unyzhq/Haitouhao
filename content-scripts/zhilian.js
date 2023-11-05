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
    })
    
}