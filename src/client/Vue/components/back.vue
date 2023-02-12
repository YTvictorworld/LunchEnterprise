<template>
    <v-btn @click="ba" class="btn-back" variant="outlined" icon="mdi-cached" color="orange"></v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'
const { back } = useRouter()
const ba = () => {
    back('/')
}
</script>

<style>
.btn-back {
    position: absolute;
    top: 60px;
    right: 470px;
}
</style>