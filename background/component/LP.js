class LP extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' + 
        `<div class="liepin">
            <div class="liepin-block-1 list">
            </div>
            <div class="liepin-block-2 list">
            </div>
            <div class="liepin-block-3 list">
            </div>
        </div>`
    }
    init(texts){
        let span = document.createElement('span')
        let lists = this.getElementsByClassName('list')
        for(let i = 0;i < texts.length;i++){
            span.innerText = texts[i]
            if(i === 0 || i === 1){
                lists[0].appendChild(span.cloneNode(true))
                continue
            }
            if(i > 1 && i < texts.indexOf('') && i < 10){
                lists[1].appendChild(span.cloneNode(true))
            }
            if(i > texts.indexOf('')){
                lists[2].appendChild(span.cloneNode(true))
            }
        }
    }
}

customElements.define('lp-job',LP,{extends:'div'})

export function createLP(texts){
    let el = document.createElement('div',{is:'lp-job'})
    el.init(texts)
    return el
}