class JobCard extends HTMLDivElement{
    constructor(){
        super()
        this.classList.add('JobCard')
        this.innerHTML = '' +
        `<div class=JobCard-hover></div>
        <div class="JobCard-info">
            <div>
                <span class="JobCard-jobname">电商运营</span>
                <span class="JobCard-salary">12-20k</span>
            </div>
            <div class="JobCard-tag">
                <span>深圳</span>
                <span>1-3年</span>
                <span>学历不限</span>
                <span>自有电商平台</span>
            </div>
        </div>
        <div class="JobCard-company">
            <div>
                <div class="JobCard-avatar"></div>
                <span class="JobCard-companyname">壹百科技</span>
            </div>
            <div>
                <span class="JobCard-industry">互联网</span>
                <span>I</span>
                <span class="JobCard-financing">不需要融资</span>
            </div>
        </div>`
        
        this.jcjobname = this.getElementsByClassName("JobCard-jobname")[0]
        this.jcsalary = this.getElementsByClassName("JobCard-salary")[0]
        this.jctag = this.getElementsByClassName("JobCard-tag")[0]
        this.jcavatar = this.getElementsByClassName("JobCard-avatar")[0]
        this.jccompanyname = this.getElementsByClassName("JobCard-companyname")[0]
        this.jcindustry = this.getElementsByClassName("JobCard-industry")[0]
        this.jcfinancing = this.getElementsByClassName("JobCard-financing")[0]
    }
    clear(){
        this.jcjobname.innerHTML = ''
        this.jcsalary.innerHTML = ''
        this.jctag.innerHTML = ''
        this.jcavatar.innerHTML = ''
        this.jccompanyname.innerHTML = ''
        this.jcindustry.innerHTML = ''
        this.jcfinancing.innerHTML = ''
    }
}

customElements.define("job-card",JobCard,{extends:"div"})