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
    v-if="reqshow.length"
      show-empty
      stacked="md"
      :items="reqshow"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
     
    >
      <template slot="action" slot-scope="row">
        <b-button  variant="danger" size="sm"  @click="deleterequest(row.item)" class="mr-1">
          Delete
        </b-button>
      </template>
            <template slot="updatereq" slot-scope="row">
        <b-button  variant="info" size="sm"  :to="`request-update-page/${row.item.id}`" class="mr-1">
          Modify
        </b-button>
      </template>

    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-if="reqshow.length"
          v-model="currentPage"
          :total-rows="reqshow.length"
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
          { key: 'username', label: 'User name', sortable: true},
          { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
           { key: 'img', label: 'Image', sortable: true, class: 'text-center' },
        
          { key: 'quantity', label: 'Quantity', sortable: true, class: 'text-center' },
          { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
           { key: 'confirmation', label: 'Confirmation', sortable: true, class: 'text-center' },
          { key: 'status', label: 'Status', sortable: true, class: 'text-center' },
          { key: 'updatereq', label: 'Action' },
           { key: 'action',label: 'Delete' }
            
            
          
        ],

      reqshow: [],
   
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

       deleterequest(item){
        api().delete(`deleteRequest/${item.id}`).then((response) => {
            console.log(response.data)
            this.apinew()
            })
            console.log(item)
    },
    

          apinew(){
            api().get('reqshow').then((response) => {
              console.log(response.data)
              this.reqshow = response.data.map((orderRequest) => {
                return {
                  id: orderRequest.id,
                  username:orderRequest.users.name,
                  status: orderRequest.status,
                  confirmation: orderRequest.confirmation,
                  name: orderRequest.name,
                  payment: orderRequest.payment,
                  quantity: orderRequest.quantity,
                  price: orderRequest.price,
                  img: orderRequest.img,
            
                  }
                })
                console.log(this.reqshow)

        })
    }
 },

  created () {
    this.updateTitle = 'Order Request List'
    this.apinew()

  },
}
</script>

<style>
</style>