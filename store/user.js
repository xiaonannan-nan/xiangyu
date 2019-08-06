// export const state = {
//   //用户信息
//   userlnfo: {
//     token: '',
//     user: {
//       nickname: ''
//     }
//   }
// }
// 在vue中我们可以使用vuex来保存我们需要管理的状态值，值一旦被修改，所有引用该值的地方就会自动更新
export const state = () => {

  return {
    //用户信息
    userlnfo: {
      token: '',
      user: {}
    }
  }
}

//同步修改数据
export const mutations = {
  // state就是上面的state,这个参数是固定默认的
  // data使用调用该方法时候传入的数据
  setUserInfo(state, data) {
    state.userlnfo = data
  },
  //清除用户数据
  clearUserInfo(state) {
    state.userlnfo = {
      token: '',
      user: {}
    }
  }
}

//异步修改数据
export const actions = {

}
