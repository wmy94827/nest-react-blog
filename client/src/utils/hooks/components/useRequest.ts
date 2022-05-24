import { onMounted, ref } from 'vue';

export declare type Service<R> = () => Promise<R>;

interface Options<R> {
  manual?: boolean; //是否手动触发
  defaultResult?: any; //默认返回值
  onSuccess?: (res: R) => void; //请求成功回调
  onError?: () => void; //请求失败回调
}
const useRequest = <R, P>(service: Service<R>, options?: Options<R>) => {
  const { manual, defaultResult, onSuccess, onError } = options ?? {};
  const data = ref<R|undefined>(defaultResult);
  const loading = ref(false);
  const error = ref();
  const request = async () => {
    loading.value = true;
    try {
      const res: any = await service();
      loading.value = false;
      data.value = res;
      if (onSuccess) {
        onSuccess(res);
      }
    } catch (err) {
      loading.value = false;
      error.value = err;
      if (onError) {
        onError();
      }
    }
  };

  onMounted(() => {
    if (!manual) {
      request();
    }
  });

  return {
    data,
    error,
    loading,
    run: request,
  };
};

export default useRequest;
