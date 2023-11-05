import { session } from "./storage.js"
function getCard(from){
    let web = ['zhipin','liepin','lagou','51job','zhaopin']
    let index = web.indexOf(from)
    return index !== -1 ? document.getElementsByClassName('WebsiteCard')[index] : -1
}
function handler(message,sender,callback){
    if(message.type !== 'website'){
        return
    }
    let card = getCard(message.from)
    if(card === -1){
        return -1
    }
    if(message.data.img !== undefined){
        card.setState({src:message.data.img.src})
    }
    if(message.data.signout !== undefined){
        card.setState({online:message.data.signout})
    }
    callback()
    return card.getState()
}
function restore(message_){
    if(message_.type !== 'website'){
        return
    }
    let card = getCard(message_.from)
    card.setState(message_.state)
}

chrome.runtime.onMessage.addListener(function(message,sender,callback){
    let state = handler(message,sender,callback)
    if(state === -1){
        return
    }
    session.setItem({type:message.type,from:message.from,state:state})
})

export {restore}