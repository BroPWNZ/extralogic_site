<template>
    <div class="container">
        <div class="d-flex justify-content-between mb-4">
            <div class="justify-content-start">
                <a class="btn btn-outline-secondary" :href="`/form/${form._id}`">Назад</a>
            </div>
            <div class="justify-content-end">
                <a class="btn btn-outline-success ms-3" @click="save" :href="`/form/${form._id}`">Отправить</a>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-body">
                <div class="form-group">
                    <h1 class="text-start fw-bold">{{form.name}}</h1>
                    <p class="mt-3 text-start">{{form.description}}</p>
                </div>
            </div>
        </div>

        <FormFillItem v-for="(question, index) of form.questions" :key="question.id" :question="question" @Answer="(n) =>change(n, index)"></FormFillItem>

    </div>
</template>


<script>

    import FormFillItem from "@/components/FormFillItem";
    import apiClass from '../api/index.js'

    export default {
        name: 'FormFill',
        components: {FormFillItem},
        data() {
            return {
                FormItems: [],
                answers: [],
                form: [],
                errors: []
            }
        },
        methods: {
            save: async function () {
                let result = {
                    formId: this.form._id,
                    answer: this.answers
                }
                await apiClass.request('saveAnswer', {answer: result})
                    .then((response) => this.answer = response)
            },
            change(value, index) {
                this.answers.splice(index, 1, value)
                console.log(this.answers)
            }
        },
        created() {
            apiClass.request('getById', {id: window.location.href.split('/').pop(), form: this.form})
                .then((response) => this.form = response)
        }
    }
</script>