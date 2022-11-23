<template>
    <div>
        <h1>CORS</h1>
        <p>
            <b>- Cross-origin resource sharing: CORS </b> là 1 cơ chế cho phép 1 trang wep này có thể lấy tài nguyên từ
            1 trang wep khác ( 2 trang wep không chung domain) <br>
            <b>Lỗi CORS policy</b> là khi call API tới server mà không có header Access-Control-Allow-Origin hoặc giá
            trị của nó không hợp lệ thì sẽ phát sinh lỗi này và không lấy được dữ liệu từ API.
        </p>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>