import ProModal from '@/proComponents/Modal';
import { Form, Input } from '@arco-design/web-react';
import { createTag, editTag } from '@/services/tag';
import React from 'react';
const FormItem = Form.Item;
interface Props {
  onCancel: () => void;
  reload: () => void;
  selectInfo: API.Tag.TagItem | null;
}
function EditTagInfo(props: Props) {
  const { onCancel, reload, selectInfo } = props;
  const [form] = Form.useForm();
  const onOk = async (values: API.Tag.CreateParams) => {
    if (selectInfo) {
      await editTag({
        ...values,
        tagId: selectInfo.tagId,
      });
    } else {
      await createTag(values);
    }
    reload();
    return true;
  };
  return (
    <ProModal
      form={form}
      width={520}
      title={`${selectInfo ? '编辑' : '新增'}标签`}
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
          label="标签名称"
          field="tagName"
          rules={[{ required: true, message: '请输入标签名称' }]}
        >
          <Input autoComplete="off" placeholder="请输入" />
        </FormItem>
      </Form>
    </ProModal>
  );
}

export default React.memo(EditTagInfo);
