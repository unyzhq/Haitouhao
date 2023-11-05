let session = {
    getItem(){
        let len = Number(sessionStorage.getItem('length') === undefined ? 0 : sessionStorage.getItem('length'))
        let result = []
        for(let i = 0;i < len;i++){
            result.push(JSON.parse(sessionStorage.getItem(String(i))))
        }
        return result
    },
    setItem(data){
        let len = Number(sessionStorage.getItem('length') === undefined ? 0 : sessionStorage.getItem('length'))
        sessionStorage.setItem(String(len),JSON.stringify(data))
        sessionStorage.setItem('length',String(++len))
    }
}
export {session}