<template>
    <!-- <div class="loader">
      <div class="ring"></div>
    </div> -->
    <div class="container-body">
        <div class="bodyPart">
            <!--             <v-carousel id="carousel" cycle height="400" hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                    <v-sheet :color="colors[i]" height="100%">
                        <v-row class="fill-height" align="center" justify="center">
                            <div class="text-h2">{{ slide }} Slide</div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>    
 -->

 <!--    <v-btn @click="getUsername">test</v-btn>  -->

            <v-card>
                    <v-navigation-drawer id="profileCard" theme="dark" v-model="drawer" temporary>
                        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" :title=userName
                            style="top: 10px; padding: 5px; margin-bottom: 5px;"></v-list-item>
                            <div class="pa-2" id="Logout-Button">
                                <v-btn block @click="logout">
                                    Logout
                                </v-btn>
                            </div>
                        <v-divider></v-divider>
                        <v-list density="compact" nav>
                            <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
                            <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
                        </v-list>
                    </v-navigation-drawer>
                    <v-main>

                    </v-main>
            </v-card>

        </div>
        <footer>
            <div class="menuGamebar">
                <div class="buttons">


                    <button class="btn-about" @click.stop="drawer = !drawer" @click="getUsername">
                        <img src="https://img.icons8.com/arcade/64/null/minecraft-main-character.png" alt="about"
                            id="aboutIcon" />
                    </button>

                    <button class="btn-play">
                        <p id="play">PLAY</p>
                        <p id="version"><br />release {{ version }}</p>
                    </button>
                    <v-menu :close-on-content-click="false" @update:modelValue="saveConfig" location="right"
                        open-delay="0">
                        <template v-slot:activator="{ props }">
                            <button class="btn-settings" v-bind="props">
                                <img src="../../../../assets/imgs/settigs-icon.png" alt="settings" id="settingsIcon" />
                            </button>
                        </template>

                        <div class="settings-menu">
                            <div class="main1">
                                <h1>Settings</h1>

                                <div class="form">
                                    <v-select id="test" :items="items" label="Versions" v-model="version" dense>
                                    </v-select>

                                    <v-chip id="memoryChip" color="accent-4" outlined>
                                        Memory
                                    </v-chip>

                                    <v-text-field label="Min" placeholder="1000" v-model="MinMemroy"
                                        @keypress="onlyNumbers"></v-text-field>
                                    <v-text-field label="Max" placeholder="4000" v-model="MaxMemory"
                                        @keypress="onlyNumbers"></v-text-field>
                                    <!-- -->
                                </div>
                                <!-- <button class="advanced-opts">
                                        <p>Advanced</p>
                                    </button> -->
                                <v-dialog v-model="dialog" width="500">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="advanced-opts" v-bind="props">Advanced</v-btn>
                                    </template>
                                    <v-card>
                                        <v-toolbar dark color="success">
                                            <v-btn icon dark @click="dialog = false">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                            <v-toolbar-title class="fontMinecraft">Settings</v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-toolbar-items>
                                                <v-btn class="fontMinecraft" dark text @click="dialog = false">
                                                    Save
                                                </v-btn>
                                            </v-toolbar-items>
                                        </v-toolbar>
                                        <v-card-text id="DirectoryTextField">
                                            <!-- Minecraft location input -->
                                            <v-text-field label="Directory"
                                                placeholder="C:\Users\User\AppData\Roaming\.minecraft"></v-text-field>
                                        </v-card-text>
                                        <v-form>
                                            <v-container>
                                                <v-toolbar-title class="windowsSizeText">Window Size</v-toolbar-title>

                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="Height " placeholder="1024" outlined
                                                            @keypress="onlyNumbers"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="Width" placeholder="720" outlined
                                                            @keypress="onlyNumbers"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-card>
                                </v-dialog>
                            </div>
                        </div>
                    </v-menu>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" allowJs="true" setup>
import { ref, computed, reactive } from "vue";
import { useRouter } from 'vue-router'
//const sqlite = require('sqlite3').verbose();
//console.log(db)
//db.run('CREATE TABLE IF NOT EXISTS config (versionP TEXT)');
const { ipcRenderer, pushNotifications } = require("electron");
const path = require("path");
const os = require("os");
// const { push } = require("vue-router");

const { push } = useRouter()



const colors = [
    "indigo",
    "warning",
    "pink darken-2",
    "red lighten-1",
    "deep-purple accent-4",
];
const slds = ["First", "Second", "Third", "Fourth", "Fifth"];
const items = ["1.12.2", "1.8.8", "1.7.9", "1.12.2", "1.8.8", "1.7.9", "1.12.2", "1.8.8", "1.7.9", "1.12.2", "1.8.8", "1.7.9"];
const ver = "";
const MinM = "";
const MaxM = "";
const userN = "";

const userName = ref(userN);
const MinMemroy = ref(MinM);
const MaxMemory = ref(MaxM);
const version = ref(ver);
const slides = ref(slds);

const onlyNumbers = (evt) => {
    evt = evt ? evt : window.event;
    let expect = evt.target.value.toString() + evt.key.toString();

    if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
        evt.preventDefault();
    } else {
        return true;
    }
};
const dialog = ref(false);
const drawer = ref(false);
const minecraftLoc = ref(
    path.join(os.homedir(), "AppData", "Roaming", ".minecraft")
);

const config = reactive({
    version: version,
    MinMemory: MinMemroy,
    MaxMemory: MaxMemory,
    minecraftLoc: minecraftLoc,
});

const saveConfig = async (boolean) => {
    if (boolean == false) {
        ipcRenderer.send("saveConfig", { ...config });
    } else {
        const result = await ipcRenderer.invoke('getConfig')

        if (result == null) {
            return;
        } else {
            version.value = result.version
            MinMemroy.value = result.MinMemory
            MaxMemory.value = result.MaxMemory
            minecraftLoc.value = result.minecraftLoc
        }

    }
};

const getUsername = async () => {
    const result = await ipcRenderer.invoke('getData')
    return userName.value = result[0].username;
}

const logout = async () => {
    await ipcRenderer.invoke('logout')
    push('/')
}



//optimizar todo esto
</script>

<style scoped>
.v-main {
    background-color: #333;
    height: 100vh;
    margin: 0;
    padding: 0;
}


</style>
