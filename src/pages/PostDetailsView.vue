<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const route = useRoute()
const router = useRouter()
const notyf = new Notyf()

const post = ref(null)

const getPost = async () => {
    try {
        const result = await api.get(`/posts/${route.params.id}`)
        post.value = result.data.post
    } catch(error) {
        console.log(error)
    }
}

const deletePost = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?')

    if(!confirmDelete) {
        return
    }

    try {
        await api.delete(`/posts/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        notyf.success('Post Deleted Successfully')
        router.push('/posts')

    } catch(error) {
        notyf.error(
            error.response?.data?.message ||
            'Delete Failed'
        )
    }
}

onMounted(() => {
    getPost()
})
</script>

<template>
    <div v-if="post">
        <h1>{{ post.title }}</h1>

        <p class="text-muted">
            Author: {{ post.author?.username }}
        </p>

        <hr>

        <p>{{ post.content }}</p>

        <div class="mt-4">
            <router-link
                class="btn btn-warning me-2"
                :to="`/edit-post/${post._id}`"
            >
                Edit Post
            </router-link>

            <button
                class="btn btn-danger"
                @click="deletePost"
            >
                Delete Post
            </button>
        </div>
    </div>
</template>