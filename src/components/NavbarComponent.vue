<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
    isLoggedIn.value = !!localStorage.getItem('token')
}

const logoutUser = () => {
    localStorage.removeItem('token')
    isLoggedIn.value = false
    router.push('/login')
}

onMounted(() => {
    checkLoginStatus()
})
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

            <router-link class="navbar-brand" to="/posts">
                Blog App
            </router-link>

            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/posts">
                            Posts
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="isLoggedIn">
                        <router-link class="nav-link" to="/add-post">
                            Add Post
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/login">
                            Login
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/register">
                            Register
                        </router-link>
                    </li>

                    <li class="nav-item" v-if="isLoggedIn">
                        <button
                            class="btn btn-link nav-link"
                            @click="logoutUser"
                        >
                            Logout
                        </button>
                    </li>

                </ul>
            </div>

        </div>
    </nav>
</template>