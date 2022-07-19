import { createRouter, createWebHistory } from 'vue-router'

import FormLayout from "@/components/FormLayout";
import FormCart from "@/components/FormCart";
import FormFill from "@/components/FormFill";

const routes = [
    {
        path: '/',
        name: 'Forms',
        component: FormLayout
    },
    {
        path: '/form/:_id',
        name: 'FormCart',
        component: FormCart
    },
    {
        path: '/fill/:_id',
        name: 'FormFill',
        component: FormFill
    }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router