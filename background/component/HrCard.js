class HrCard extends HTMLDivElement{
    constructor(){
        super()
        this.classList.add('HrCard')
        this.innerHTML = '' +
        `<div class="HrCard-hover"></div>
        <div class="HrCard-avatar"></div>
        <div class="HrCard-info">
            <div>
                <span class="HrCard-name">吴先生</span>
                <span class="HrCard-company">叮当科技</span>
            </div>
            <span class="HrCard-lastmessage">
                你好
            </span>
        </div>`

        this.hcavatar = this.getElementsByClassName('HrCard-avatar')[0]
        this.hcname = this.getElementsByClassName('HrCard-name')[0]
        this.hccompany = this.getElementsByClassName('HrCard-company')[0]
        this.hclastmessage = this.getElementsByClassName('HrCard-lastmessage')[0]
    }
}

customElements.define('hr-card',HrCard,{extends:'div'})