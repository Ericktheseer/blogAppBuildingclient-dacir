<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import api from '../api'

const route = useRoute()
const router = useRouter()

const notyf = new Notyf()

const title = ref('')
const content = ref('')

const getPost = async () => {

    try {

        const result = await api.get(
            `/posts/${route.params.id}`
        )

        title.value = result.data.post.title
        content.value = result.data.post.content

    } catch(error) {

        console.log(error)

    }

}

const updatePost = async () => {

    try {

        await api.patch(
            `/posts/${route.params.id}`,
            {
                title: title.value,
                content: content.value
            },
            {
                headers: {
                    Authorization:
                    `Bearer ${localStorage.getItem('token')}`
                }
            }
        )

        notyf.success('Post Updated Successfully')

        router.push('/posts')

    } catch(error) {

        notyf.error(
            error.response?.data?.message ||
            'Update Failed'
        )

    }

}

onMounted(() => {
    getPost()
})
</script>

<template>

<div class="row justify-content-center">

    <div class="col-md-8">

        <div class="card shadow">

            <div class="card-body">

                <h2 class="mb-4">
                    Edit Blog Post
                </h2>

                <form @submit.prevent="updatePost">

                    <div class="mb-3">
                        <label class="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            v-model="title"
                        >
                    </div>

                    <div class="mb-3">
                        <label class="form-label">
                            Content
                        </label>

                        <textarea
                            rows="6"
                            class="form-control"
                            v-model="content"
                        ></textarea>
                    </div>

                    <button
                        class="btn btn-warning"
                        type="submit"
                    >
                        Update Post
                    </button>

                </form>

            </div>

        </div>

    </div>

</div>

</template>