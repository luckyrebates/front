import {
  getLoginNonceFetch,
  userLoginFetch,
  activityCreateFetch,
  queryActivityListFetch,
  queryActivityDetailFetch,
  queryUserTicketFetch,
  queryUserTaskTokenFetch,
  pauseActivityFetch,
  drawPrizeActivityFetch,
  addTicketFetch,
  consumeTicketFetch,
} from '@src/api';

export function testAPI() {
  // 获取用户登录签名nonce值
  getLoginNonceFetch({ address: '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13' });
  // 获取用户登录
  // userLoginFetch({
  //   address: '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13',
  //   sign: '0x123456',
  //   nonce: '8zU1IEYX5giyzjKAEQ6DnWxT0gE9pZ3T',
  // });
  // 创建活动
  // activityCreateFetch({
  //   end_time: 1712677845538,
  //   max_tickets: 100,
  // });
  // 活动列表查询（包含状态，链，币种维度的分页查询）
  queryActivityListFetch({ page: 0, limit: 10 });
  // 活动详情查询（包含活动投注和中奖信息）
  queryActivityDetailFetch({ activity_id: '4' });
  // 用户奖注信息查询（包含活动投注和中奖信息）
  queryUserTicketFetch({ address: '0x874ba02ec75e3a6ffdde59fb79e993d4e42053ac' });
  // 用户任务代币信息查询（包含任务活动奖注仅查领取记录，仅差消耗记录）
  queryUserTaskTokenFetch({ address: '0x874ba02ec75e3a6ffdde59fb79e993d4e42053ac', query_type: 0 });
  // 活动暂停投注
  // pauseActivityFetch({ activity_id: '5' });
  // 活动开奖
  // drawPrizeActivityFetch({ activity_id: '5', nonce: '123456' });
  // 增加奖注
  // addTicketFetch({ address: '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13', add_ticket_num: 10 });
  // 消耗奖注
  // consumeTicketFetch({
  //   address: '0xae2fc483527b8ef99eb5d9b44875f005ba1fae13',
  //   activity_id: '4',
  //   consume_ticket_num: 1,
  // });
}
