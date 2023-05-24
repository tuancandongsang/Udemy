<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Value</th>
          <th>Script</th>
          <th>Horizontal</th>
          <th>(RTL) script</th>
          <th>Mixed script</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>{{ item.id }}</td>
          <td class="example Text1">
            <span>{{ item.name }}</span>
          </td>
          <td class="example Text2">
            <span>{{ item.age }}</span>
          </td>
          <td class="example Text3">
            <span>{{ item.add }}</span>
          </td>
          <td class="example Text4">
            <span>{{ item.ping }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <button @click="exportToExcel">Xuất Excel</button>

    <br />
    <br />
    <p>cài import * as XLSX from "xlsx";</p>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableData: [
        { id: 1, name: "John", age: 25, add: "ha noi", ping: "game" },
        { id: 2, name: "Jane", age: 30, add: "ha noi", ping: "game" },
        { id: 4, name: "Bob", age: 35, add: "ha noi", ping: "game" },
        { id: 5, name: "Bob", age: 35, add: "ha noi", ping: "game" },
      ],
    };
  },
  methods: {
    exportToExcel() {
      const data = this.prepareDataForExcel();
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveExcelFile(excelBuffer, "data.xlsx");
    },
    prepareDataForExcel() {
      return this.tableData.map((item) => {
        return {
          ID: item.id,
          Name: item.name,
          Age: item.age,
          Add: item.add,
          Ping: item.ping,
        };
      });
    },
    saveExcelFile(buffer, fileName) {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  },
};
</script>
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  font: 16px Verdana, Arial, Helvetica, sans-serif;
  color: #444;
  background-color: #fff;
}

table {
  border-collapse: collapse;
  text-align: center;
  color: #000;
}

td:nth-of-type(odd) {
  background-color: #f1f1f1;
}

tr:hover > :not(th) {
  background-color: rgba(255, 127, 80, 0.2);
}

td:hover {
  background-color: rgba(255, 127, 80, 0.4) !important;
}

td,
th {
  border: 1px solid #000;
  padding: 3px;
}

th {
  background-color: #e7e9eb;
}

.example {
  height: 75px;
  width: 75px;
}

.example.Text1 span,
.example.Text1 {
  writing-mode: horizontal-tb;
}

.example.Text2 span,
.example.Text2 {
  writing-mode: vertical-lr;
}

.example.Text3 span,
.example.Text3 {
  writing-mode: vertical-rl;
}

.example.Text4 span,
.example.Text4 {
  writing-mode: sideways-lr;
}

.example.Text5 span,
.example.Text5 {
  writing-mode: sideways-rl;
}
</style>
