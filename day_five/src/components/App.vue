<template>
    <main :class="getTheme">
        <button id="changeTheme" @click="changeTheme()">Змінити тему</button>
        <div class="main">
        <div class="content">
            <router-view></router-view>
        </div>
        </div>
    </main>
</template>

<script>
export default {
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
  },
  methods: {
    changeTheme: function () {
      this.$store.commit("setTheme");
    },
  },
};
</script>