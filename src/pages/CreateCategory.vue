
<template>

  <div>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    
      <b-form-group id="exampleInputGroup2" label="Category Name:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter Category" />
      </b-form-group>
       <b-button block type="submit" variant="outline-success">Submit</b-button>
       <b-button block type="reset" variant="outline-danger">Reset</b-button>

     
    </b-form>
  

  </div>
</template> 

<script>
import {api} from '../Api'
export default {
  name: 'CategoryCreate',
  


    components: {
 
  },

  data() {
      return {
        form: {
         
          name: ''
 
          
          
        },
        
        show: true
      }
    },
      computed: {
        updateTitle: {
          get () { return this.pageTitle },
          set (val) { this.$emit('update:pageTitle', val) }
                    }

  },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
          let data =JSON.stringify(this.form)
          api().post('categoryCreate', data).then((response) => {
          
          console.log(response.data)
         
          
          this.form.name = ''

 
        })
      },
      onReset(evt) {
        evt.preventDefault()
        /* Reset our form values */
        
        this.form.name = ''

      
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
      created () {
    this.updateTitle = 'Create Category'
    this.apinew()

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
