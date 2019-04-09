<template>

  
<div>
<br>
<br>
<br>
    <b-container fluid>
    <b-row>
        <b-col col lg="3"></b-col>
        <b-col col lg="6">
          <h2 class="text-center">Create category</h2>
            <br>   
 <b-card deck
    
    >

 <div role="group">
    <label for="inputLive">Category Name:</label>
    <b-form-input
      id="inputLive"
      v-model="name"
      trim
      type="text"
      :state="nameState"
      aria-describedby="inputLiveHelp inputLiveFeedback"
      placeholder="Enter category name"
    />

    <!-- This will only be shown if the preceeding input has an invalid state -->
    <b-form-invalid-feedback id="inputLiveFeedback">
      Enter at least 3 letters
    </b-form-invalid-feedback>

    <!-- This is a form text block (formerly known as help block) -->
   
  </div>
</b-card>
            </b-col >
            </b-row>
            </b-container>
  </div>
</template> 

<script>
export default {
  name: 'LayoutCreateCategory',
  props: {
    msg: String
  },
computed: {
      nameState() {
        return this.name.length > 2 ? true : false
      }
    },
    data() {
      return {
        name: ''
      }
    }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
