import { Form, Input, Button, Space, Checkbox } from '@arco-design/web-react';
import { useRef, useState } from 'react';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import type { FormInstance } from '@arco-design/web-react';
import { useHistory } from 'react-router-dom';
import useStorage from '@/utils/useStorage';
import { store } from '@/store';
import { login } from '@/services/auth';
import styles from '../../style/index.module.less';
interface FormValues {
  userName: string;
  password: string;
}
interface Props {
  setActiveTab: (key: 'register') => void;
}
function LoginForm(props: Props) {
  const { setActiveTab } = props;
  const history = useHistory();
  const formRef = useRef<FormInstance<FormValues>>();
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');
  const [loading, setLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(!!loginParams);
  const onSubmitClick = async () => {
    const values = await formRef.current.validate();
    try {
      setLoading(true);
      const res = await login(values);
      setLoading(false);
      // 记住密码
      if (rememberPassword) {
        setLoginParams(JSON.stringify(values));
      } else {
        removeLoginParams();
      }
      // 记录登录状态
      sessionStorage.setItem('token', res.token);
      localStorage.setItem('userStatus', 'login');
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.userInfo, token: res.token },
      });
      // 跳转首页
      history.push('/');
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <Form
      className={styles['login-form']}
      layout="vertical"
      ref={formRef}
      initialValues={{ userName: '', password: '' }}
    >
      <Form.Item
        field="userName"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          prefix={<IconUser />}
          placeholder="用户名：admin"
          onPressEnter={onSubmitClick}
        />
      </Form.Item>
      <Form.Item
        field="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          prefix={<IconLock />}
          placeholder="密码：admin"
          onPressEnter={onSubmitClick}
        />
      </Form.Item>
      <Space size={16} direction="vertical">
        <div className={styles['login-form-password-actions']}>
          <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
            记住密码
          </Checkbox>
        </div>
        <Button type="primary" long onClick={onSubmitClick} loading={loading}>
          登录
        </Button>
        <Button
          type="secondary"
          long
          className={styles['login-form-register-btn']}
          onClick={() => setActiveTab('register')}
        >
          注册账号
        </Button>
      </Space>
    </Form>
  );
}

export default LoginForm;
