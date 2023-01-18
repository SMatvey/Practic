<template>
  <div class="rule">
    <span>Населений пункт</span>
    <input
      v-model="city"
      type="text"
      @keyup.enter="getWarehouses"
    />
    <span>Поштове відділення</span>
    <select>
      <option v-for="warehouse in warehouses" v-bind:key="warehouse._id">
        {{ warehouse }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cities: [],
      city: "",
      warehouses: [],
    };
  },
  mounted() {
    axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: "8c6d6da608aeb0f1810f49ed433e0d58",
      modelName: "Address",
      calledMethod: "getCities",
      methodProperties: {},
    })
    .then((response) => {
      response.data.data.forEach((element) => {
        this.cities.push(element.Description);
      });
    });
  },
  methods: {
    getWarehouses() {
      axios.post("https://api.novaposhta.ua/v2.0/json/", {
        apiKey: "8c6d6da608aeb0f1810f49ed433e0d58",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: this.city,
        },
      })
      .then((response) => {
        this.warehouses = [];
        response.data.data.forEach((element) => {
          this.warehouses.push(element.Description);
        });
      });
    },
  },
};
</script>

<style src="../assets/style.css" lang="css" module></style>