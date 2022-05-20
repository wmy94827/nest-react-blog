import { Editor } from '@bytemd/react';
import type { EditorProps } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlightSsr from '@bytemd/plugin-highlight-ssr';
import math from '@bytemd/plugin-math';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import mermaid from '@bytemd/plugin-mermaid';
import breaks from '@bytemd/plugin-breaks';
import frontmatter from '@bytemd/plugin-frontmatter';
import 'juejin-markdown-themes';
// import 'github-markdown-css/github-markdown.css';
import 'juejin-markdown-themes/dist/juejin.css'; // md theme
import 'bytemd/dist/index.css';
// 高亮的颜色样式
import 'highlight.js/styles/github.css';
import zh from 'bytemd/locales/zh_Hans.json';
import { uploadFile } from '@/services/auth';
const env = import.meta.env as any;
// https://bytemd.js.org/playground/ 参考地址
const plugins = [
  breaks(), // 换行
  frontmatter(), // 文章头部信息
  gfm(), // 公共格式化语法
  math(), // 数学公式
  mediumZoom(), // 缩放预览图片
  mermaid(), // 图表
  highlightSsr(), // 突出显示代码块
];

interface Pick {
  alt: string;
  title: string;
  url: string;
}
function ProMarkDownEditor(props: EditorProps) {
  const uploadImages = async (files: File[] = []) => {
    console.log(files);

    const imgs: Pick[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await uploadFile(formData);
      const pick = {
        alt: 'img',
        title: 'img',
        url: env.VITE_PREFIX + res.path,
      };
      imgs.push(pick);
    }
    return imgs;
  };
  return (
    <Editor
      plugins={plugins}
      uploadImages={uploadImages}
      mode="auto"
      locale={zh}
      {...props}
    />
  );
}

export default ProMarkDownEditor;
