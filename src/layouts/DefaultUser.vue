<template>
  <div>
     <layout-header/>
    <layout-user/>
   
  
  </div>
</template>

<script>
import LayoutHeader from '../components/Header'
import LayoutUser from '../components/User'


export default {
  name: 'DefaultUser',
 
   
  components: {
      LayoutHeader,
    LayoutUser,
  

  },
}
</script>

<style>
</style>
