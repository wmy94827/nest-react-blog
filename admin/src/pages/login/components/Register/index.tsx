import { useRef } from 'react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import type { FormInstance } from '@arco-design/web-react';
import { Form, Input, Button, Space, Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { register } from '@/services/user';
import styles from '../../style/index.module.less';
interface Props {
  setActiveTab: (key: 'login') => void;
}
function RegisterForm(props: Props) {
  const { setActiveTab } = props;
  const formRef = useRef<
    FormInstance<{
      userName: string;
      password: string;
    }>
  >();

  // 去登录
  const goLogin = () => {
    setActiveTab('login');
  };

  const onRegister = async () => {
    const values = await formRef.current.validate();
    return await register(values);
  };

  const { run: onSubmit, loading } = useRequest(onRegister, {
    manual: true,
    onSuccess: () => {
      Message.success('注册成功');
      goLogin();
    },
  });

  return (
    <Form className={styles['login-form']} layout="vertical" ref={formRef}>
      <Form.Item
        field="userName"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input prefix={<IconUser />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        field="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password prefix={<IconLock />} placeholder="请输入密码" />
      </Form.Item>
      <Space size={16} direction="vertical">
        <Button type="primary" long onClick={onSubmit} loading={loading}>
          注册
        </Button>
        <Button
          type="secondary"
          long
          loading={loading}
          className={styles['login-form-register-btn']}
          onClick={goLogin}
        >
          去登录
        </Button>
      </Space>
    </Form>
  );
}

export default RegisterForm;
