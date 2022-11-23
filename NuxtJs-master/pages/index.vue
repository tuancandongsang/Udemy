<template>
  <div>
    <div>
      <h1>SERVER-SIDE RENDERING</h1>
      <p>
        Gọi là <b>SERVER-SIDE RENDERING</b> vì phần lớn logic sẽ được xử lý ở
        server:
      </p>
      <p>
        b1: Khi người dùng vào một trang web, trình duyệt sẽ gửi GET request tới
        web server
      </p>
      <p>b2: Web server sẽ nhận request, đọc dữ liệu từ database.</p>
      <p>
        b3: Web server sẽ render HTML, trả về cho browser để hiển thị cho người
        dùng
      </p>
      <img
        src="https://vomanhkien.com/wp-content/uploads/2020/09/ssr.png"
        alt=""
      />
      <br />
      <b>Một số tính chất của cơ chế server side rendering:</b> <br />
      <p>- Mọi logic đều nằm ở phía server</p>
      <p>- Logic để routing, render – chuyển trang nằm ở server ( thẻ a)</p>
      <b>Uu điểm</b> <br />
      <p>
        Initial load nhanh, dễ otpimize, vì toàn bộ dữ liệu đã được xử lý ở
        server. Client chỉ việc hiển thị.
      </p>
      <p>Các web framework từ xưa đến nay đều hỗ trợ cơ chế này</p>
      <p>
        Dễ hiểu và dễ code hơn. Developer chỉ cần code 1 project web là được,
        không cần phải tách ra front-end và back-end
      </p>
      <p>
        SEO tốt vì khi bot của Google, Bing vào web sẽ thấy toàn bộ dữ liệu dưới
        dạng HTML.
      </p>
      <p>Thích hợp cho các kênh tin tức, đọc báo...</p>
      <p>Chạy được trên phần lớn mọi trình duyệt</p>
      <b>Nhược điểm</b> <br />
      <p>Mỗi lần người dùng chuyển trang là site phải load lại</p>
      <p>Nặng server vì server phải xử lý nhiều logic và dữ liệu</p>
      <p>
        Tốn băng thông vì server phải gửi nhiều dữ liệu thừa và trùng (HTML,
        header, footer).
      </p>
      <p>
        Tương tác không tốt như Client Side rendering vì trang phải refresh,
        load lại nhiều lần.
      </p>
      <b>Các trang wep sử dụng : dantri...</b>

      <h1>CLIENT-SIDE RENDERING (SPA)</h1>
      <p>Gọi là <b>client-side rendering</b> vì nằm trong 1 page duy nhất</p>
      <img
        src="https://vomanhkien.com/wp-content/uploads/2020/09/csr.png"
        alt=""
      />
      <p>
        Client Side Rendering tức là việc render HTML, CSS sẽ được thực hiện ở
        client (Tức JavaScript ở trình duyệt), Những logic về render dữ liệu sẽ
        được xử lý ở phía client thay cho server
      </p>
      <b>Đặc điểm</b> <br />
      <p>
        Những logic đơn giản (validation, đọc dữ liệu, sorting, filtering) nằm ở
        client side
      </p>
      <p>
        Logic để routing (chuyển trang), render (hiển thị) dữ liệu thì nằm ở
        client side, trừ 1 số trường hợp dùng thẻ a
      </p>
      <p>Không load lại trang</p>
      <p>
        Khi click chuyển page, trông thì rất nhiều trang nhưng thực chất có 1
        trang ( xét về cấu trúc file chứ k phải hiển thị giao diện).
      </p>
      <p>
        Khi click chuyển trang, dữ liệu ban đầu đã ở sẵn trong trình duyệt nên
        hiển thị giao diện sẽ nhanh, vd các thanh header, footer... nó chỉ gọi
        thêm 1 số dữ liệu để hiển thị thêm
      </p>
      <p>
        Logic phức tạp (thanh toán, phân quyền) hoặc cần xử lý nhiều (data
        processing, report) vẫn nằm ở server side.
      </p>
      <b>Ưu điểm</b> <br />
      <p>
        - Page chỉ cần load một lần duy nhất. Khi user chuyển trang hoặc thêm dữ
        liệu, JavaScript sẽ lấy và gửi dữ liệu từ server qua AJAX. User có thể
        thấy dữ liệu mới mà không cần chuyển trang. ( cần thêm dữ liệu từ dât
        thì sẽ gửi lên serve và lấy về, k cần lấy toàn bộ)
      </p>
      <p>- Chuyển logic sang client nên giảm tải được một phần cho server.</p>
      <p>
        Giảm được băng thông do chỉ cần lấy JSON và dữ liệu cần thiết, thay vì
        phải lấy toàn bộ trang
      </p>
      <p>
        Với các ứng dụng cần tương tác nhiều, SPA hoạt động mượt mà hơn vì code
        chạy trên browser, không cần load đi loại lại nhiều
      </p>
      <p>
        Với 1 ứng dụng muốn phát triển thêm vd mobile app, sẽ tiết kiện đc API,
        chỉ cần bổ xung thêm code frontend cho ứng dụng
      </p>
      <b>Nhược điểm</b> <br />
      <p>
        - Load sẽ chậm hơn ở thời điểm đầu tiên truy cập. Vì broser phải tải
        toàn bộ JavaScript về, parse và chạy JS, gọi API để lấy dữ liệu thêm từ
        server, sau đó render dữ liệu
      </p>
      <p>
        Đòi hỏi project phải chia làm 2 phần riêng là back-end (REST api) và
        front-end nên khó code hơn
      </p>
      <p>Không chạy được nếu JavaScript bị lỗi.</p>
      <p>Nếu client sử dụng mobile, device yếu thì khi load sẽ bị chậm</p>
      <b>Các trang wep sử dụng : facebook...</b>
    </div>
    <h2>kết hợp</h2>
    <p>Trong 1 wep có thể kết hợp SPA và MPA.</p>

    
    <button v-on:click="()=>handleBack(this.$router.go(-1))">BACK</button>
  </div>
</template>

<script>
export default {
  //  layout:'client'
};
</script>
