import VueRouter from 'vue-router'


const router = new VueRouter({
    routes: [
      { path: '/', component: () => import('./layouts/Default'),
        children: [
          {
            path: '/',
            component: () => import('./components/AdminCard')
          },
          {
            path: '/order',
            component: () => import('./pages/ViewOrder')
          },
          {
            path: '/user-list',
            component: () => import('./pages/ViewUser'),
            name: 'UserList'
          },
          {
            path: '/order-list',
            component: () => import('./pages/OrderList'),
            
          },
          {
            path: '/request-update-page/:orderId',
            component: () => import('./pages/RequestUpdate'),
            
          },
    
    

          {
            path: '/product-order',
            component: () => import('./pages/OrderProduct'),
           
          },

          {
            path: '/order-request',
            component: () => import('./pages/OrderRequest'),
           
          },

          {
            path: '/order-view/:orderId',
            component: () => import('./pages/ViewOrder'),
           
          },

          {
            path: '/category-list',
            component: () => import('./pages/CategoryList'),
            
          },

          {
            path: '/category-create',
            component: () => import('./pages/CreateCategory'),
            
          },

          {
            path: '/category-update/:categoryId/:name',
            component: () => import('./pages/CategoryUpdate'),
           
          },

          {
            path: '/product-create',
            component: () => import('./pages/CreateProduct'),
            
          },

          {
            path: '/product-list',
            component: () => import('./pages/ProductList'),
            
          },

        ]
      },

      { path: '/', component: () => import('./layouts/DefaultLogin'),
      children: [
        {
          path: '/user',
          component: () => import('./pages/Registration')
        },

                  
        {
          path: 'login',
          component: () => import('./pages/Login')
        }
        

      ]
    },
 
     
    ]

  
     
    
  })

  export default router
  //
  //{ path: '/', component: () => import('./layouts/DefaultLogin'),
  //children: [
  //  {

    //}
  //]
  //}