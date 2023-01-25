<template>
    <div class="Rule">
        <h1>Кошик</h1>
        <div v-for="(p,index) in products" :key="index" class="productCart">
            <h1>{{(index+1)}}</h1>
            <img :src="p.src" alt="img" class="imgProductCart">
            <div class="infoProductCart">
                <h4>{{ p.item }}</h4>
                <p>Ціна: {{ p.price }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            products:[]
        }
    },
    mounted(){
        this.products=this.$store.getters.getCart
    }
}
</script>

<style>
.imgProductCart{
    width: 225px;
    height: 150px;
}
.productCart{
    max-width: 720px;
    margin: 15px 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    align-content: flex-start;
    flex-direction: row;
}
.infoProductCart{
    width: 295px;
}
</style>