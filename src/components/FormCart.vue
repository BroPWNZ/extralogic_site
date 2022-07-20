<template>
    <div class="container">
        <div class="d-flex justify-content-between mb-4">
            <div class="justify-content-start">
                <a class="btn btn-outline-secondary" :href="`/`" >Назад</a>
            </div>

            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-dark m-3" @click="minus">Предыдущий</button>
                <div class="d-flex justify-content-center m-3">
                    <p class="me-2">{{this.counter}}</p>
                    <p class="me-2">из</p>
                    <p class="me-2">{{this.answers.length}}</p>
                </div>
                <button class="btn btn-outline-dark m-3" @click="plus">Следующий</button>
            </div>

            <div class="justify-content-end">
                <a class="btn btn-outline-success ms-3" :href="`/fill/${form._id}`">Заполнить</a>
            </div>
        </div>

        <div class="card mb-3">
            <div class="card-body">
                <div class="form-group">
                    <div class="justify-content-between d-flex">
                        <h1 class="text-start fw-bold">{{form.name}}</h1>
                        <p>Создано: {{this.date}}</p>
                    </div>

                    <p class="text-start">{{form.description}}</p>
                </div>
            </div>
        </div>

        <div class="card mb-3" v-for="(question, index) of form.questions" :key="question._id">
            <div class="card-body">
                <div class="input-group form-row mb-3">
                    <h3 class="text-start fw-bold">{{question.name}}</h3>
                </div>

                <p class="text-start mb-3">{{question.description}}</p>

                <div v-for="(answer, idx) of answers" :key="answer">
                    <input type="text" class="form-control" v-if="question.type == 1 && idx == this.counter - 1" :value="answer.answer[index].input" disabled>

                    <textarea class="form-control mt-3" v-if="question.type == 2 && idx == this.counter - 1" :value="answer.answer[index].input" disabled></textarea>

                    <select class="form-select mt-3" v-if="question.type == 3 && idx == this.counter - 1" disabled >
                        <option selected >{{answer.answer[index].input}}</option>
                    </select>
                </div>

            </div>
        </div>

    </div>
</template>


<script>

    import apiClass from "@/api";

    export default {

        name: 'FormCart',
        data() {
            return {
                form: [],
                answers: [],
                errors: [],
                counter: '1',
                date: ''
            }
        },
        methods: {
            plus () {
                if(this.counter < this.answers.length) {
                    this.counter ++
                }
            },
            minus () {
                if(this.counter > 1 ) {
                    this.counter --
                }
            }

        },
        async created() {
            this.form = await apiClass.request('getById', {id: window.location.href.split('/').pop(), form: this.form})
            this.date = this.form.date.split("T")[0]
            this.answers = await apiClass.request('getByFormId', {id: this.form._id, answer: this.answer})
        }
    }
</script>
