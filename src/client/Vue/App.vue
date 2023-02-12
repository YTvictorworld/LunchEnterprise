<template>
    <v-app class="root" theme="light">
        <nava />
        <router-view />
    </v-app>
</template>

<script  setup>
import { useRouter } from 'vue-router'
import nava from './components/nav.vue'
const { ipcRenderer } = require("electron");

const { replace } = useRouter()

async function checkStatus() {
    const userCount = await ipcRenderer.invoke("userCount")
    if (userCount !== 0) {
        replace('/home')
    }
}

checkStatus()

</script>

<style>

</style>