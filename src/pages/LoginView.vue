<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const email = ref('')
const password = ref('')

const loginUser = async () => {
    try {
        const result = await api.post('/users/login', {
            email: email.value,
            password: password.value
        })

        localStorage.setItem('token', result.data.access)

        window.location.href = '/posts'

        notyf.success('Login Successful')

    } catch(error) {
        notyf.error(
            error.response?.data?.message ||
            'Login Failed'
        )
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">

            <div class="card shadow">
                <div class="card-body">

                    <h2 class="mb-4">Login</h2>

                    <form @submit.prevent="loginUser">

                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input
                                type="email"
                                class="form-control"
                                v-model="email"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                v-model="password"
                                required
                            >
                        </div>

                        <button class="btn btn-primary w-100" type="submit">
                            Login
                        </button>

                    </form>

                </div>
            </div>

        </div>
    </div>
</template>