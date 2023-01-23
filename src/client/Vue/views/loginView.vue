<template>
    <div class="login-box">
        <img class="avatar" src="../../../../assets/imgs/minecraft-creeper-face.jpg" alt="LogoLMC" />
        <h1>LunchMc - AlphaVersion</h1>
        <form id="form">
            <label for="username"></label>
            <v-text-field classs="fontMinecraft" v-model="firstname" :rules="nameRules" :counter="26" label="Username"
                required></v-text-field>

            <!--- [This is for the future]
                <label for="password">Password</label>
                <input type="password" placeholder="Enter Password">
                
                 <a href="#">NoPremium Login</a> 
            -->
            <v-btn id="input" :disabled="blockButton" @click="login" @keypress.enter="login">Login</v-btn>
        </form>
    </div>

</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const { ipcRenderer } = require("electron");

const blockButton = computed(() => {
    if (firstname.value == "") {
        return true;
    } else {
        return false;
    }
})

const { push } = useRouter()

const login = async () => {
    const success = await ipcRenderer.invoke("login", firstname.value);

    console.log('result ' + success)
    if (success) {
        push("/home") // go to the home page
    }
}

const firstname = ref('')

const nameRules = [
    v => !!v || 'Name is required',
    v => (v && v.length <= 26) || 'Name must be less than 10 characters',
]

</script>