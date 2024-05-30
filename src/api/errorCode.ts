export const ERROR_CODE: {
  [code: number]: {
    type: string;
    describe: string;
  };
} = {
  40001: {
    type: '参数错误',
    describe: '缺少必要参数',
  },
  50001: {
    type: '系统错误',
    describe: '系统内部错误，请联系管理员',
  },
};
