import React, { useEffect, memo, useState, useCallback } from "react";

import { Button, Col, Form, Row, Select, DatePicker, theme, Input } from "antd";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { disableDateSelectAfterToday, getCurrentMonthRange } from "@/utils/date";

import _ from "lodash";

import FormItemEnum from "@/types/timesheet/FormItemEnum";
import ProjectFilterResponse from "@/types/project/ProjectFilterResponse";
import ProjectFilterRequest from "@/types/project/ProjectFilterRequest";
import { findProjectByNameLike } from "@/apis/serveProject";

import { DEFAULT_PAGE } from "@/utils/constants";

const { Option } = Select;
const { RangePicker } = DatePicker;

const currentDate = getCurrentMonthRange();

const defaultProjectFilterRequest: ProjectFilterRequest = {
  name: "",
  page: DEFAULT_PAGE.INDEX,
  size: DEFAULT_PAGE.SIZE
};
const AdvancedSearchForm = ({ onSubmitSearchForm, initialValues }) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [projectName, setProjectName] = useState<string>();
  const [listProject, setListProject] = useState<Array<ProjectFilterResponse>>([]);

  const formStyle = {
    maxWidth: "none",
    // background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG
  };
  useEffect(() => {
    fetchProject();
  }, []);

  const handleChange = (newValue: string) => {
    setProjectName(newValue);
  };
  const fetchProject = useCallback((params = { ...defaultProjectFilterRequest }) => {
    findProjectByNameLike(params)
      .then((response: any) => {
        setListProject(response.data);
        // form.setFieldValue(FormItemEnum.FIELD_PROJECT, [response.data[0].id]);
        // form.submit();
      })
      .catch((err: any) => {});
  }, []);
  const onSearchProjectByName = _.debounce((newValue: string) => {
    if (newValue) {
      const params = { ...defaultProjectFilterRequest };
      params.name = newValue;
      fetchProject(params);
    } else {
    }
  }, 1000);
  const onResetSearchForm = () => {
    form.resetFields();
    onSubmitSearchForm(form.getFieldsValue());
  };
  return (
    <>
      <Form
        initialValues={{ "field-date": [initialValues.fromDate, initialValues.toDate] }}
        className="ant-card search-form"
        form={form}
        name="advanced_search"
        onFinish={onSubmitSearchForm}
      >
        <Row gutter={24}>
          <Col span={4}>
            <Form.Item
              name={FormItemEnum.FIELD_PROJECT}
              label={`Project`}
              rules={[
                {
                  required: false,
                  message: "Please choose a project !"
                }
              ]}
            >
              <Select
                showSearch
                mode="multiple"
                placeholder="Project Name"
                // style={props.style}
                defaultActiveFirstOption={true}
                showArrow={true}
                filterOption={false}
                onSearch={onSearchProjectByName}
                onChange={handleChange}
                notFoundContent={null}
                options={(listProject || []).map((project) => ({
                  value: project.id,
                  label: project.name
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={FormItemEnum.FIELD_DATE}
              label={`Date`}
              rules={[
                {
                  required: true,
                  message: "Please choose date range!"
                }
              ]}
            >
              <RangePicker format="YYYY-MM-DD" disabledDate={disableDateSelectAfterToday} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name={FormItemEnum.FIELD_ACCOUNT}
              label={`Account`}
              rules={[
                {
                  required: false
                }
              ]}
            >
              <Input className="ant-input" placeholder="Account" />
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Button icon={<SearchOutlined />} type="primary" htmlType="submit" style={{ margin: "0 8px", width: "150px" }}>
              Search
            </Button>
            <Button icon={<ReloadOutlined />} style={{ margin: "0 8px", width: "120px" }} onClick={onResetSearchForm}>
              Reset
            </Button>
            {/* <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand)
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a> */}
          </Col>
        </Row>
        <Row></Row>
      </Form>
    </>
  );
};

export default memo(AdvancedSearchForm);
