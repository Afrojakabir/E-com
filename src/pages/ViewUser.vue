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
    v-if="userlist.length"
      show-empty
      stacked="md"
      :items="userlist"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      @filtered="onFiltered"
     
    >
   

      <template slot="action"  slot-scope="row">
        <b-button  variant="danger" size="sm"  @click="deleteUser(row.item)" class="mr-1">
         Delete
        </b-button>
   
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-if="userlist.length"
          v-model="currentPage"
          :total-rows="userlist.length"
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
  name: 'UserList',
 
  props: { 
    pageTitle: { type: String, default: 'Akaba'}
  },
   
  components: {

  },

  data() {
      return {
        
        fields: [
          { key: 'name', label: 'Name', sortable: true},
          { key: 'email', label: 'Email', sortable: true, },
          { key: 'phone_no', label: 'Phone', sortable: true, },
          { key: 'address', label: 'Address', sortable: true},
          { key: 'role', label: 'Role', sortable: true},
          { key: 'action', label: 'Action' }
        ],

       userlist: [],
   
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

      deleteUser(item){
        api().delete(`deleteUser/${item.id}`).then((response) => {
          console.log(response.data)
          this.apinew()
        })
        console.log(item)
    },
      apinew(){
        api().get('userlist').then((response) => {
        console.log(response.data)
        this.userlist = response.data.map((user) => {
        return {
        name: user.name,
        role: user.role,
        address: user.address,
        phone_no: user.phone_no,
        id: user.id,
        email: user.email
              }
       })
        console.log(this.userlist)

        })
  }
   },

  created () {
    this.updateTitle = 'User List'
    this.apinew()

  },


}
</script>

<style>
</style>