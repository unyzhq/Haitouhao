class WebsiteCard extends HTMLDivElement{
    constructor(){
        super()
        this.innerHTML = '' +
        `<div class="WebsiteCard">
            <button></button>
            <div>
                <div class="WebsiteCard-avatar"></div>
                <div class="WebsiteCard-status" online="false">
                    <div></div>
                    <span></span>
                </div>
            </div>
            <div class="WebsiteCard-title"></div>
        </div>`

        this.wcbutton = this.firstElementChild
        this.wcavatar = this.getElementsByClassName("WebsiteCard-avatar")[0]
        this.wcstatus = this.getElementsByClassName("WebsiteCard-status")[0]
        this.wctitle = this.getElementsByClassName("WebsiteCard-title")[0]

    }
    
}
