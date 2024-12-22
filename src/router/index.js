import {createRouter, createWebHistory} from 'vue-router';
import TransferView from '../views/TransferView.vue';
import LoginView from '../views/LoginView.vue';
import ReceiveView from '../views/ReceiveView.vue';

const route = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: LoginView
        },
        {
            path: '/transfer',
            name: 'Transfer',
            component:TransferView
        },
        {
            path: '/receive',
            name: 'Receive',
            component:ReceiveView
        }
    ]
})

export default route;