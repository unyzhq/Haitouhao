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
    })
}