class WY extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' + 
        `<div class="wyjob">
            <div class="wyjob-block-1 list">
            </div>
            <div class="wyjob-block-2">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="wyjob-block-3 list">
            </div>
        </div>`
    }
    init(texts){
        let span = document.createElement('span')
        let lists = this.getElementsByClassName('list')
        for(let i = 0;i < texts.length;i++){
            span.innerText = texts[i]
            if(i === 0 || i === 6){
                lists[0].appendChild(span.cloneNode(true))
                continue
            }
            if(i === 1 || i !== 2 && i < 6 && texts[i] !== ''){
                lists[1].appendChild(span.cloneNode(true))
                continue
            }
            if(i > 6 && i < 10 && texts[i] !== ''){
                lists[2].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 10 && i !== texts.length - 1){
                lists[3].appendChild(span.cloneNode(true))
                continue
            }
        }
    }
}

customElements.define('wy-job',WY,{extends:'div'})

export function createWY(texts){
    let el = document.createElement('div',{is:'wy-job'})
    el.init(texts)
    return el
}