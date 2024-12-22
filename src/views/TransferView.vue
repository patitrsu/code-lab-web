<script setup>
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { onMounted } from 'vue';
import axios from 'axios';
import { ref } from 'vue';

const products = ref();
const balance = ref();
const name = ref();
const accountNumber = ref();
const onGetUserDetails = async () => {
    let accessToken = localStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:5047/api/User/Balance',{ headers: {"Authorization" : `Bearer ${accessToken}`} });
    if(response.status === 200)
    {
        balance.value = response.data.balance;
        name.value = response.data.name;
        accountNumber.value = response.data.phoneNumber;
    }
}
const onGetTransaction = async () => {
    let accessToken = localStorage.getItem('accessToken');
    const response = await axios.get('http://localhost:5047/api/Transaction/GetTransactionById',{ headers: {"Authorization" : `Bearer ${accessToken}`} });
    if(response.status === 200)
    {
        products.value = response.data;
    }
}

onMounted(() => {
    onGetUserDetails();
    onGetTransaction();
});

</script>
<template>
    <main>
        <div class="mb-4">
            <Card>
                <template #title>Transfer</template>
                <template #content>

                    <div> 
                        <div class="mt-4">
                            - Name : {{ name }}
                        </div>
                        <div class="mt-4">
                            - Balance : {{ balance }} Bath
                        </div>
                        <div class="mt-4">
                            - AccountNumber : {{ accountNumber }}
                        </div>                  
                    </div>
                    <div>                   
                        <div class="mt-4">
                            <Button label="Receive" @click="$router.push('/receive')" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <div>
            <Card>
                <template #title>Transaction</template>
                <template #content>
                    <DataTable :value="products" tableStyle="min-width: 50rem">
                        <Column field="createdAt" header="Date Time"></Column>
                        <Column field="userId" header="User"></Column>
                        <Column field="remain" header="Remain"></Column>
                        <Column field="action" header="Action"></Column>
                        <Column field="fromUserId" header="From"></Column>
                        <Column field="amount" header="Amount"></Column>
                    </DataTable>

                </template>
            </Card>
        </div>

    </main>

</template>