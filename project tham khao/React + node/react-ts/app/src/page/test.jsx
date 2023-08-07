import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LazyLoadData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    if (loading) return;

    setLoading(true);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
    );
    setData(prevData => [...prevData, ...response.data]);
    setLoading(false);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 500) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <div
      style={{
        height: '500px',
        overflowY: 'scroll',
        border: '1px solid #ccc',
      }}
      onScroll={handleScroll}
    >
      <h1>Lazy Load Data Example</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LazyLoadData;
