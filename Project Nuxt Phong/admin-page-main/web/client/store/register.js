export const state = () => ({
  openDialogRegister: false
})

export const mutations = {
  setOpenDialogRegister(state, value) {
      state.openDialogRegister = value
  }
}