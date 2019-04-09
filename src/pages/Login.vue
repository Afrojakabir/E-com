<template>

  <div>
 <layout-cart cardTitle="Login ">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    


      <b-form-group
        id="exampleInputGroup1"
        label="Email address:"
        label-for="exampleInput1"
       
      >
        <b-form-input
          id="exampleInput1"
          type="email"
          v-model="form.email"
          required
          placeholder="abc@gmail.com"
          
           />
          
      </b-form-group>

          <b-form-group
        id="exampleInputGroup3"
        label="Password:"
        label-for="exampleInput3"
       
      >
        <b-form-input
          id="exampleInput3"
          type="password"
          v-model="form.password"
          required
           />
      </b-form-group>
       <b-button block type="submit" variant="outline-success">Submit</b-button>
       <b-button block type="reset" variant="outline-danger">Reset</b-button>
<br>
<div class="text-center" >
  <b-link  to="/user">Become an user</b-link>
</div>
     
    </b-form>
  
</layout-cart>
  </div>
</template> 

<script>
import LayoutCart from '../components/Cart'
import {api} from '../Api'
import {STORAGE_KEY} from '../consts'

export default {
  name: 'LayoutLogin',
  

  components: {
      LayoutCart,
  },

  data() {
      return {
        form: {
          email: '',
          password: '', 
              },
        
        show: true
      }
    },
      

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        
        let data =JSON.stringify(this.form)
        api().post('sessions', data).then((response) => {
          this.$router.push('/')
        // console.log(response.data)
        // localStorage.setItem(STORAGE_KEY, response.data.token)
        // console.log(localStorage.getItem(STORAGE_KEY))
        
          localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
         console.log( JSON.parse(localStorage.getItem(STORAGE_KEY)))
        
                   
        this.form.email = ''
        this.form.password = ''
        })

      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.email = ''
        
        this.form.password = ''

        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
