import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../components/Test'
import Login from '../components/Login'
import Register from '../components/Register'
import Welcome from '../components/Welcome'
import Home from '../components/Home'
import Personal from '../components/Personal'
import EditProfile from '../components/EditProfile'
import EditDiary from '../components/EditDiary'
import MyDiary from '../components/MyDiary'
import DiaryDetail from '../components/DiaryDetail'
import ChatList from '../components/ChatList'
import Chat from '../components/Chat'
import AnalysisCenter from '../components/AnalysisCenter'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/test",
            component: Test,
        },
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/register",
            component: Register,
        },
        {
            path: "/welcome",
            component: Welcome,
        },
        {
            path: "/home",
            component: Home,
        },
        {
            path: "/personal",
            component: Personal,
        },
        {
            path: "/editProfile",
            component: EditProfile,
        },
        {
            path: "/editDiary",
            component: EditDiary,
        },
        {
            path: "/myDiary",
            component: MyDiary,
        },
        {
            name: "diary",
            path: "/diary/:diaryStr",
            component: DiaryDetail,
        },
        {
            path: "/chatList/:dataStr/:diaryStr",
            component: ChatList,
        },
        {
            path: "/chat/:userId",
            component: Chat,
        },
        {
            path: "/analysisCenter",
            component: AnalysisCenter,
        },
    ]
});

export default router;