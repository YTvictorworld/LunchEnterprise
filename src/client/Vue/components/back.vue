<template>
    <li><v-btn elevation="2" @click="ba">back</v-btn></li>
</template>

<script setup>
import { useRouter } from 'vue-router'
const { back } = useRouter()
const ba = () => {
    back('/')
}
</script>

<style>

</style>