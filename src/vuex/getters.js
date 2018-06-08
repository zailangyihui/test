// 这个 getter 函数会返回 state 的值


export const env = state=>state.env
export const ajaxerror = state=>state.ajaxerror
export const quit = state=>state.quit
export const rid = state=>state.rid
export const passageway = state=>state.passageway
export const user = state=>state.user
export const hongbao = state=>state.hongbao
/*export const chat = (state)=> {
    let betList = []
    state.chat.sessions.forEach(function(item){
        betList.push(item)
    })
    return betList.sort(Util.sortBy('time', false))
}*/
export const payurl = state => state.payurl
export const load = state => state.load
export const betIndex = state=>state.betIndex
export const betHistory = state=>state.betHistory
