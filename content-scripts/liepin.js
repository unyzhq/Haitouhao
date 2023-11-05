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
    })
}