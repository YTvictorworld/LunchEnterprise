<template>
    <v-app class="root" theme="light">
        <nava />
        <router-view />
    </v-app>
</template>

<script  setup>
import { useRouter } from 'vue-router'
import nava from './components/nav.vue'
import { computed } from 'vue'
const { ipcRenderer } = require("electron");

const { replace } = useRouter()

async function checkStatus() {
    const userCount = await ipcRenderer.invoke("userCount")
    if (userCount !== 0) {
        replace('/home')
    }
}

/* function passRichPresence() {
        //get the current vie
        //send the current view to the main process
        const router = useRouter()
        const currentView = computed(() => router.currentRoute.value)
        console.log(currentView.value)
        ipcRenderer.send("richPresence", currentView.value);
}

passRichPresence();*/
checkStatus(); 

</script>

<style>

</style>