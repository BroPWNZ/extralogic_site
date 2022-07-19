<template>
    <div class="top-cover center-block mt-2 mb-3">
        <div class="card bg-light mb-3 text-truncate" style="max-width: 18rem;">
            <div class="card-header text-start">{{form.name}}</div>
            <div class="card-body">
                <p class="card-text">{{form.description}}</p>
            </div>
            <a class="btn btn-outline-secondary" :href="`/form/${form._id}`">Подробнее</a>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'FormItem',
        props: {
            form: {
                name: String,
                description: String,
                _id: String
            }
        },
    }
</script>