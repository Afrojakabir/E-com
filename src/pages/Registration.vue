
<template>

  <div>
<layout-cart cardTitle="Become an Akaba User">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    
      <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter name" />
      </b-form-group>

      <b-form-group id="address" label="Your address:" label-for="address">
        <b-form-input
          id="address"
          type="text"
          v-model="form.address"
          required
          placeholder="Enter full address" />
      </b-form-group>

      <b-form-group id="phone" label="Your Phone No:" label-for="phone">
        <b-form-input
          id="phone"
          type="text"
          v-model="form.phone_no"
          required
          placeholder="Enter full address" />
      </b-form-group>

      
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
          placeholder="abc@gmail.com" />
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

           <b-form-group
        id="exampleInputGroup4"
        label="Confim Password:"
        label-for="exampleInput4"
       
      >
        <b-form-input
          id="exampleInput4"
          type="password"
          v-model="form.cpassword"
          required
           />
      </b-form-group>



       




       <b-button block type="submit" variant="outline-success">Submit</b-button>
       <b-button block type="reset" variant="outline-danger">Reset</b-button>
<br>
<div class="text-center" >
  <b-link  to="/login">Already have an account</b-link>
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
          name: '',
          address: '',
          phone_no:'',
          password: '',
          cpassword: '',
          
          
        },
        
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
          let data =JSON.stringify(this.form)
          api().post('users', data).then((response) => {
          this.$router.push('/')
          console.log(response.data)
          localStorage.setItem(STORAGE_KEY, response.data.api_token)
          console.log(localStorage.getItem(STORAGE_KEY))
          
          this.form.name = ''
          this.form.address = ''
          this.form.phone_no = ''
          this.form.email = ''
          this.form.password = ''
          this.form.cpassword = ''
 
        })
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        
        this.form.name = ''
        this.form.address = ''
        this.form.phone_no = ''
        this.form.email = ''
        this.form.password = ''
         this.form.cpassword = ''
      
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
