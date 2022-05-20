import { useMemo } from 'react';
import { Drawer, Form, Input, Select } from '@arco-design/web-react';
import { getCategoryList } from '@/services/category';
import { getTagList } from '@/services/tag';
import { createArticle, editArticle } from '@/services/article';
import { useHistory } from 'react-router-dom';
import { useRequest } from 'ahooks';
import ProUpload from '@/proComponents/Upload';
const FormItem = Form.Item;

interface Props {
  onCancel: () => void;
  articleId: string;
  content: string;
  detail?: API.Article.ArticleDetailResult;
}
function EditArticleInfo(props: Props) {
  const { onCancel, articleId, content, detail } = props;
  const history = useHistory();
  const [form] = Form.useForm();

  const initialValues = useMemo(() => {
    if (!detail) {
      return {};
    }
    const { title, summary, category } = detail;
    return {
      title,
      summary,
      tagIds: detail?.tags?.map((val) => val.tagId) ?? [],
      categoryId: category?.categoryId,
      coverImage: detail?.coverImage,
    };
  }, [detail]);

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

  const onOk = async () => {
    const values = await form.validate();
    if (articleId) {
      await editArticle({
        ...values,
        content,
        articleId,
      });
    } else {
      await createArticle({
        ...values,
        content,
      });
    }
    history.push('/article');
  };

  return (
    <Drawer
      title={articleId ? '编辑文章' : '新增文章'}
      width={460}
      visible
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        initialValues={initialValues}
        labelCol={{
          flex: '100px',
        }}
        wrapperCol={{
          flex: 'auto',
        }}
      >
        <FormItem
          label="文章标题"
          field="title"
          rules={[{ required: true, message: '请输入文章标题' }]}
        >
          <Input autoComplete="off" placeholder="请输入" />
        </FormItem>
        <FormItem
          label="分类"
          field="categoryId"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select allowClear placeholder="请选择" options={categoryOptions} />
        </FormItem>
        <FormItem
          label="标签"
          field="tagIds"
          rules={[{ required: true, message: '请选择标签' }]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="请选择"
            options={tagOptions}
          />
        </FormItem>
        <FormItem
          label="编辑摘要"
          field="summary"
          rules={[
            {
              required: true,
              message: '请输入编辑摘要',
            },
          ]}
        >
          <Input.TextArea
            placeholder="请输入"
            style={{ minHeight: 80 }}
          ></Input.TextArea>
        </FormItem>
        <FormItem label="文章封面" field="coverImage">
          <ProUpload />
        </FormItem>
      </Form>
    </Drawer>
  );
}

export default EditArticleInfo;
