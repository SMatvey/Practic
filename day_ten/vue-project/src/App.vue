<template>
  <div class="rule">
    <table class="table">
      <thead>
        <tr>
          <th>ПІБ</th>
          <th>Наявність ПР</th>
          <th>Група</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in students" v-bind:key="item._id">
          <td>{{ item.name }}</td>
          <td><input type="checkbox" v-model="item.isDonePr" /></td>
          <td>{{ item.group }}</td>
        </tr>
      </tbody>
    </table>
    <h1 class="text-3xl bg-blue-500 font-bold py-2 px-8 rounded underline">Текст створено для перевірки напису інлайн</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
    };
  },
  mounted() {
    this.axios.get(`http://34.82.81.113:3000/students`).then((response) => {
      this.students = response.data;
    });
  },
};
</script>

<style src="./assets/style.css" lang="css" module></style>