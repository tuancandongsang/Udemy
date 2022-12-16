import React, { useState } from "react";
import { Select, Space, Affix } from "antd";
import ProductService from "../../../api/ProductService";
const { Option } = Select;

Search.propTypes = {};

const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    if (newValue) {
      ProductService.getByName(newValue).then((res) => {
        const products = res.data.map((product) => {
          return { name: product.name, id: product.id, image: product.image };
        });
        setData(products);
      });
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const options = data.map((d) => (
    <Option key={d.id}>
      <Space>
        <img src={d.image} width={"50px"} />
        {d.name}
      </Space>
    </Option>
  ));
  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
    >
      {options}
    </Select>
  );
};

function Search(props) {
  return (
    <SearchInput
      placeholder="input search text"
      style={{
        width: 200,
      }}
    />
  );
}

export default Search;
