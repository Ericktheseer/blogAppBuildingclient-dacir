<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const username = ref('')
const email = ref('')
const password = ref('')

const registerUser = async () => {

    try {

        const result = await api.post('/users/register', {
            username: username.value,
            email: email.value,
            password: password.value
        })

        notyf.success('Registration Successful')

        router.push('/login')

    } catch(error) {

        notyf.error(
            error.response?.data?.message ||
            'Registration Failed'
        )

    }

}
</script>

<template>

<div class="row justify-content-center">

    <div class="col-md-6">

        <div class="card shadow">

            <div class="card-body">

                <h2 class="mb-4">
                    Register
                </h2>

                <form @submit.prevent="registerUser">

                    <div class="mb-3">
                        <label class="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            v-model="username"
                            required
                        >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            class="form-control"
                            v-model="email"
                            required
                        >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            class="form-control"
                            v-model="password"
                            required
                        >
                    </div>

                    <button
                        class="btn btn-primary w-100"
                        type="submit"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    </div>

</div>

</template>