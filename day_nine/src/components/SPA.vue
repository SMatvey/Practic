<template>
  <main :class="theme" v-if="this.weather?.name">
    <button @click="changeTheme">Змінити тему</button>

    <div class="container">
      <div class="item">
        <div class="items">
          <h3>Додати місто</h3>
          <label>ВВЕДІТЬ НАЗВУ МІСТА:</label>
          <input type="text" v-model="city" />
          <button @click="addCity">Додати</button>
          <div class="input" v-if="input">{{ input }}</div>
        </div>
        <div class="items">
          <h3>Вибрати місто</h3>
          <label>ОБЕРІТЬ МІСТО:</label>
          <select v-model="difCity">
            <option v-for="city in cities" v-bind:key="city">
              {{ city }}
            </option>
          </select>
          <router-link v-bind:to="'/spainfo/' + difCity"
            ><button>Погода</button></router-link
          >
        </div>
      </div>
      <div class="item">
        <div class="tableStyle">
          <table>
            <tr>
            <td>{{ weather.name }}</td>
            <td>{{ weather.sys.country }}</td>
            <td>[{{ weather.coord.lon }};{{ weather.coord.lat }}]</td>
            </tr>
            <tr>
            <td><img src="/assets/vlag.png" class="humidity"></td>
            <td>вологість</td>
            <td>{{ weather.main.humidity }}</td>
            </tr>
            <tr>
            <td><img src="/assets/temp.png" class="temp"></td>
            <td>температура</td>
            <td>{{ weather.main.temp }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/02d.png"></td>
            <td>погода</td>
            <td>{{ weather.weather[0].main }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/50d.png"></td>
            <td>тиск</td>
            <td>{{ weather.main.pressure }}</td>
            </tr>
            <tr>
            <td><img src="https://openweathermap.org/img/wn/02n.png"></td>
            <td>опис</td>
            <td>{{ weather.weather[0].description }}</td>
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
      API_KEY: "7914d5a440960cfd5df3bd0388a7ad0f",
      weather: {},
      theme: "",
      difCity: "",
      city: "",
      cities: [],
      input: "",
    };
  },
  mounted() {
    this.theme = localStorage.getItem("theme");
    this.cities = JSON.parse(localStorage.getItem("cities"));
    if (!this.theme) this.theme = "white";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${this.API_KEY}&lang=ua&units=metric`
          )
          .then((response) => {
            this.weather = response.data;
            console.log(this.weather);
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  },
  methods: {
    changeTheme() {
      if (this.theme == "white") {
        this.theme = "black";
        localStorage.setItem("theme", this.theme);
      } else if (this.theme == "black") {
        this.theme = "red";
        localStorage.setItem("theme", this.theme);
      } else {
        this.theme = "white";
        localStorage.setItem("theme", this.theme);
      }
    },
    addCity() {
      this.axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.API_KEY}`
        )
        .then((response) => {
          this.cities = this.cities || [];
          this.cities.push(this.city);
          localStorage.setItem("cities", JSON.stringify(this.cities));
          this.city = "";
          console.log(response.data);
        })
        .catch((er) => {
          this.input = "Такого міста не існує";
          this.city = "";
          setTimeout(() => {
            this.input = "";
          }, 5000);
        });
    },
    changeWeather() {},
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.item {
  display: flex;
  padding: 20px;
  margin: 25px 0;
  background-color: rgba(0, 255, 64, 0.314) !important;
  opacity: 0.8;
  border-radius: 10px;
  justify-content: space-around;
  min-width: 35%;
}
.items {
  margin: 12px;
  display: flex;
  flex-direction: column;
}
button{
  margin-top: 5px;
  border-radius: 10px;
  width: 150px;
  font-size: 18px;
}
input, select {
  width: 250px;
  height: 35px;
}
label {
  padding-left: 5px;
  font-size: 14px;
  color: gray;
}
.tableStyle {
  font-size: 20px;
  display: flex;
  text-align: center;
  justify-content: space-around;
}
.fas {
  font-size: 36px;
}

.humidity, .temp{
    margin: 5px 15px;
    width: 35px;
    height: 35px;
}

.white {
  background-color: rgb(255, 255, 255);
  color: black;
  transition: 0.2s linear;
}
.black {
  background-color: rgb(34, 34, 34);
  color: white;
  transition: 0.2s linear;
}
.red {
  background-color: rgb(146, 0, 0);
  color: white;
  transition: 0.2s linear;
}

</style>