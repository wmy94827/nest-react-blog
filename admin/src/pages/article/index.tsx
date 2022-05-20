import { Button, Tag, Space, Modal, Form, Card } from '@arco-design/web-react';
import { IconPlus, IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import ProTable, { ProTableInstance, ProColumns } from '@/proComponents/Table';
import { useHistory } from 'react-router-dom';
import React, { useRef } from 'react';
import { formatDate } from '@/utils/utils';
import { getArticleList, deleteArticle } from '@/services/article';
import ArticleSearchForm from './components/SearchForm';

function ArticleList() {
  const tableRef = useRef<ProTableInstance>(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const onDelete = (articleId: string) => {
    Modal.confirm({
      title: '是否确认删除此标签',
      okButtonProps: { status: 'danger' },
      onOk: async () => {
        await deleteArticle(articleId);
        tableRef.current.reload();
      },
    });
  };

  const columns: ProColumns<API.Article.ArticleItem> = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '分类',
      render: (_, row) => {
        return <Tag color="arcoblue">{row.category.categoryName}</Tag>;
      },
    },
    {
      title: '标签',
      render: (_, row) => {
        return (
          <Space>
            {row.tags?.map((val) => (
              <Tag color="arcoblue" key={val.tagId}>
                {val.tagName}
              </Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: '阅读数',
      dataIndex: 'readingNum',
    },
    {
      title: '发布时间',
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
                history.push(`/article/editInfo?id=${row.articleId}`);
              }}
            >
              编辑
            </Button>
            <Button
              size="small"
              type="outline"
              status="danger"
              onClick={() => onDelete(row.articleId)}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const loadList = async (
    param: API.PageParams & {
      title: string;
      tagIds: string[];
      categoryId: string;
    }
  ) => {
    const res = await getArticleList({
      ...param,
    });
    return {
      total: res.total,
      list: res.articleList,
    };
  };

  const onSearch = async () => {
    tableRef.current?.reload();
  };

  return (
    <React.Fragment>
      <Card
        title="文章列表"
        bodyStyle={{
          padding: '0 20px',
        }}
      >
        <ArticleSearchForm form={form} onSearch={onSearch} />
      </Card>
      <ProTable
        form={form}
        tableRef={tableRef}
        columns={columns}
        request={loadList}
        rowKey="articleId"
        toolBarRender={
          <React.Fragment>
            <Button
              onClick={() => {
                history.push(`/article/editInfo`);
              }}
              type="primary"
              icon={<IconPlus />}
            >
              新增
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default ArticleList;
