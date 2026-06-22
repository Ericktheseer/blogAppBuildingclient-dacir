<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const posts = ref([])

const getPosts = async () => {
    try {
        const result = await api.get('/posts')
        posts.value = result.data.posts
    } catch(error) {
        console.log(error)
    }
}

onMounted(() => {
    getPosts()
})
</script>

<template>
    <div>
        <h2 class="mb-4">Blog Posts</h2>

        <div v-if="posts.length === 0" class="alert alert-info">
            No posts available.
        </div>

        <div
            class="card mb-3"
            v-for="post in posts"
            :key="post._id"
        >
            <div class="card-body">
                <h5 class="card-title">
                    {{ post.title }}
                </h5>

                <p class="card-text">
                    {{ post.content }}
                </p>

                <p class="text-muted mb-2">
                    Author: {{ post.author?.username }}
                </p>

                <router-link
                    class="btn btn-primary btn-sm"
                    :to="`/posts/${post._id}`"
                >
                    View Post
                </router-link>
            </div>
        </div>
    </div>
</template>