<template>

  <div>
    <br>
    <br>
    <br>
      <b-card bg-variant="light">
    <b-card-group deck>

      <b-card bg-variant="info" text-variant="white" header="Product Items" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>


      <b-card bg-variant="success" text-variant="white" header="Total Order" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
            <b-card bg-variant="warning" text-variant="white" header="Delivered Order" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
          <b-card bg-variant="danger" text-variant="white" header="Pending Order" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
    </b-card-group>
    </b-card>
  </div>



</template> 

<script>
export default {
  name: 'LayoutCard',
 props: { 
    pageTitle: { type: String, default: 'Akaba'}
  },
   
  components: {

  },

  computed: {
    updateTitle: {
      get () { return this.pageTitle },
      set (val) { this.$emit('update:pageTitle', val) }
    }
  },

  created () {
    this.updateTitle = 'DashBoard'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
