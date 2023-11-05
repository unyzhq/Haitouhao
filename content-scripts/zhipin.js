if(window.name === 'zhipin'){
    window.addEventListener('load',function(){
        let func = function(){
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
        setTimeout(func,1000)
    })
}