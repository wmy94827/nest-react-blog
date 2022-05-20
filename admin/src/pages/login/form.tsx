import { Tabs } from '@arco-design/web-react';
import { useState } from 'react';
import RegisterForm from './components/Register';
import LoginFrom from './components/Login';
import styles from './style/index.module.less';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>wmy的后台管理</div>
      <div className={`${styles['login-form-sub-title']} mb-30px`}>
        欢迎来到我的博客后台
      </div>
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane title="登录" key="login">
          {activeTab === 'login' && <LoginFrom setActiveTab={setActiveTab} />}
        </Tabs.TabPane>
        <Tabs.TabPane title="注册" key="register">
          {activeTab === 'register' && (
            <RegisterForm setActiveTab={setActiveTab} />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
