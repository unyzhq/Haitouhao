class MessageCard extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = ''+
        `<span></span>`
    }
}

customElements.define('message-card',MessageCard,{extends: 'div'})