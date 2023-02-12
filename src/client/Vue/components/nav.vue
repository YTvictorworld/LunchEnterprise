<template>
    <div class="drag"></div>
    <div class="navbar d-flex flex-wrap justify-content-center py-4  border-bottom" id="navbar">
        <div class="menu-options">

            <ul>
                <li><button class="btn-minimize" id="minimize" @click="onMinimize">―</button></li>
                <li><button class="btn-maximize" id="maximize" @click="OnMaximize">O</button></li>
                <li>
                    <button class="btn-exit" id="exit" @click="onExitClick"><span>X </span></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import backButton from './back.vue'
const { ipcRenderer } = require("electron");
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