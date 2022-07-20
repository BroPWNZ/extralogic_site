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
                        <p>Создано: {{form.date.split("T")[0]}}</p>
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

                <input type="text" class="form-control" v-if="question.type == 1" disabled :value="this.answer[0][index].input">

                <textarea class="form-control mt-3" v-if="question.type == 2" disabled :value="this.answer[0][index].input"></textarea>

                <select class="form-select mt-3" v-if="question.type == 3" disabled >
                    <option selected >{{this.answer[0][index].input}}</option>
                </select>

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
                answer: []
            }
        },
        methods: {
            plus () {
                if(this.counter < this.answers.length) {
                    this.counter ++
                    this.answer.splice(0,1, this.answers[this.counter - 1].answer)
                }
            },
            minus () {
                if(this.counter > 1 ) {
                    this.counter --
                    this.answer.splice(0,1, this.answers[this.counter - 1].answer)
                }
            }

        },
        async created() {
            await apiClass.request('getById', {id: window.location.href.split('/').pop(), form: this.form})
                .then((response) => this.form = response)

            await apiClass.request('getByFormId', {id: this.form._id, answer: this.answer})
                .then(response => {
                    this.answers = response
                })
            if (this.answers.length == 0) {
                let data = []
                for (var i = 0; i < this.form.questions.length; i++) {
                    data.push({input: ''})
                }
                console.log(data)
                this.answer.splice(0,1, data)
            } else {
                this.answer.splice(0,1, this.answers[this.counter - 1].answer)
            }
        }
    }
</script>
