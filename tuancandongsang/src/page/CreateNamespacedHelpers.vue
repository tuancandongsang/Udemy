<template>
  <div>
    <h2>cách 1</h2>
    b1: import { createNamespacedHelpers } from 'vuex' <br />
    const { mapState, mapGetters, mapActions, mapMutations } =
    createNamespacedHelpers('myModule'); <br />
    b2: đặt tên <br />
    const initialHelpers = createNamespacedHelpers('initialPage/initial')<br />
    b3: lấy ra<br /><br />
    computed: {<br />
    ...initialHelpers.mapGetters([<br />
    'getListSubscribeByEmail',<br />
    'getCustomerAccount',<br />
    'getShowServiceChangeRequest'<br />
    ])}<br /><br />
    methods: {<br />
    ...initialHelpers.mapActions([<br />
    'getCustomerServiceSubscribe',<br />
    'getCustomerAccountByEmail',<br />
    ])}<br />
    <h2>cách 2</h2>
    b1: import { createNamespacedHelpers } from 'vuex'; <br />
    import { myModule } from './myModule'; <br />
    b2: const { mapState, mapGetters, mapActions, mapMutations } =
    createNamespacedHelpers('myModule'); <br />
    b3 : <br />
    export default { <br />
    computed: { <br />
    ...mapState(['propertyA', 'propertyB']), <br />
    ...mapGetters(['getterA', 'getterB']) <br />
    }, <br />
    methods: { <br />
    ...mapActions(['actionA', 'actionB']), <br />
    ...mapMutations(['mutationA', 'mutationB']) <br />
    } <br />
    } <br />

    <br />
    <b>=> tránh lỗi trùng tên của các module trong vuex</b><br />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
