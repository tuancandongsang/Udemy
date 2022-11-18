export const state = () => ({
  language:"",
  currentPage:"/",
  openDialogRegister:false,
})
export const mutations = {
  changeLanguage: (state, value) => {
      state.language = value
  },
  changeOpenDialogRegister: (state, value) => {
      state.openDialogRegister = value
  },
  setCurrentPage: (state, value) => {
      state.currentPage = value
  }
}
