<template>

<b-container fluid>
    <!-- User Interface controls -->
    <br>
    <br>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group  class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
    v-if="order_product.length"
      show-empty
      stacked="md"
      :items="order_product"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
     
    >
   

    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-if="order_product.length"
          v-model="currentPage"
          :total-rows="order_product.length"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
 
  </b-container>
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
        
        fields: [
          { key: 'order_id', label: 'Order ID', sortable: true},
          { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
          { key: 'quantity', label: 'Quantity', sortable: true, class: 'text-center' },
          { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
          { key: 'img', label: 'Image', sortable: true, class: 'text-center' },
          
        ],

      order_product: [],
   
        currentPage: 1,
        perPage: 5,
       
        pageOptions: [5, 10, 15],
        filter: null,
        modalInfo: { title: '', content: '' }
      }
    },

  computed: {
    updateTitle: {
      get () { return this.pageTitle },
      set (val) { this.$emit('update:pageTitle', val) }
    },
    sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
  },
   methods: {


      info(item, index, button) {
        this.modalInfo.title = `Row index: ${index}`
        this.modalInfo.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      resetModal() {
        this.modalInfo.title = ''
        this.modalInfo.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
        
        apinew(){
          api().get('order_product').then((response) => {
              console.log(response.data)
          this.order_product = response.data.map((orderedProduct) => {
          return {
            id: orderedProduct.id,
            order_id:orderedProduct.order_id,
            user_id: orderedProduct.user_id,
            product_id: orderedProduct.product_id,
            name: orderedProduct.name,
            quantity: orderedProduct.quantity,
            price: orderedProduct.price,
            img: orderedProduct.img,
           
     }
   })
  console.log(this.order_product)

        })
  }
    },

  created () {
    this.updateTitle = 'Order Product List'
    this.apinew()

  },
}
</script>

<style>
</style>