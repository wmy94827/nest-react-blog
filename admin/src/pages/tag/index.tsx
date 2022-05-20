import { Button, Tag, Space, Modal } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import ProTable, { ProTableInstance, ProColumns } from '@/proComponents/Table';
import React, { useRef } from 'react';
import { formatDate } from '@/utils/utils';
import { useSetState } from 'ahooks';
import { getTagList, deleteTag } from '@/services/tag';

import EditTagInfo from './components/EditInfo';

function ClassifyList() {
  const tableRef = useRef<ProTableInstance>(null);
  const [selectState, setSelectState] = useSetState({
    selectInfo: null,
    visible: false,
  });

  const onDelete = (tagId: string) => {
    Modal.confirm({
      title: '是否确认删除此标签',
      okButtonProps: { status: 'danger' },
      onOk: async () => {
        await deleteTag(tagId);
        tableRef.current.reload();
      },
    });
  };

  const columns: ProColumns<API.Tag.TagItem> = [
    {
      title: '名称',
      render: (_, row) => {
        return <Tag color="arcoblue">{row.tagName}</Tag>;
      },
    },
    {
      title: '创建时间',
      render: (_, row) => formatDate(row.createTime),
    },
    {
      title: '更新时间',
      render: (_, row) => formatDate(row.updateTime),
    },
    {
      title: '操作',
      width: 200,
      render: (_, row) => {
        return (
          <Space size="medium">
            <Button
              size="small"
              type="primary"
              onClick={() => {
                setSelectState({
                  visible: true,
                  selectInfo: row,
                });
              }}
            >
              编辑
            </Button>
            <Button
              size="small"
              type="outline"
              status="danger"
              onClick={() => onDelete(row.tagId)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const loadList = async (param: API.PageParams) => {
    const res = await getTagList({
      ...param,
    });
    return {
      total: res.total,
      list: res.tagList,
    };
  };

  const onCancel = () => {
    setSelectState({
      visible: false,
    });
  };

  return (
    <React.Fragment>
      <ProTable
        tableRef={tableRef}
        columns={columns}
        request={loadList}
        rowKey="tagId"
        toolBarRender={
          <React.Fragment>
            <Button
              onClick={() => {
                setSelectState({
                  visible: true,
                  selectInfo: null,
                });
              }}
              type="primary"
              icon={<IconPlus />}
            >
              新增
            </Button>
          </React.Fragment>
        }
      />
      {selectState.visible && (
        <EditTagInfo
          selectInfo={selectState.selectInfo}
          reload={tableRef.current.reload}
          onCancel={onCancel}
        />
      )}
    </React.Fragment>
  );
}

export default ClassifyList;
