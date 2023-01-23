<template>
  <main :class="theme">
    <router-link v-bind:to="'/'"><button>Back</button></router-link>
    <div class="container" v-if="this.city?.name">
      <div class="item">
        <div class="table-local-weather">
          <table>
            <tr>
            <td>{{ city.name }}</td>
            <td>{{ city.sys.country }}</td>
            <td>[{{ city.coord.lon }};{{ city.coord.lat }}]</td>
            </tr>
            <tr>
            <td><img src="/assets/vlag.png" class="humidity"></td>
            <td>вологість</td>
            <td>{{ city.main.humidity }}</td>
            </tr>
            <tr>
            <td><img src="/assets/temp.png" class="temp"></td>
            <td>температура</td>
            <td>{{ city.main.temp }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/02d.png"></td>
            <td>погода</td>
            <td>{{ city.weather[0].main }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/50d.png"></td>
            <td>тиск</td>
            <td>{{ city.main.pressure }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/02n.png"></td>
            <td>опис</td>
            <td>{{ city.weather[0].description }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    id: "",
  },
  data() {
    return {
      city: {},
      theme: "",
      API_KEY: "7914d5a440960cfd5df3bd0388a7ad0f",
    };
  },
  mounted() {
    this.theme = localStorage.getItem("theme");
    this.axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.id}&appid=${this.API_KEY}&lang=ua&units=metric`
      )
      .then((response) => {
        this.city = { ...response.data };
      });
  },
};
</script>

<style>
.humidity, .temp{
    margin: 5px 15px;
    width: 35px;
    height: 35px;
}
</style>
