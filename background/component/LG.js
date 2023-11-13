class LG extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' +
        `<div class="lagou">
            <div class="lagou-block-1">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="lagou-block-2">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
            <div class="lagou-block-3">
                <div class="list">
                </div>
                <div class="list">
                </div>
            </div>
        </div>`
    }
    init(texts){
        /*为了逻辑更加简单，获得数组后在[1]插入''，若属于校招则将''改为'校招'*/
        /*通过判断元素是否包含两个img元素来判断是否为校招*/
        let span = document.createElement('span')
        let lists = this.getElementsByClassName('list')
        for(let i = 0;i < texts.length;i++){
            span.innerText = texts[i]
            if(i < 2 && texts[i] !== ''){
                lists[0].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 2 && i < 6){
                lists[2].appendChild(span.cloneNode(true))
                continue
            }
            if(i === 6){
                lists[1].appendChild(span.cloneNode(true))
                continue
            }
            if(i > 6 && i < 12){
                lists[3].appendChild(span.cloneNode(true))
                continue
            }
            if(i >= 12 && i !== texts.length - 1){
                lists[4].appendChild(span.cloneNode(true))
                continue
            }
            if(i === texts.length - 1){
                lists[5].innerText = texts[i]
            }
        }
    }
}


customElements.define('lg-job',LG,{extends:'div'})

export function createLG(texts){
    let el = document.createElement('div',{is:'lg-job'})
    el.init(texts)
    return el
}