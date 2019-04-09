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
    v-if="product.length"
    class="print-only"
      show-empty
      stacked="md"
      :items="product"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
     
    >  <template slot="orderupdate" slot-scope="row">
        <b-button  variant="success" size="sm"  @click="updateProduct(row.item)" class="mr-1">
          Update
        </b-button>
      </template>
      
      <template slot="action" slot-scope="row">
        <b-button  variant="danger" size="sm"  @click="deleteProduct(row.item)" class="mr-1">
         Delete
        </b-button>
      </template>

    </b-table>


     

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-if="product.length"
          v-model="currentPage"
          :total-rows="product.length"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>

      </b-col>
        <b-button  variant="secondary" size="md"  @click="myFunction()" class="mr-1">
          print
        </b-button>
    </b-row>

    <!-- Info modal -->
   
      
  </b-container>
  
</template>

<script>
import {api} from '../Api'


export default {
  name: 'ProductList',
 
  props: { 
    pageTitle: { type: String, default: 'Akaba'}
  },
   
  components: {

  },

  data() {
      return {
        
        fields: [
         
          { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
          { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
          { key: 'quantity', label: 'Quantiy', sortable: true, class: 'text-center' },
          { key: 'code', label: 'Code', sortable: true, class: 'text-center' },
          { key: 'category_id', label: 'Category id', sortable: true, class: 'text-center' },
          { key: 'img', label: 'Image', sortable: true, class: 'text-center' },
          { key: 'orderupdate', label: 'Update',class: 'text-center' },
         { key: 'action', label: 'Action',class: 'text-center' }
        ],

       product: [],
   
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
          deleteProduct(item){
            api().delete(`deleteProduct/${item.id}`).then((response) => {
              console.log(response.data)
              this.apinew()
            })
            console.log(item)
    },
          updateProduct(item){
            api().patch(`updateOrder/${item.id}`, {status: 'Delivered'}).then((response) => {
              console.log(response.data)
              this.apinew()
            })
            console.log(item)
    },



        apinew(){
          api().get('product').then((response) => {
          
              console.log(response.data)
          this.product = response.data.map((productlist) => {
          return {
            id: productlist.id,
            name: productlist.name,
            price: productlist.price,
            quantity: productlist.quantity,
            code: productlist.code,
            img: productlist.img,
            category_id: productlist.category_id,
            
                }
                                                      })
          console.log(this.product)

                                                })
                },

         myFunction() {

          window.print();
            }


    },

  created () {
    this.updateTitle = 'Product List'
    this.apinew()

  },
}
</script>

<style>
@media print {
  .container-fluid > .row > .col-sm-3.col-md-2,
  .container-fluid > .row > .col-sm-9.col-md-10 > .container-fluid > .row {
    display: none;
  }
  .print-only {
    visibility: visible !important;
  }
  
}
</style>