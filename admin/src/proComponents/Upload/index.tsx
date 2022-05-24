import { Message, Spin, Upload } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { IconPlus } from '@arco-design/web-react/icon';
import { useState } from 'react';

const env = import.meta.env as any;
interface Props {
  onChange?: (value: string | undefined) => void;
  value?: string;
}
function ProUpload(props: Props) {
  const { onChange, value } = props;
  const [loading, setLoading] = useState(false);

  const handleChange = (fileList: UploadItem[], file: UploadItem) => {
    const { response, status } = file;
    if (status === 'uploading') {
      setLoading(true);
      return;
    }
    if (status === 'error') {
      setLoading(false);
      return;
    }
    const responseInfo = response as {
      code: number;
      msg: string;
      data: {
        path: string;
      };
    };
    if (status === 'done') {
      if (responseInfo.code === 200) {
        setLoading(false);
        const url = responseInfo?.data?.path;
        onChange(url);
      } else {
        Message.error(responseInfo.msg);
      }
    }
  };

  return (
    <Upload
      onChange={handleChange}
      showUploadList={false}
      action={`${env.VITE_BASE_URL}/file/upload`}
    >
      <div className="w-200px h-100px">
        {value ? (
          <img
            src={`${env.VITE_PREFIX}${value}`}
            alt="img"
            className="w-full h-full"
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <Spin loading={loading} dot>
            <div
              className="w-200px h-100px flex items-center justify-center"
              style={{ border: '1px solid #e7e7e7' }}
            >
              <IconPlus />
            </div>
          </Spin>
        )}
      </div>
    </Upload>
  );
}
export default ProUpload;
