<template>
    <div class="rule">
        <div class="section">
            <div class="photo">
                <img :src="student.photo" width="300" @click="isOpen = true">
            </div>
            <div class="info">
                {{ student.name }} <br>
                Група {{ student.group }} <br>
                Робота {{isDonePrOfStudent}} <br>
            </div>
        </div>

        <Modal :open="isOpen" @close="isOpen = !isOpen">
            <img class="modalImg" :src="student.photo">
        </Modal>
    </div>
</template>

<script>
import axios from "axios"
import { ref } from "vue";
import Modal from "./Modal.vue";
export default {
    components: { Modal },
    props: {
        id: '',
    },
    data() {
        return{
            student: {},
        };
    },
    mounted(){
        axios.get(`http://34.82.81.113:3000/students/${this.id}`).then((res)=>{
            this.student = res.data;
        });
    },
    setup() {
        const isOpen = ref(false);
        return { isOpen };
    },
    computed: {
        isDonePrOfStudent() {
            return this.student.isDonePr ? 'здана' : 'не здана'
        }
    }
}
</script>

<style>
    .section{
        display: flex;
	    flex-direction: row;
    }
    .photo, .info{
        border: 1px solid black;
        padding: 10px;
    }
    .info{
        max-width: 350px;
        max-height: 350px;
        width: 100%;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .modalImg{
        max-width: 720px;
        margin: 2rem auto;
    }
</style>