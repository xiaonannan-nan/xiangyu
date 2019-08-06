export const state = () => {
  return {
    history: []
  }
}

//同步修改数据 设置
export const mutations = {
  setHistory(state, arr) {
    state.history = arr
    console.log(state.history)
  }
}
