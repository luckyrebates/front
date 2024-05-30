import { request } from './request';

interface BaseResponse<T> {
  code: number;
  msg: string;
  data: T;
}

export interface GetLoginNonceRequest {
  address: string;
}
export interface GetLoginNonceResponse {
  nonce: string;
}
export function getLoginNonceFetch(params: GetLoginNonceRequest) {
  return request<GetLoginNonceRequest, BaseResponse<GetLoginNonceResponse>>({
    url: '/api/user/get_login_nonce',
    data: params,
  });
}

export interface UserLoginRequest {
  address: string;
  sign: string;
  nonce: string;
}
export interface UserLoginResponse {
  nonce: string;
}
export function userLoginFetch(params: UserLoginRequest) {
  return request<UserLoginRequest, BaseResponse<UserLoginResponse>>({ url: '/api/user/user_login', data: params });
}

export interface ActivityCreateRequest {
  name?: string;
  desc?: string;
  type?: number;
  end_time: number;
  max_tickets: number;
}
export interface ActivityCreateResponse {
  activity_id: string;
}
export function activityCreateFetch(params: ActivityCreateRequest) {
  return request<ActivityCreateRequest, BaseResponse<ActivityCreateResponse>>({
    url: '/api/activity/create',
    data: params,
  });
}

export interface QueryActivityListRequest {
  activity_id?: string;
  activity_type?: number;
  with_tickets?: boolean;
  address?: string;
  status?: number; // 0.全查；1.open 2.Close 3.Feed 4.Claimable
  model?: number;
  chain?: string;
  coin?: string;
  limit: number;
  page: number;
}
export interface Activitie {
  activity_id: string;
  activity_state: number;
  model: number;
  name: string;
  desc: string;
  type: number;
  chain: string;
  coin: string;
  max_ticket: number;
  max_prize_num: number;
  cur_ticket: number;
  inject_ticket: number;
  buy_ticket: number;
  send_allow_addr: string;
  send_ticket: number;
  ticket_price: number;
  ticket_token: string;
  end_time: number;
  end_timestamp: number;
  start_timestamp: number;
  auto_claim: boolean;
  treasury_rate: number;
  treasury_address: string;
}
export interface QueryActivityListResponse {
  total_cnt: number;
  cur_cnt: number;
  activities: Activitie[];
}
export function queryActivityListFetch(params: QueryActivityListRequest) {
  return request<QueryActivityListRequest, BaseResponse<QueryActivityListResponse>>({
    url: '/api/activity/query_activity_list',
    data: params,
  });
}

export interface QueryActivityDetailRequest {
  activity_id?: string;
}
export interface Winner {
  receiver_address: string;
  tx_hash: string;
  ticket_amount: number;
  block_timestamp: number;
}
export interface Ticket {
  receiver_address: string;
  sender: string;
  tx_hash: string;
  ticket_num: number;
  block_timestamp: number;
}
export interface QueryActivityDetailResponse extends Activitie {
  winners: Winner[];
  tickets: Ticket[];
}
export function queryActivityDetailFetch(params: QueryActivityDetailRequest) {
  return request<QueryActivityDetailRequest, BaseResponse<QueryActivityDetailResponse>>({
    url: '/api/activity/query_avtivity_detail',
    data: params,
  });
}

export interface QueryUserTicketRequest {
  activity_id?: string;
  address?: string;
  limit?: number;
  page?: number;
}
export interface ClaimPrize {
  activity_id: string;
  activity: Activitie;
  total_amount: number;
  tx_hash: string;
  block_timestamp: number;
}
export interface PrizeDrawn {
  activity_id: string;
  activity: Activitie;
  amount: number;
  tx_hash: string;
  block_timestamp: number;
}
export interface TicketsPurchase {
  activity_id: string;
  activity: Activitie;
  receiver_address: string;
  sender: string;
  ticket_numbers: number;
  tx_hash: string;
  block_timestamp: number;
}
export interface TicketsGetListItem {
  activity_id: string;
  activity: Activitie;
  receiver_address: string;
  sender: string;
  ticket_numbers: number;
  tx_hash: string;
  block_timestamp: number;
}

