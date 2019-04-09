<template>
  <div>
<br>
<br>
<br>
    <b-container fluid>
      <b-row>
       <b-col lg="3">
       </b-col>
        <b-col col lg="6"><br>
        <b-card>
          
          <b-form-select v-model="user" :options="confirmation"  class="mt-3"></b-form-select>
          <b-form-select v-model="admin" :options="status"  class="mt-3"></b-form-select>
            
          <div>
            <b-button block variant="success"  @click="updateOrder" class="mt-3">Submit</b-button>
          </div>
   
    <div class="mt-3">Selected: <strong>{{ user }}</strong></div>
    <div class="mt-3">Selected: <strong>{{ admin }}</strong></div>
         </b-card>
 
  
      </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import {api} from '../Api'


export default {
  name: 'DefaultUser',
 
  props: { 
    pageTitle: { type: String, default: 'Akaba'}
  },
   
  components: {

  },

  data() {
      return {
        
        user: null,
        confirmation: [
            { value: null, text: 'Please select an option' },
            { value: 'Cancel', text: 'Cancel' },
            { value: 'Approved', text: 'Approved' },
            
            ],
            
        admin : null,
        status: [
            { value: null, text: 'Please select an option' },
            { value: 'Cancel', text: 'Cancel' },
            { value: 'onProcess', text: 'On process' },
            { value: 'delivered', text: 'Delivered' },
            ] 
      }
    },

  computed: {
    updateTitle: {
      get () { return this.pageTitle },
      set (val) { this.$emit('update:pageTitle', val) }
    }

  },
   methods: {

          updateOrder(){
          api().patch(`updateRequest/${this.$route.params.orderId}`, {status: this.admin, confirmation: this.user}).then((response) => {
              console.log(response.data)
              
            })
            console.log(this.$route.params.orderId)
    }
 
    },

  created () {
    this.updateTitle = 'Update Order'
   console.log(this.$route.params.orderId)

  },
}
</script>

<style>
</style>