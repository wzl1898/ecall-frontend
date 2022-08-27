export default {
    saveUser(context, val){
        if (val.userPtUrl === null){
            console.log("null userPturl")
            val.userPtUrl = "1941bb38-5d3c-464e-80e3-836d7560e119.jpeg";
        }
        context.commit("SAVEUSER", val);
    },
    saveSse(context, val){
        context.commit("SAVESSE", val);
    },
    addUnreadMsgCount(context){
        context.commit("ADDUNREADMSGCOUNT");
    },
    saveSseMessage(context, val){
        console.log("val in action:", val)
        context.commit("SAVESSEMESSAGE", val)
    }
};