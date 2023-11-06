import React, { useState, useEffect } from 'react';

function UniqueNumbersList({ numbers }) {
  // State để lưu trữ danh sách các số xuất hiện 1 lần hoặc lặp lại nhiều lần
  const [uniqueNumbers, setUniqueNumbers] = useState([]);

  // Sử dụng useEffect để tính toán danh sách các số
  useEffect(() => {
    const countMap = new Map();

    // Đếm số lần xuất hiện của mỗi số trong mảng
    numbers.forEach((num) => {
      if (countMap.has(num)) {
        countMap.set(num, countMap.get(num) + 1);
      } else {
        countMap.set(num, 1);
      }
    });

    // Lọc ra các số xuất hiện 1 lần và các số lặp lại nhiều lần (lấy 1 số duy nhất)
    const uniqueNumbersArray = numbers.filter((num) => {
      if (countMap.get(num) === 1) {
        return true; // Giữ lại các số xuất hiện 1 lần
      } else {
        countMap.set(num, 0); // Đặt số lần xuất hiện của các số lặp lại nhiều lần thành 0
        return true; // Giữ lại một số duy nhất của các số lặp lại nhiều lần
      }
    });

    setUniqueNumbers(uniqueNumbersArray);
  }, [numbers]);

  return (
    <ul>
      {uniqueNumbers.map((number, index) => (
        <li key={index}>{number}</li>
      ))}
    </ul>
  );
}

export default UniqueNumbersList;
