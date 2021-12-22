import axios from "axios";

export default {
    namespaced: true,
    state: {
        posts: [],
        todos: [],
        isLoading: false
        
    },
    mutations: {
        setIsLoading(state) {
          state.isLoading = true
        },
        unSetIsLoading(state) {
             state.isLoading = false
        },
        setPosts(state,payload) {
            state.posts = payload;  
        }
        
    },
    actions: {
        getPosts(context) {
            context.commit('setIsLoading');
            axios.get("http://localhost/chuobusiness/public/api/posts")
                .then(rs => {
                    context.commit('unSetIsLoading');
                    context.commit('setPosts', rs.data);
                    // console.log(rs.data);
                })
                .catch(error => {
                    context.commit('unSetIsLoading');
                    console.error(error);
                }) 
        },
        postData(context,{title,body}) {
            let data = {
                title,
                body
            };
            context.commit('setIsLoading');
            axios.post("http://localhost/chuobusiness/public/api/posts",data)
                .then(rs => {
                    context.commit('unSetIsLoading');
                    console.log(rs.statusText);
                })
                .catch(error => {
                    context.commit('unSetIsLoading');
                    console.error(error)
                })

        },
        updateData({commit},{title,body}) {
            commit('setIsLoading');
         let data = {
                title,
                body
            };
            axios.patch("http://localhost/chuobusiness/public/api/post/14",data)
                .then(rs => {
                    commit('unSetIsLoading');
                    console.log(rs.statusText);
                })
                .catch(error => { commit('unSetIsLoading'); console.error(error); })
            
        },
        deleteData({commit}) {
            commit('setIsLoading');
            axios.delete("http://localhost/chuobusiness/public/api/post/14")   
                .then(rs => {
                    commit('unSetIsLoading');
                    console.log(rs.statusText);
                })
                .catch(error=> { commit('unSetIsLoading'); console.error(error); })
        }
        
    },
    getters: {
        
    }
}