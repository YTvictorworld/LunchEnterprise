<template>
    <v-app class="root" theme="dark">
        <!-- <div class="loader">
      <div class="ring"></div>
    </div> -->
        <div class="container-body">
            <div id="app">
                <div class="drag"></div>
                <div class="navbar d-flex flex-wrap justify-content-center py-4 border-bottom" id="navbar">
                    <div class="menu-options">
                        <ul>
                            <li><button class="btn-minimize" @click="onMinimize">―</button></li>
                            <li><button class="btn-maximize" @click="OnMaximize">O</button></li>
                            <li>
                                <button class="btn-exit" @click="onExitClick"><span>X </span></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer>
                <div class="menuGamebar">
                    <div class="buttons">
                        <button class="btn-about">
                            <img src="https://img.icons8.com/arcade/64/null/minecraft-main-character.png" alt="about"
                                id="aboutIcon" />
                        </button>
                        <button class="btn-play" @click="onPlayClick">
                            PLAY
                            <p>release 1.8.8</p>
                        </button>
                        <v-menu :close-on-content-click="false" location="right">
                            <template v-slot:activator="{ props }">
                                <!-- {{ Object.keys(props) }} -->
                                <button class="btn-settings" v-bind="props">
                                    <img src="https://img.icons8.com/arcade/64/null/support.png" alt="settings"
                                        id="settingsIcon" />
                                </button>
                            </template>

                            <div class="settings-menu">
                                <div class="main1">
                                    <h1>Settings</h1>
                                    <div class="boxes"></div>

                                </div>
                            </div>
                        </v-menu>
                    </div>
                </div>
            </footer>
        </div>
    </v-app>

</template>

<script setup>
const { ipcRenderer } = require('electron');

const onPlayClick = () => {
    ipcRenderer.send("play");
}

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

<style scoped>
.main1 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;

    height: auto;
    padding: 0 15px;
    padding-bottom: 15px;
    width: auto;
    background-color: #c6c6c6;
    box-shadow: 8px 0 0 0 #555555,
        0 8px 0 0 #555555,
        4px 4px 0 0 #555555,
        -8px 0 0 0 #e8e8e8,
        0 -8px 0 0 #e8e8e8,
        -4px -4px 0 0 #e8e8e8,
        0 0 0 4px #b5b4b5,
        4px 8px 0 0 #555,
        8px 4px 0 0 #555,
        -4px -8px 0 0 #e8e8e8,
        -8px -4px 0 0 #e8e8e8,
        8px -4px 0 0 #000,
        4px -8px 0 0 #000,
        -8px 4px 0 0 #000,
        -4px 8px 0 0 #000,
        -8px -8px 0 0 #000,
        8px 8px 0 0 #000,
        -12px 0 0 0 #000,
        -12px -4px 0 0 #000,
        12px 0 0 0 #000,
        12px 4px 0 0 #000,
        0 -12px 0 0 #000,
        -4px -12px 0 0 #000,
        0 12px 0 0 #000,
        4px 12px 0 0 #000;
}

.box {
    height: var(--slot-size);
    width: var(--slot-size);
    background-color: #919191;
    box-shadow: 2px 2px 0 2px #e8e8e8,
        -2px -2px 0 2px #555,
        0 0 0 4px #8b8b8b;
}



h1 {
    font-family: 'MinecraftiaRegular';
    font-weight: normal;
    font-style: normal;
    color: #555;
    display: inline-block;
    width: 100%;
    font-size: 1.2em;
    line-height: 30px;
    margin-top: 0;
}

/* box-shadow: none|h-offset v-offset blur spread color |inset|initial|inherit; */


@media (max-width: 600px) {
    .main1 {
        padding: 0 8px;
        padding-bottom: 8px;

        box-shadow: 4px 0 0 0 #555555,
            0 4px 0 0 #555555,
            2px 2px 0 0 #555555,
            -4px 0 0 0 #e8e8e8,
            0 -4px 0 0 #e8e8e8,
            -2px -2px 0 0 #e8e8e8,
            0 0 0 2px #b5b4b5,
            2px 4px 0 0 #555,
            4px 2px 0 0 #555,
            -2px -4px 0 0 #e8e8e8,
            -4px -2px 0 0 #e8e8e8,
            4px -2px 0 0 #000,
            2px -4px 0 0 #000,
            -4px 2px 0 0 #000,
            -2px 4px 0 0 #000,
            -4px -4px 0 0 #000,
            4px 4px 0 0 #000,
            -6px 0 0 0 #000,
            -6px -2px 0 0 #000,
            6px 0 0 0 #000,
            6px 2px 0 0 #000,
            0 -6px 0 0 #000,
            -2px -6px 0 0 #000,
            0 6px 0 0 #000,
            2px 6px 0 0 #000;
    }

    h1 {
        font-size: 1rem;
    }
}
</style>