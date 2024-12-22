<script setup>
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import axios from 'axios';
import { ref } from 'vue';

const balance = ref();
const accountNumber = ref();
const selectedPaid = ref();
const cities = ref([
    { name: 'Transfer', code: 'TF' },
    { name: 'Deposit', code: 'DP' },
    { name: 'Withdraw', code: 'WD' },
]);



const onClickReceive = () => {
    
    let accessToken = localStorage.getItem('accessToken');
    axios.post('http://localhost:5047/api/Transaction/CreateTransaction', {
        accountNumber: accountNumber.value,
        amount: balance.value,
        action: selectedPaid.value.name
    },{ headers: {"Authorization" : `Bearer ${accessToken}`} }).then(response => {
        if(response.status === 200)
        {
            alert('Receive Success');
            window.location.href = '/transfer';
        }
    }).catch(error => {
        alert('Receive Fail');
    });
}
</script>
<template>
    <main>
        <div class="mb-4">
            <Card>
                <template #title>Receive</template>
                <template #content>
                    <div class="mt-4">
                        <div class="mb-4 flex justify-content-start">
                            <InputNumber v-model="balance" inputId="balance" :minFractionDigits="2" :maxFractionDigits="5" />
                        </div>
                        <div class="mb-4 flex justify-content-start">
                            <InputText v-model="accountNumber" placeholder="Account Number" />
                        </div>
                        <div class="flex justify-content-center">
                            <Dropdown v-model="selectedPaid" :options="cities" optionLabel="name"
                                placeholder="Select Type Paid" class="w-full md:w-14rem" />
                        </div>
                        <div class="mt-4">
                            <Button label="Recive" @click="onClickReceive" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </main>

</template>