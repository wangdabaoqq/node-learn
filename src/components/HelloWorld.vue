<template>
  <div class="hello">
  <form class="clearForm" ref="loginForm">
    <label>账号</label>
    <input v-model="login.username" />
     <label>密码</label>
    <input type="password"  v-model="login.password" />
    <button @click="logins">登录</button>
    <!-- <button @click="update">更新</button> -->
    
  </form>
  <div>
    <ul>
      <li v-for="item in listData" :key="item.id">
        <p>{{ item.username }} {{ item._id }} </p>
        <button @click="update(item._id)">修改</button>
        <button @click="deletes(item._id)">删除</button>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      login: {
        username: '232',
        password: 23
      },
      listData: []
    }
  },
  mounted () {
    this.getUserList()
    // console.dir(this.$refs.loginForm)
    // this.logins()
  },
  methods: {
    getUserList () {
       axios.get('http://localhost:3000/userList', { params: {
         page: 1,
         pageSize: 10,
         username: 'asc'
       }
       }).then(res => {
        //  console.log(res)
         if (res.data.success) {
          let datas = res.data.data
          console.log(res.data)
          this.listData = datas.listData
         }
       })
    },
    logins () {
      axios.post('http://localhost:3000/login', this.login).then(res => {
        if (res.data.success) {
          alert('注册成功')
        }
      })
    },
    deletes (id) {
      let data = {
        id
      }
      axios.post('http://localhost:3000/loginDelete', data).then(res => {
        if (res.data.success) {
          console.log(res)
          // alert('注册成功')
        }
      })
    },
    update (id) {
      let data = {
        id,
        username: '4fdsf'
      }
      axios.post('http://localhost:3000/loginUpdate', data).then(res => {
        if (res.data.success) {
          console.log(res)
          // alert('注册成功')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.clearForm {
  text-align: center;
    width: 180px;
    display: inline-block;
}
</style>
