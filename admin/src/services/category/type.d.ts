/* eslint-disable @typescript-eslint/no-unused-vars */
export namespace Category {
  type CategoryItem = {
    categoryId: string;
    categoryName: string;
    createTime: string;
    updateTime: string;
  };

  type ListResult = {
    categoryList: CategoryItem[];
    total: number;
  };

  type CreateParams = {
    categoryName: string;
  };

  type ListParams = API.PageParams & {};
}
