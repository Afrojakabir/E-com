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
    v-if="order.length"
    class="print-only"
      show-empty
      stacked="md"
      :items="order"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
     
    >  <template slot="orderupdate" slot-scope="row">
        <b-button  variant="success" size="sm"  @click="updateOrder(row.item)" class="mr-1">
          Done
        </b-button>
      </template>

      <template slot="view" slot-scope="row">
        <b-button  variant="info" size="sm"  :to="`order-view/${row.item.id}`"  class="mr-1">
           View
        </b-button>
      </template>
      
      <template slot="action" slot-scope="row">
        <b-button  variant="danger" size="sm"  @click="deleteOrder(row.item)" class="mr-1">
         Delete
        </b-button>
      </template>

    </b-table>


     

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-if="order.length"
          v-model="currentPage"
          :total-rows="order.length"
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
  name: 'DefaultUser',
 
  props: { 
    pageTitle: { type: String, default: 'Akaba'}
  },
   
  components: {

  },

  data() {
      return {
        
        fields: [
          { key: 'id', label: 'ID', sortable: true},
          { key: 'name', label: 'User name', sortable: true, class: 'text-center' },
          { key: 'address', label: 'Address', sortable: true, class: 'text-center' },
          { key: 'phone_no', label: 'Phone', sortable: true, class: 'text-center' },
          { key: 'total_price', label: 'Total price', sortable: true, class: 'text-center' },
          { key: 'payment', label: 'Payment type', sortable: true, class: 'text-center' },
          { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
          { key: 'orderupdate', label: 'Delivery Action',class: 'text-center' },
          { key: 'view', label: 'View',class: 'text-center' },
          { key: 'action', label: 'Action',class: 'text-center' }
        ],

       order: [],
   
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
          deleteOrder(item){
            api().delete(`deleteOrder/${item.id}`).then((response) => {
              console.log(response.data)
              this.apinew()
            })
            console.log(item)
    },
          updateOrder(item){
            api().patch(`updateOrder/${item.id}`, {status: 'Delivered'}).then((response) => {
              console.log(response.data)
              this.apinew()
            })
            console.log(item)
    },



        apinew(){
          api().get('order').then((response) => {
              console.log(response.data)
          this.order = response.data.map((ordered) => {
          return {
            id: ordered.id,
            name: ordered.users.name,
            address: ordered.users.address,
            phone_no: ordered.users.phone_no,
            payment: ordered.payment,
            status: ordered.status,
            total_price: ordered.total_price
                }
                                                      })
          console.log(this.order)

                                                })
                },

         myFunction() {

          window.print();
            }


    },

  created () {
    this.updateTitle = 'Order List'
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