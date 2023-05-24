<template>
  <div>
    <input type="file" @change="handleFileChange" accept=".xlsx, .xls" />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <p>cài import * as XLSX from "xlsx";</p>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          this.parseExcelData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      }
    },
    parseExcelData(jsonData) {
      const headers = jsonData[0];
      const rows = jsonData.slice(1);
      this.tableData = rows.map(row => {
        return {
          id: row[0],
          name: row[1],
          age: row[2]
        };
      });
    }
  }
};
</script>
