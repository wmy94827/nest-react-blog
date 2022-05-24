/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Tag {
  type TagItem = {
    tagId: string;
    tagName: string;
    createTime: string;
    updateTime: string;
  };

  type ListResult = {
    tagList: TagItem[];
    total: number;
  };

  type CreateParams = {
    tagName: string;
  };

  type ListParams = API.PageParams & {};
}
