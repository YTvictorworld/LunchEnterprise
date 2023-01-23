<template>
    <v-app class="root" theme="light">
        <div class="drag"></div>
        <div class="navbar d-flex flex-wrap justify-content-center py-4 border-bottom" id="navbar">
            <div class="menu-options">
                <ul>
                    <li><button class="btn-minimize" id="minimize" @click="onMinimize">―</button></li>
                    <li><button class="btn-maximize" id="maximize" @click="OnMaximize">O</button></li>
                    <li>
                        <button class="btn-exit" id="exit" @click="onExitClick"><span>X </span></button>
                    </li>
                    <backButton />
                </ul>
            </div>
        </div>
        <router-view />
    </v-app>
</template>

<script setup>
import { useRouter } from 'vue-router'
import backButton from './components/back.vue'
const { ipcRenderer } = require("electron");

const { replace, back } = useRouter()

async function checkStatus() {
    const userCount = await ipcRenderer.invoke("userCount")
    if (userCount !== 0) {
        replace('/home')
    }
}

checkStatus()



const onExitClick = () => {
    ipcRenderer.send("exit");
}

const onMinimize = () => {
    ipcRenderer.send("minimize");
}

const OnMaximize = () => {
    ipcRenderer.send("maximize");
}

</script>

<style>

</style>