<template>
    <div class="container" >
        <div class="d-flex justify-content-between mt-4">
            <h1 class="text-start fw-bold">Формы</h1>
        </div>

        <div class="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1" >
            <FormItem v-for="form of stock" :key="form" :form="form"></FormItem>
        </div>

    </div>
</template>


<script>
    import FormItem from "@/components/FormItem";
    import apiClass from "@/api";

    export default {
        name: 'FormLayout',
        components: {FormItem},
        data() {
            return {
                stock: [],
                items: [],
                errors: []
            }
        },
        created () {
            apiClass.request("getAll", {form: this.stock})
                .then((response) => this.stock = response);

        }
    }

</script>