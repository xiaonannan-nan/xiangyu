// export const state = {
//   //用户信息
//   userlnfo: {
//     token: '',
//     user: {
//       nickname: ''
//     }
//   }
// }

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
