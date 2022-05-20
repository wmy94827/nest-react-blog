import ProModal from '@/proComponents/Modal';
import { Form, Input } from '@arco-design/web-react';
import { createCategory, editCategory } from '@/services/category';
import React from 'react';
const FormItem = Form.Item;
interface Props {
  onCancel: () => void;
  reload: () => void;
  selectInfo: API.Category.CategoryItem | null;
}
function EditCategoryInfo(props: Props) {
  const { onCancel, reload, selectInfo } = props;
  const [form] = Form.useForm();
  const onOk = async (values: API.Category.CreateParams) => {
    if (selectInfo) {
      await editCategory({
        ...values,
        categoryId: selectInfo.categoryId,
      });
    } else {
      await createCategory(values);
    }
    reload();
    return true;
  };
  return (
    <ProModal
      form={form}
      width={520}
      title={`${selectInfo ? '编辑' : '新增'}分类`}
      onCancel={onCancel}
      onSubmit={onOk}
      visible
    >
      <Form
        form={form}
        labelCol={{
          flex: '100px',
        }}
        wrapperCol={{
          flex: 'auto',
        }}
        initialValues={selectInfo}
      >
        <FormItem
          label="分类名称"
          field="categoryName"
          rules={[{ required: true, message: '请输入分类名称' }]}
        >
          <Input autoComplete="off" placeholder="请输入" />
        </FormItem>
      </Form>
    </ProModal>
  );
}

export default React.memo(EditCategoryInfo);
