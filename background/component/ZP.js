class ZP extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' + 
        `<div class="zhipin">
            <div class="zhipin-block-1">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="zhipin-block-2">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="zhipin-block-3">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
        </div>`
    }
    init(texts){
        let span = document.createElement('span')
        let lists = this.getElementsByClassName('list')
        for(let i = 0;i < texts.length;i++){
            span.innerText = texts[i]
            if(i < 2){
                lists[0].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 2 && i < 5){
                lists[2].appendChild(span.cloneNode(true))
                continue
            }
            if(i === 5){
                lists[1].appendChild(span.cloneNode(true))
                continue
            }
            if(i > 5 && i <= texts.findIndex(v=>/\d人/.test(v))){
                lists[3].appendChild(span.cloneNode(true))
                continue
            }
            if(i > texts.findIndex(v=>/\d人/.test(v)) && i < texts.length - 1){
                lists[4].appendChild(span.cloneNode(true))
                continue
            }
            if(i === texts.length - 1){
                lists[5].appendChild(span.cloneNode(true))
                continue
            }
        }
    }
}

customElements.define('zp-job',ZP,{extends:'div'})

export function createZP(texts){
    let el = document.createElement('div',{is:'zp-job'})
    el.init(texts)
    return el
}