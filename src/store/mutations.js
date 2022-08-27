export default {
    SAVEUSER(state, val){
        state.user = val;
    },
    SAVESSE(state, val){
        state.sse = val;
    },
    ADDUNREADMSGCOUNT(state){
        state.unReadMsgCount++;
    },
    SAVESSEMESSAGE(state, val){
        state.sseMessage = val;
    }
};