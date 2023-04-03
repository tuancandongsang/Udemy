import listService from '../../api/listService';
const state = {
  items: [],
  itemId: {},
  filter: 'process',
  valueDate: '',
  valueSearch: 0,
  render: [],
  pageNumber: 1,
  pageSize: 5,
  nodataCSSinit: false
};
const getters = {
  itemsList: (state) => state.items,
  itemsProcess: (state) =>
    state.items.filter((item) => item.value == 'process'),
  itemSystem: (state) => state.items.filter((item) => item.value == 'system'),
  filter: (state) => state.filter,
  valueDate: (state) => state.valueDate,
  valueSearch: (state) => state.items.length,
  renderList: (state) => state.render,
  pageNumber: (state) => state.pageNumber,
  renderListTotal: (state) => state.render.length,
  pageSize: (state) => state.pageSize,
  nodataCSSinit: (state) => state.nodataCSSinit,
  dataItem: (state) => state.dataItem
};

const actions = {
  async getAllList({ commit }) {
    try {
      const data = await listService.getListAll();
      commit('getAllList', data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getItemDetail({ commit }, id) {
    try {
      const data = await listService.getListDetail(id)
      commit('getItemDetail', data.data)
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  getItemDetail(state, dataItem) {
    state.dataItem = dataItem
  },
  getAllList(state, item) {
    state.items = item;
  },
  changefilter(state, filterState) {
    state.filter = filterState;
  },
  updatedDate(state, date) {
    state.valueDate = date;
  },
  getRenderList(state, render) {
    state.render = render;
  },
  loadMorePageSize(state, num) {
    if (state.pageSize + num > getters.itemsList(state).length) {
      state.pageSize = getters.itemsList(state).length;
    } else {
      state.pageSize += num;
    }
  },
  changepagenumber(state, num) {
    state.pageNumber = num;
  },
  fomatPageNumber(state) {
    state.pageNumber = 1;
  },
  formatpageSize(state, num) {
    state.pageSize = num;
  },
  formatnodataCSSinit(state) {
    state.nodataCSSinit = false
  },
  updatenodataCSSinit(state) {
    state.nodataCSSinit = true
  },
  addingPagesizeload(state, num) {
    state.pageSize += num;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
