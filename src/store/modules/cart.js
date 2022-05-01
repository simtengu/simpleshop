import CartItem from "../../models/cartItem";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    cartItems: [],
    total_quantity: 0,
    total_amount: 0,
    orders: null,
    isLoading: false,
  },
  mutations: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    unSetIsLoading(state) {
      state.isLoading = false;
    },

    addItem(state, product) {
      let productLastDetails = state.cartItems.find(
        (item) => item.id === product.id
      );
      let quantity = productLastDetails ? productLastDetails.quantity + 1 : 1;
      let amount = productLastDetails
        ? productLastDetails.total_amount + product.price
        : product.price;
      let image = productLastDetails
        ? productLastDetails.image
        : product.images[0].name;

      //the item to be added or replace the existing one......................
      let newItem = new CartItem(
        product.id,
        product.name,
        product.price,
        quantity,
        amount,
        image
      );

      if (productLastDetails) {
        const productIndex = state.cartItems.findIndex(
          (item) => item.id === product.id
        );
        //updated existing product.....................
        state.cartItems[productIndex] = newItem;
        state.total_amount += product.price;
        state.total_quantity += 1;
        return;
      } else {
        state.cartItems.push(newItem);
        state.total_amount += product.price;
        state.total_quantity += 1;
      }
    },

    reduceItem(state, product_id) {
      let product = state.cartItems.find(
        (product) => product.id === product_id
      );
      let productIndex = state.cartItems.findIndex(
        (product) => product.id === product_id
      );
      if (product.quantity > 1) {
        //update product details...........................................
        state.cartItems[productIndex].quantity = product.quantity - 1;
        state.cartItems[productIndex].total_amount =
          product.total_amount - product.price;
        state.total_amount = state.total_amount - product.price;
        state.total_quantity = state.total_quantity - 1;
        return;
      }

      state.total_amount = state.total_amount - product.price;
      state.total_quantity = state.total_quantity - 1;
      let newProductsArray = state.cartItems.filter(
        (item) => item.id != product_id
      );
      state.cartItems = newProductsArray;
    },
    updateOrders(state, orders) {
      state.orders = orders;
    },
    clearCart(state) {
      state.cartItems = [];
      state.total_quantity = 0;
      state.total_amount = 0;
    },
  },
  actions: {
    async getOrders({ commit }) {
      commit("setIsLoading");
      try {
        const rs = await axios(
          "http://onlinestore.mbeyamilk.com/api/orders",
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );
        const orders = await rs.data;
        commit("updateOrders", orders.data);
        console.log("orders from the server", orders);
        commit("unSetIsLoading");
      } catch (error) {
        commit("unSetIsLoading");
        console.log(error);
      }
    },
    async saveOrder({ commit }, orderData) {
      if (!orderData.total_amount > 0) {
        alert("YOU DON'T HAVE ITEMS IN YOUR CART YET");
        return;
      }
      commit("setIsLoading");
      let newOrder = {
        total_amount: orderData.total_amount,
        items_count: orderData.items_count,
      };

      try {
        const rs = await axios.post(
          "http://onlinestore.mbeyamilk.com/api/order",
          newOrder,
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );
        let order = await rs.data;
        let items = {
          order_id: order.id,
          order_items: orderData.items,
        };

        const response = await axios.post(
          "http://onlinestore.mbeyamilk.com/api/order/add_order_item",
          items,
          { headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` } }
        );

        if (response.statusText === "Created") {
          console.log(response.data.orders);
          commit("updateOrders", response.data.orders);
          commit("clearCart");
          commit("unSetIsLoading");
          alert("Order successfully saved");
        }
      } catch (error) {
        commit("unSetIsLoading");
        console.log(error);
      }
    },
  },
  getters: {},
};


// import { ADD_CART_ITEM, REDUCE_CART_ITEM, PLACE_ORDER, CLEAR_CART } from '../actions/cart';
// import CartItem from "../../resources/cartItem"
// let initialState = {
//     orders: [],
//     cart: {
//         totalAmount: 0,
//         totalQuantity: 0,
//         cartItems: []
//     }
// }
// const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_CART_ITEM:
//             let inCartItem = state.cart.cartItems.find((product) => product._id === action.product._id);
//             let itemsInCart = state.cart.cartItems;
//             let newOrUpdatedItem = inCartItem ? 
//                                                 new CartItem(inCartItem._id, inCartItem.quantity + 1,
//                                                      inCartItem.amount + inCartItem.price, inCartItem.price, inCartItem.title,inCartItem.image)
//                                               : new CartItem( action.product._id, 1, action.product.price, action.product.price,
//                                                                action.product.title,action.product.images[0]
//                 );
//             console.log('passed item .. ', action.product)
//             console.log('passed items id',action.product._id)
//             console.log('item in cart ..', inCartItem)
//                 if(inCartItem){
//                     console.log('the item is in the cart.......')
//                     return { ...state}
//                     let itemIndex = itemsInCart.findIndex(item=>item._id === action.product._id);
                    
//                     console.log('item incart index ',itemIndex)
//                     // itemsInCart[itemIndex] = newOrUpdatedItem;
//                     console.log('itemsInCart[itemIndex]', itemsInCart[itemIndex]);
                     
//                     // console.log('items in cart updated ',itemsInCart)
//                     let inCartIds = itemsInCart.map(item=>item._id);
//                     console.log('in cart ids ',inCartIds)
//                     // return {
//                         //     ...state,
//                         //     cart: {
//                             //         totalAmount: state.cart.totalAmount + inCartItem.price,
//                             //         totalQuantity: state.cart.totalQuantity + 1,
//                             //         cartItems: itemsInCart
//                             //     }
//                             // }
                            
//                         }else{
//                             console.log('item not in cart....');
//                             itemsInCart.push(newOrUpdatedItem)
//                             let inCartIds = itemsInCart.map(item=>item._id);
//                             console.log('in cart ids after update.. ',inCartIds)


//                     return {
//                         ...state,
//                         cart: {
//                             totalAmount: state.cart.totalAmount + action.product.price,
//                             totalQuantity: state.cart.totalQuantity + 1,
//                             cartItems: itemsInCart
//                         }
//                     }

//                 }


//         case REDUCE_CART_ITEM:
//             let cartProducts = state.cart.cartItems;
//             let itemInCart = cartProducts.find(item => item._id === action.productId);
//             console.log('cart_items', cartProducts)
//             console.log('passed id', action.productId)
//             console.log('itemInCart', itemInCart)
//             let totalAmountt = state.cart.totalAmount - itemInCart.price;
//             let totalQuantityy = state.cart.totalQuantity - 1;
//             if (itemInCart.quantity > 1) {
//                 let itemIndex = cartProducts.map(item => item._id).indexOf(action.productId);
//                 let latestItem = new CartItem(itemInCart._id, itemInCart.quantity - 1, itemInCart.amount - itemInCart.price,itemInCart.price,itemInCart.title,itemInCart.image); 

//                 cartProducts[itemIndex] = latestItem
//                 console.log('cartproduct[itemIndex]', cartProducts)
          
//                 return {
//                     ...state,
//                     cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: cartProducts }
//                 }
//             } else {
//                let latestItemsList = cartProducts.filter(item => item._id !== action.productId);
//                 return {
//                     ...state,
//                     cart: { totalAmount: totalAmountt, totalQuantity: totalQuantityy, cartItems: latestItemsList }
//                 }

//             }


     

//         case CLEAR_CART:
//             return {
//                 ...state,
//                 cart: {
//                     totalAmount: 0,
//                     totalQuantity: 0,
//                     cartItems: []
//                 }

//             }
//         case PLACE_ORDER:
//             return {
//                 orders: state.orders.concat([state.cart]), cart: {
//                     totalAmount: 0,
//                     totalQuantity: 0,
//                     cartItems: []
//                 }
//             }

//         default:
//             return state;
//     }

// }

// export default cartReducer;
