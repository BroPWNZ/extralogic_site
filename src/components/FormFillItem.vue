<template>

    <div class="card mb-3" @change="onChange">
        <div class="card-body">
            <div class="input-group form-row mb-3">
                <h3 class="text-start fw-bold">{{question.name}}</h3>
            </div>

            <p class="text-start mb-3">{{question.description}}</p>

            <input type="text" class="form-control" aria-describedby="inputGroup-sizing-sm" v-if="question.type == 1" v-model="input">

            <textarea class="form-control mt-3" v-if="question.type == 2" v-model="input"></textarea>

            <select class="form-select mt-3" aria-label="Default select example col-1" v-model="input" v-if="question.type == 3">
                <option v-for="option of question.selectItems" :key="option" :value="option.value">{{option.value}}</option>
            </select>

        </div>
    </div>

</template>


<script>

    export default {
        name: 'FormFillItem',
        props: {
            question: {
                name: String,
                description: String,
                type: Number
            }
        },
        data() {
            return {
                Question: [],
                selectItems: []
            }
        },
        methods: {
            onChange: function () {
                this.Answer = {
                    input: this.input,
                    type: this.question.type,
                    select: this.select,
                    questionId: this.question._id
                }
                this.$emit('Answer', this.Answer)
            },
        },
        created() {

        }
    }
</script>