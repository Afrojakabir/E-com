<template>

  <div>
<br>

    <b-container fluid>
    <b-row>
       <b-col lg="3">
       </b-col>
        <b-col col lg="6">
           
            <br>
        <b-card deck
  
         >
           <slot/>
         </b-card>
 
  
 </b-col>
  </b-row>
  </b-container>
  </div>
</template> 

<script>
export default {
  name: 'InsertPageCard',
  props: {
    msg: String,
    cardTitle: { type: String, default: 'Akaba'}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
