import React, { Ref, useState, useEffect } from 'react';
import { Modal } from '@arco-design/web-react';
import type { ModalProps, FormInstance } from '@arco-design/web-react';

interface ProModalProps extends ModalProps {
  width?: number | string;
  loading?: boolean;
  children?: React.ReactNode;
  form?: FormInstance;
  onSubmit?:
    | ((formData: unknown) => Promise<void | boolean>)
    | ((formData: unknown) => void | boolean);

  onCancel: () => void;
}

const ProModal = (props: ProModalProps) => {
  const {
    width,
    onSubmit,
    loading = false,
    onCancel: initOnCancel,
    children,
    form,
    visible: initVisible,
    ...rest
  } = props;

  const [okLoading, setOkLoading] = useState(false);

  const [visible, setVisible] = useState(initVisible);

  useEffect(() => {
    setOkLoading(loading);
  }, [loading]);

  useEffect(() => {
    setVisible(initVisible);
  }, [initVisible]);

  const onCancel = () => {
    if (initOnCancel) {
      setVisible(false);
      setTimeout(() => {
        initOnCancel();
      }, 400);
    }
  };

  const onOk = async () => {
    let values = {};
    if (form) {
      try {
        await form.validate();
        values = form.getFieldsValue();
      } catch (error) {
        return;
      }
    }
    setOkLoading(true);
    try {
      const res = await onSubmit(values);
      setOkLoading(false);
      if (res) {
        onCancel();
      }
    } catch (error) {
      setOkLoading(false);
    }
  };

  return (
    <Modal
      maskClosable={false}
      alignCenter
      style={{
        maxHeight: '75vh',
        width: width ?? '50vw',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      confirmLoading={okLoading}
      onCancel={onCancel}
      visible={visible}
      {...rest}
      onOk={onOk}
    >
      <div>{children}</div>
    </Modal>
  );
};
export default ProModal;
