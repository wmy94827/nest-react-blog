import {
  Form,
  Input,
  Grid,
  Select,
  Space,
  Button,
} from '@arco-design/web-react';
import type { FormInstance } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { useMemo } from 'react';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { getCategoryList } from '@/services/category';
import { getTagList } from '@/services/tag';
const { Row, Col } = Grid;
const colSpan = 8;
interface Props {
  onSearch: () => void;
  form: FormInstance;
}
function ArticleSearchForm(props: Props) {
  const { onSearch, form } = props;
  const { data: categoryResult } = useRequest(async () => {
    return getCategoryList({
      page: 1,
      size: 0,
    });
  });

  const { data: tagResult } = useRequest(async () => {
    return getTagList({
      page: 1,
      size: 0,
    });
  });

  const tagOptions = useMemo(() => {
    return (
      tagResult?.tagList?.map((val) => ({
        value: val.tagId,
        label: val.tagName,
      })) ?? []
    );
  }, [tagResult]);

  const categoryOptions = useMemo(() => {
    return (
      categoryResult?.categoryList?.map((val) => ({
        value: val.categoryId,
        label: val.categoryName,
      })) ?? []
    );
  }, [categoryResult]);

  return (
    <Form
      labelAlign="left"
      form={form}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
    >
      <div className="flex" style={{ borderBottom: '1px solid #f2f3f5' }}>
        <div className="flex-auto">
          <Row gutter={24}>
            <Col span={colSpan}>
              <Form.Item label="标题" field="title">
                <Input placeholder="请输入" allowClear />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <Form.Item label="分类" field="categoryId">
                <Select
                  allowClear
                  placeholder="请选择"
                  options={categoryOptions}
                />
              </Form.Item>
            </Col>
            <Col span={colSpan}>
              <Form.Item label="标签" field="tagIds">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="请选择"
                  options={tagOptions}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <Space className="mb-20px min-w-200px flex justify-end" align="end">
          <Button type="primary" icon={<IconSearch />} onClick={onSearch}>
            查询
          </Button>
          <Button
            icon={<IconRefresh />}
            onClick={() => {
              form.clearFields();
              onSearch();
            }}
          >
            重置
          </Button>
        </Space>
      </div>
    </Form>
  );
}

export default ArticleSearchForm;
