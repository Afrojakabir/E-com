<template>
<b-container fluid>
  <b-row>
    <b-col md="2" sm="3">
      <layout-side-nav />
    </b-col>
    <b-col md="10" sm="9">
      <layout-header :pageTitle="pageTitle"/>
      <router-view :pageTitle.sync="pageTitle"/>

    </b-col>
  </b-row>
</b-container>
</template>

<script>
import LayoutHeader from '../components/Header'
import LayoutSideNav from '../components/SideNav'
//import LayoutAdminCard from '../components/AdminCard'



export default {
  name: 'DefaultLayout',
   
  components: {
    LayoutHeader,
    LayoutSideNav,
   // LayoutAdminCard 
  },
 
  data () {
    return {
      pageTitle: 'Akaba'
    }
  }
}
</script>

<style>
</style>
