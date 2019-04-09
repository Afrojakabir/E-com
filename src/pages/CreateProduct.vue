
<template>

  <div>
<insert-card >
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    
      <b-form-group id="productName" label="Product Name:" label-for="productName">
        <b-form-input
          id="productName"
          type="text"
          v-model="form.name"
          required
          placeholder="Insert Product Name" />
      </b-form-group>
            <b-form-group id="productPrice" label="Product Price:" label-for="productPrice">
        <b-form-input
          id="productPrice"
          type="text"
          v-model="form.price"
          required
          placeholder="Insert Product Price" />
       </b-form-group>
        <b-form-group id="category" label="Product Category:" label-for="category">
        <b-form-select v-model="form.category_id" :options="form.categoryName"  >
          <option :value="null">Please select an option</option>
          <option :value="category.id" v-for="category in form.categoryList" :key="category.id">{{category.name}}</option>
        </b-form-select>
       </b-form-group>
        <b-form-group id="productCode" label="Product Code:" label-for="productCode">
        <b-form-input
          id="productCode"
          type="text"
          v-model="form.code"
          required
          placeholder="Insert Product code" />
        </b-form-group>
        <b-form-group id="productQuantity" label="Product Quantity:" label-for="productQuantity">
        <b-form-input
          id="productQuantity"
          type="text"
          v-model="form.quantity"
          required
          placeholder="Insert Product quantity" />
        </b-form-group>
        <b-form-group id="productImage" label="Product Image:" label-for="productImage">
        <b-form-input
          id="productImage"
          type="text"
          v-model="form.img"
          required
          placeholder="Insert Product image" />
        </b-form-group>

       <b-button block type="submit" variant="outline-success">Submit</b-button>
       <b-button block type="reset" variant="outline-danger">Reset</b-button>

     
    </b-form>
</insert-card>

  </div>
</template> 

<script>
import InsertCard from '../components/InsertCard'
import {api} from '../Api'
import {STORAGE_KEY} from '../consts'
export default {
  name: 'ProductInsertPage',
  
  components: {
    
    InsertCard
    },

  data() {
    return {
      form: {
        name: '',
        price: '',
        img: '',
        quantity: '',
        code: '',
        
        category_id: null,
        categoryList: []
         
            
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
          let data = this.form
          console.log('form data', data)
          const userInfo = JSON.parse(localStorage.getItem(STORAGE_KEY))
          const userId = userInfo && userInfo.user_id
          api().post('productCreate', {
            ...data,
            user_id: userId
          }).then((response) => {
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
      this.updateTitle = 'Insert porduct'
       
      api().get('category').then((response) => {
        console.log(response.data)
        this.form.categoryList = response.data
      })
    }

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
