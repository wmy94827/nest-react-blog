import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProMarkDownEditor from '@/proComponents/Markdown';
import { Button, Card, Message } from '@arco-design/web-react';
import EditArticleInfo from './components/EditArticleInfo';
import { getQueryString } from '@/utils/utils';
import { getArticleDetail } from '@/services/article';
import { useBoolean, useRequest } from 'ahooks';

function EditArticle() {
  const [value, setValue] = useState('');
  const [visible, { setFalse, setTrue }] = useBoolean(false);
  const location = useLocation();
  const articleId: string = getQueryString(location.search, 'id');

  const { data: detail } = useRequest(async () => getArticleDetail(articleId), {
    onSuccess: (res) => setValue(res.content),
    ready: Boolean(articleId),
  });

  return (
    <Card className="h-90vh">
      <div className="flex justify-end mb-10px">
        <Button
          type="primary"
          onClick={() => {
            if (!value) {
              Message.error('请填写文章内容');
              return;
            }
            setTrue();
          }}
        >
          发布
        </Button>
      </div>
      <ProMarkDownEditor value={value} onChange={setValue} />
      {visible && (
        <EditArticleInfo
          content={value}
          articleId={articleId}
          onCancel={setFalse}
          detail={detail}
        />
      )}
    </Card>
  );
}

export default EditArticle;
