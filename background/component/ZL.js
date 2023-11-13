class ZL extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' + 
        `<div class="zhilian">
            <div class="zhilian-block-1 list">
            </div>
            <div class="zhilian-block-2">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="zhilian-block-3">
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
            if(i < 3 && i !== 1){
                lists[0].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 3 && i < 9 && texts[i] !== ''){
                lists[1].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 9 && i < 11){
                lists[2].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 11 && i !== texts.length - 1){
                lists[3].appendChild(span.cloneNode(true))
                continue
            }
            if(i === texts.length - 1){
                lists[4].innerText = texts[i]
            }
        }
    }
}

customElements.define('zl-job',ZL,{extends:'div'})

export function createZL(texts){
    let el = document.createElement('div',{is:'zl-job'})
    el.init(texts)
    return el
}