
<template>

  <div>

    <b-form @click="updateCategory" @reset="onReset" v-if="show">
    
      <b-form-group id="exampleInputGroup2" label="Update Category:" label-for="exampleInput2">
        <b-form-input
          id="exampleInput2"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter Category" />
      </b-form-group
      >
      
       <b-button block type="submit" variant="outline-success">Submit</b-button>
       <b-button block type="reset" variant="outline-danger">Reset</b-button>

     
    </b-form>
  

  </div>
</template> 

<script>
import {api} from '../Api'
export default {
  name: 'CategoryUpdate',
  


    components: {
 
  },

  data() {
      return {
        form: {
         
          name: this.$route.params.name
          
          
          
        },
        
        show: true
      }
    },
  computed: {
    updateTitle: {
      get () { return this.pageTitle },
      set (val) { this.$emit('update:pageTitle', val) }
                 },
               
    },
    methods: {

          updateCategory(){

          api().patch(`updateCategory/${this.$route.params.categoryId}`, {name: this.form.name}).then((response) => {
            // this.$router.push('/category-list')
              console.log(response.data)
              
            })
            
            console.log(this.$route.params.categoryId)
           
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
    this.updateTitle = 'Update Category'
 

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
