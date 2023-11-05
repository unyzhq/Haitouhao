class WebsiteCard extends HTMLDivElement{
    constructor(){
        super()
        this.classList.add('WebsiteCard')
        this.innerHTML = '' +
        `<button></button>
        <div>
            <div class="WebsiteCard-avatar"></div>
            <div class="WebsiteCard-status" online="false">
                <div></div>
                <span></span>
            </div>
        </div>
        <div class="WebsiteCard-title">Boss直聘</div>`
        //经测试，super()之后，this就与一个元素引用无异，给innerHTML赋值后可以立即通过元素获取方法获取。
        this.wcbutton = this.firstElementChild
        this.wcavatar = this.getElementsByClassName("WebsiteCard-avatar")[0]
        this.wcstatus = this.getElementsByClassName("WebsiteCard-status")[0]
        this.wctitle = this.getElementsByClassName("WebsiteCard-title")[0]
        this.state = {
            src:'',
            online: false
        }
    }
    clear(){
        this.wctitle.innerHTML = ''
    }
    getState(){
        return this.state
    }
    setState(state){
        if(state.src !== undefined){
            this.wcavatar.style.setProperty('background-image',`url(${state.src})`)
            this.state.src = state.src
            state.online = true
        }
        if(state.online !== undefined){
            this.wcstatus.setAttribute('online',state.online)
            this.wcbutton.style.setProperty('display',state.online? 'none' : 'auto')
            this.state.online = state.online
        }
    }
}
//define("元素名",元素类,{extends:"继承的元素(小写)"})
//元素名命名规则：不能出现大写字符，并且必须包含一个'-'。

customElements.define("website-card",WebsiteCard,{extends:"div"})

//然后就可以在html中使用 <div is="website-card"></div> 或 document.createElement('div',{is:"website-card"}) 创建自定义元素。
//如果继承的是HTMLElement，则{extends:"继承的元素(小写)"}可以省略，
//这种方式定义的自定义元素创建方式与其他内置元素相同，
//即可以直接<元素名></元素名> 或 document.createElement('元素名')创建。

export function createWebsiteCard(/*标题，网址*/){
    let el = document.createElement('div',{is:'website-card'})
    if(arguments.length === 0){
        return el
    }else{
        el.clear()
        el.wctitle.innerHTML = arguments[0]
        el.wcbutton.addEventListener('click',()=>{
            let reg = /(?<=\.)\w+(?=\.)/g
            window.open(arguments[1],reg.exec(arguments[1])[0])
        })
        return el
    }
}