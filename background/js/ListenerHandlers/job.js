import { createLG } from "../../component/LG.js"
import { createLP } from "../../component/LP.js"
import { createWY } from "../../component/WY.js"
import { createZL } from "../../component/ZL.js"
import { createZP } from "../../component/ZP.js"
export function handle(message){
    if(message.type !== 'job'){
        return
    }
    let content = document.getElementById('content')
    for(let texts of message.data){
        if(message.from === 'lagou'){
            content.appendChild(createLG(texts))
        }
        if(message.from === 'liepin'){
            content.appendChild(createLP(texts))
        }
        if(message.from === '51job'){
            content.appendChild(createWY(texts))
        }
        if(message.from === 'zhilian'){
            content.appendChild(createZL(texts))
        }
        if(message.from === 'zhipin'){
            content.appendChild(createZP(texts))
        }
    }
}