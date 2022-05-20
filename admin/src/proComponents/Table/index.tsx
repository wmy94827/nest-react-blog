import React, { Ref, useImperativeHandle } from 'react';
import { Table, Card, Space, Form, FormInstance } from '@arco-design/web-react';
import type { TableProps, TableColumnProps } from '@arco-design/web-react';
import shortid from 'shortid';
import { useAntdTable } from 'ahooks';
export interface ProTableInstance {
  reload: () => void;
}

export type ProColumns<T = unknown> = TableColumnProps<T>[];
interface ProTableProps extends TableProps {
  request?: (param: unknown) => Promise<Result> | Result;
  tableRef?: Ref<ProTableInstance>;
  toolBarRender?: React.ReactNode;
  form?: FormInstance;
}
interface Result {
  total: number;
  list: unknown[];
}
function ProTable(props: ProTableProps) {
  const { request, tableRef, toolBarRender, form, ...rest } = props;
  const getTableData = async ({ current, pageSize }): Promise<Result> => {
    let formData = {};
    if (form) {
      formData = await form?.validate();
    }
    const res = await request({
      page: current,
      size: pageSize,
      ...formData,
    });
    return Promise.resolve({
      list: res?.list ?? [],
      total: res?.total ?? 0,
    });
  };

  const {
    tableProps: { dataSource: data, loading, pagination, onChange },
    refresh,
    search: { submit },
  } = useAntdTable(getTableData, {
    manual: false,
  });

  useImperativeHandle(tableRef, () => ({
    reload: refresh,
    reset: submit,
  }));

  return (
    <Card>
      <div className="flex items-center justify-end mb-14px">
        <Space size={10}>{toolBarRender}</Space>
      </div>
      <Table
        data={data}
        loading={loading}
        pagination={{
          ...pagination,
          showTotal: true,
          sizeCanChange: true,
        }}
        onChange={onChange}
        rowKey={() => shortid.generate()}
        {...rest}
      />
    </Card>
  );
}

export default React.memo(ProTable);
