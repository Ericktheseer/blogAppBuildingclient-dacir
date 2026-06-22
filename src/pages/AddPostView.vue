<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const router = useRouter()
const notyf = new Notyf()

const title = ref('')
const content = ref('')

const addPost = async () => {
    try {
        await api.post('/posts', {
            title: title.value,
            content: content.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        notyf.success('Post Created Successfully')
        router.push('/posts')

    } catch(error) {
        notyf.error(
            error.response?.data?.message ||
            'Failed to create post'
        )
    }
}
</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-8">

            <div class="card shadow">
                <div class="card-body">

                    <h2 class="mb-4">Add Blog Post</h2>

                    <form @submit.prevent="addPost">

                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="title"
                                required
                            >
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Content</label>
                            <textarea
                                class="form-control"
                                rows="6"
                                v-model="content"
                                required
                            ></textarea>
                        </div>

                        <button class="btn btn-primary" type="submit">
                            Add Post
                        </button>

                    </form>

                </div>
            </div>

        </div>
    </div>
</template>