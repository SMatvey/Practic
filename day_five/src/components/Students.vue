<template>
  <div class="Rule">
    <input type="text" name="search" v-model="search"><br>
    <h2>Кількість студентів: {{ studentsCount }}</h2>
    <table class="table table-dark">
        <tr>
        <th>ПІБ</th>
        <th>Наявність ПР</th>
        <th>Група</th>
        <th>Оновлення</th>
        <th>Видалення</th>
      </tr>
        <tr v-for="item in students"  v-bind:key="item._id"> 
            <td> <router-link  v-bind:to="'/student-info/'+item._id">
				{{item.name}}
			</router-link> </td>
            <td><input type="checkbox" v-model="item.isDonePr"></td>
            <td>{{item.group}}</td>
            <td><a href = "#" @click="updateFind(item._id)">Оновити</a></td>
            <td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>  
        </tr>
    </table>

    <input v-model="student.name">
    <input type="checkbox" v-model="student.isDonePr">
    <select v-model="student.group">
        <option value="RPZ 19 1/9">RPZ 19 1/9</option>
        <option value="RPZ 19 2/9">RPZ 19 2/9</option>
    </select>
    <button @click="addStudent()">Add student</button>
    <button @click="updateStudent()">Update student</button>

    <hr>
    <section class="exchange">
      <h2>Конвертор валюти</h2>
      <article class="enterAmount">
        <label for="amount">Введіть кількість:</label>
        <input type="number" name="amount" v-model="amount" />
      </article>
      <article class="convert">
        <label for="">Конвертувати з: </label>
        <select name="from" id="" v-model="convertFrom">
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <label for="">Конвертувати в: </label>
        <select name="to" id="" v-model="convertTo">
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </article>
      <button @click="getCurrency">Зробити конвертацію</button>
      <h3>Останні дані пишуть, що {{ rate }}</h3>
    </section>
  </div>
</template>


<script>
import axios from 'axios'
import { computed } from "vue";
 
export default {
    props: {
        id: "",
    },
    data() {
       return {
            students: [],
            updStudents: [],
            search:'',
            student: {name: "", isDonePr: false, group: ""},

            convertFrom: "",
            convertTo: "",
            amount: "",
            rate: ""
       }
    },
    mounted: function () {
        axios.get("http://34.82.81.113:3000/students")
        .then(data => {
            this.students =  data.data;
            console.log(this.students)
            this.$store.commit("setCount", this.students.length);
        })
    },
    computed: {
        studentsCount() {
            return this.$store.getters.getCount;
        },
        getTheme(){
            return this.$store.getters.getTheme;
        }
    },
    methods: {
        addStudent() {
            axios.post("http://34.82.81.113:3000/students", {
            ...this.student,
            })
            .then((response) => {
                this.students.push(response.data);
            });
        },
        deleteStudent(studId) {
            axios.delete(`http://34.82.81.113:3000/students/${studId}`)
            .then((response) => {
                this.students = this.students.filter((elem) => {
                    return elem._id !== studId;
                });
            });
        },
        updateFind(studId) {
            this.updStudents = {
                ...this.students.find((elem) => elem._id == studId),
            };
            console.log(this.updStudents)
            this.student._id=this.updStudents._id;
            this.student.name=this.updStudents.name;
            this.student.isDonePr=this.updStudents.isDonePr;
            this.student.group=this.updStudents.group;
        },
        updateStudent() {
            this.tempStudents = [];   
            axios.put(`http://34.82.81.113:3000/students/${this.student._id}`, {
            ...this.student,
            })
            .then((response) => {
                this.students = response.data;
                this.tempStudents = [];
            });
            getStudents()
            axios.get("http://34.82.81.113:3000/students")
                .then(data => {
                    this.students =  data.data;
                })   
        },
        getCurrency() {
            axios
            .get(
                "https://api.apilayer.com/exchangerates_data/convert?to=" + this.convertTo +
                "&from=" + this.convertFrom + "&amount=1",
                {
                headers: {
                    apikey: "0sjTljESXiA3z56QG2VZ0P0Rjp7wGkfg",
                },
                }
            )
            .then((data) => {
                console.log(data.data.info.rate);
                this.rate = this.amount + " " + this.convertFrom + " equals " +
                (data.data.info.rate * this.amount).toFixed(3) + " " + this.convertTo;
            }); 
        },    
    },
}

function getStudents() {
    return axios.get('http://34.82.81.113:3000/students')
}


</script>

<style>
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