export interface QueryUserTicketResponse {
  address: string;
  claim_prize_list: ClaimPrize[];
  prize_drawn_list: PrizeDrawn[];
  tickets_purchase_list: TicketsPurchase[];
  tickets_get_list: TicketsGetListItem[];
}
export function queryUserTicketFetch(params: QueryUserTicketRequest) {
  return request<QueryUserTicketRequest, BaseResponse<QueryUserTicketResponse>>({
    url: '/api/user/query_user_ticket',
    data: params,
  });
}

export interface QueryUserTaskTokenRequest {
  address: string;
  query_type: number;
}

export interface TicketGetListItem {
  activity_id: string;
  activity: Activitie;
  amount: number;
  buy: boolean;
  from_address: string;
  receiver_address: string;
  ticket_numbers: number;
  tx_hash: string;
  block_timestamp: number;
}

export interface TokenMintListItem {
  amount: number;
  receiver_address: string;
  sender: string;
  task_addr: string;
  tx_hash: string;
  block_timestamp: number;
}

export interface QueryUserTaskTokenResponse {
  address: string;
  balance: string;
  ticket_get_list: TicketGetListItem[];
  token_mint_list: TokenMintListItem[];
}

export function queryUserTaskTokenFetch(params: QueryUserTaskTokenRequest) {
  return request<QueryUserTaskTokenRequest, BaseResponse<QueryUserTaskTokenResponse>>({
    url: '/api/user/query_user_task_token',
    data: params,
  });
}

export interface PauseActivityRequest {
  activity_id: string;
}
export interface PauseActivityResponse {
  activity_id: string;
  tx_hash: string;
  treasury_fee: number;
}
export function pauseActivityFetch(params: PauseActivityRequest) {
  return request<PauseActivityRequest, BaseResponse<PauseActivityResponse>>({
    url: '/api/activity/pause_activity',
    data: params,
  });
}

export interface DrawPrizeActivityRequest {
  activity_id: string;
  nonce: string;
}
export interface DrawPrizeActivityResponse {
  activity_id: string;
  tx_hash: string;
  treasury_fee: number;
}
export function drawPrizeActivityFetch(params: DrawPrizeActivityRequest) {
  return request<DrawPrizeActivityRequest, BaseResponse<DrawPrizeActivityResponse>>({
    url: '/api/activity/draw_prize_activity',
    data: params,
  });
}

export interface AddTicketRequest {
  address: string;
  add_ticket_num: number;
}
export interface AddTicketResponse {
  address: string;
  ticket_num: number;
}
export function addTicketFetch(params: AddTicketRequest) {
  return request<AddTicketRequest, BaseResponse<AddTicketResponse>>({
    url: '/api/ticket/add_ticket',
    data: params,
  });
}

export interface ConsumeTicketRequest {
  address: string;
  activity_id: string;
  consume_ticket_num: number;
}
export interface ConsumeTicketResponse {
  tx_hash: string;
  address: string;
  activity_id: string;
  ticket_num: number;
}
export function consumeTicketFetch(params: ConsumeTicketRequest) {
  return request<ConsumeTicketRequest, BaseResponse<ConsumeTicketResponse>>({
    url: '/api/ticket/consume_ticket',
    data: params,
  });
}

export interface QueryTasksListItem {
  task_activity_id: string;
  task_addr: string;
  task_activity: Activitie;
  task_id: string;
}

export interface QueryTasksResponse {
  task_list: QueryTasksListItem[];
}

export function queryTasks() {
  return request<{}, BaseResponse<QueryTasksResponse>>({
    url: '/api/activity/query_tasks',
  });
}
