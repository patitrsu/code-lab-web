<script setup>
import { useRoute } from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import axios from 'axios';


const router = useRoute();
const username = defineModel('username')
const password = defineModel('password')

const onClickLogin = async () => {
    const response = await axios.post('http://localhost:5047/api/Authen/Login', {
        username: username.value,
        password : password.value
    });
    if(response.status === 200)
    {
        localStorage.setItem('accessToken', response.data.accessToken);
        location.href = '/transfer';
    }
    
}
</script>
<template>
    <main>
        <Card>
            <template #title>Login</template>
            <template #content>
                <form>
                    <div class="mt-4">
                        <InputText v-model="username" placeholder="Username" />
                    </div>
                    <div class="mt-4">
                        <InputText v-model="password" placeholder="Password" />
                    </div>
                    <div class="mt-4">
                        <Button label="Login" @click="onClickLogin" />
                    </div>
                </form>

            </template>
        </Card>
    </main>
</template>
