<template>
  <b-nav  vertical class="bg-dark" style="height: 100vh; margin-left: -15px;">
    <b-nav-item  link-classes="text-white" active to="/">Dashboard</b-nav-item >
    <b-nav-item link-classes="text-white" to="/user-list">User</b-nav-item>
    <b-nav-item v-b-toggle.Category variant="primary" link-classes="text-white">Category
         <b-collapse id="Category" class="mt-2">
        <b-nav vertical class="w-25">
          <b-nav-item link-classes="text-white" to="/category-list">View</b-nav-item>
          <b-nav-item link-classes="text-white" to="/category-create">Create</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-nav-item>
        <b-nav-item v-b-toggle.Product link-classes="text-white" >Product
         <b-collapse id="Product" class="mt-2">
        <b-nav vertical class="w-25">
          <b-nav-item link-classes="text-white" to="/product-list">View</b-nav-item>
          <b-nav-item link-classes="text-white" to="/product-create">Create</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-nav-item>

    <b-nav-item v-b-toggle.Order link-classes="text-white">Order
  <b-collapse id="Order" class="mt-2">
        <b-nav vertical class="w-25">
          <b-nav-item link-classes="text-white" to="/order-list">Order</b-nav-item>
          <b-nav-item link-classes="text-white" to="/product-order">Ordered Product</b-nav-item>
          <b-nav-item link-classes="text-white" to="/order-request">Special Order</b-nav-item>
           </b-nav>
      </b-collapse>
    </b-nav-item>
        <b-nav-item v-b-toggle.Image link-classes="text-white">Image
  <b-collapse id="Image" class="mt-2">
        <b-nav vertical class="w-25">
          <b-nav-item link-classes="text-white">View</b-nav-item>
          <b-nav-item link-classes="text-white">Create</b-nav-item>
           </b-nav>
      </b-collapse>
    </b-nav-item>

    
  </b-nav>
</template>

<script>
export default {
  name: 'LayoutSideNav',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
