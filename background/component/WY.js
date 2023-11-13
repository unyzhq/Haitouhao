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
        /*
        for(let l of document.querySelectorAll('[sensorsname="JobShortExposure"]')){
            let arr = Array.from(l.querySelectorAll('a,p[title]:not([data-v-61c80a42]),span:not([data-v-61c80a42])'),v=>v.innerText)
            if(!/\d/.test(arr[1])){
                arr.splice(1,0,'薪资面议')
            }
            if(['大专','本科','硕士','博士'].indexOf(arr[5]) === -1){
                arr.splice(5,0,'')
            }
            if(!/\d/.test(arr[9])){
                arr.splice(9,0,'')
            }
            console.log(arr)
        }
        前程无忧存在没有薪资的招聘信息，得到数组后，检查[1]是否包含数字，有则不变，否则在此插入'薪资面议'
        前程无忧存在不包含学历要求的招聘信息，完成上一步后，检查[5]是否为学历字符串，有则不变，否则在此插入''
        前程无忧公司tag的企业规模是可选项，完成上一步后，检查[9]是否包含数字，有则不变，否则在此插入''
        */
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