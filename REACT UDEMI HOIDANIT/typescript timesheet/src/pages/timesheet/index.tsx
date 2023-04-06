import React, { useCallback, useEffect, useRef, useState } from "react";
import { theme } from "antd";

import AdvancedSearchForm from "@/components/timesheet/AdvancedSearchForm";
import TimeSheetTable from "@/components/timesheet/TimesheetTable";
import TableDataType from "@/types/TableDataType";
import FormItemEnum from "@/types/timesheet/FormItemEnum";

import TimeSheetFilterRequest from "@/types/timesheet/TimeSheetFilterRequest";
import type { TablePaginationConfig } from "antd/es/table";

import { DEFAULT_PAGE } from "@/utils/constants";
import { searchTimeSheet } from "@/apis/timeSheetAPI";
import { getCurrentMonthRange } from "@/utils/date";

import dayjs from "dayjs";

const currentDate = getCurrentMonthRange();

const defaultTimeSheetFilterRequest: TimeSheetFilterRequest = {
  fromDate: currentDate[0],
  toDate: currentDate[1],
  projectIds: [],
  account: "",
  pageNumber: DEFAULT_PAGE.INDEX,
  pageSize: DEFAULT_PAGE.SIZE
};

interface TableParams {
  pagination?: TablePaginationConfig;
}

const defaultTableParams = {
  pagination: {
    current: DEFAULT_PAGE.INDEX + 1,
    pageSize: DEFAULT_PAGE.SIZE
  }
};

const TimeSheet = () => {
  const { token } = theme.useToken();

  const [listTimeSheet, setListTimeSheet] = useState<Array<TableDataType[]>>([]);
  const [timeSheetFilterRequest, setTimeSheetFilterRequest] = useState<TimeSheetFilterRequest>({ ...defaultTimeSheetFilterRequest });
  const [dataExportExcelList, setDataExportExcelList] = useState([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    ...defaultTableParams
  });
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    fetchTimeSheet(timeSheetFilterRequest);
    return () => {};
  }, [JSON.stringify(timeSheetFilterRequest)]);

  const onSubmitSearchForm = (formData) => {
    const requestData: TimeSheetFilterRequest = {
      fromDate: formData[FormItemEnum.FIELD_DATE][0] ? formData[FormItemEnum.FIELD_DATE][0] : currentDate[0],
      toDate: formData[FormItemEnum.FIELD_DATE][1] ? formData[FormItemEnum.FIELD_DATE][1] : currentDate[1],
      projectIds: formData[FormItemEnum.FIELD_PROJECT] && [...formData[FormItemEnum.FIELD_PROJECT]],
      account: formData[FormItemEnum.FIELD_ACCOUNT],
      pageNumber: DEFAULT_PAGE.INDEX,
      pageSize: DEFAULT_PAGE.SIZE
    };
    setTimeSheetFilterRequest(requestData);
  };

  const hanldeConvertDataToExportExcel = (listData) => {
    const convertedExcelList = listData.map((item, index) => {
      return {
        STT: index + 1,
        "Full Name": item.fullName,
        KnoxId: item.knoxId,
        ProjectName: item.projectName,
        "WFH Dates Detail": item.wfhDateList,
        "OT Dates Detail": item.otDateList,
        "Compensatory Leaves Detail": item.compensatoryLeaveList,
        "Abnormal Leaves Detail": item.abnormalLeaveList,
        "Day Offs Detail": item.dayOffList,
        Note: handleChangeSpaceNote(item.note)
      };
    });
    setDataExportExcelList(convertedExcelList);
  };

  const handleChangeSpaceNote = (note) => {
    if (note) {
      return note.replaceAll("/n/", " ");
    }
  };

  const fetchTimeSheet = useCallback((request = { ...defaultTimeSheetFilterRequest }) => {
    setLoadingTable(true);
    searchTimeSheet(request)
      .then((response: any) => {
        const fromDate = dayjs(request.fromDate).format("YYYY-MM-DD");
        const toDate = dayjs(request.toDate).format("YYYY-MM-DD");

        let timeSheetList: TableDataType[] = response.data.listTimeSheet.map((item: any, index: number) => {
          return {
            key: item.employeeId,
            projectName: item.projectName,
            recordNo: index + 1,
            fullName: item.fullName,
            knoxID: item.knoxID,
            filteredTime: `${fromDate} ~ ${toDate}`,
            wfhDateList: item.wfhDateList,
            otDateList: item.otDateList,
            compensatoryLeaveList: item.compensatoryDateList,
            abnormalLeaveList: item.abnormalLeaveList,
            dayOffList: item.dayOffList,
            note: item.notes
          };
        });
        setListTimeSheet(timeSheetList);
        hanldeConvertDataToExportExcel(timeSheetList);
        setTableParams({
          ...tableParams,
          pagination: {
            current: request.pageNumber + 1,
            pageSize: request.pageSize,
            total: response.data.total
          }
        });
      })
      .catch((err: any) => {
        setListTimeSheet([]);
        setTableParams({
          ...defaultTableParams
        });
      })
      .finally(() => {
        setLoadingTable(false);
      });
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTimeSheetFilterRequest({
      ...timeSheetFilterRequest,
      pageNumber: pagination.current - 1,
      pageSize: pagination.pageSize
    });
    // timeSheetFilterRequest.current.pageNumber = pagination.current - 1;
    // timeSheetFilterRequest.current.pageSize = pagination.pageSize;
  };
  return (
    <div className="time-sheet page-layout-default">
      <AdvancedSearchForm onSubmitSearchForm={onSubmitSearchForm} initialValues={defaultTimeSheetFilterRequest} />
      <TimeSheetTable
        loadingTable={loadingTable}
        timeSheetList={listTimeSheet}
        dataExportExcelList={dataExportExcelList}
        tableParams={tableParams}
        handleTableChange={handleTableChange}
        fetchTimeSheet={fetchTimeSheet}
      ></TimeSheetTable>
    </div>
  );
};

export default TimeSheet;
