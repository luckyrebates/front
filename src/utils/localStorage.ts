const SESSION = '_session';
const SIGN = '_SIGN';
const APPROVE = '_APPROVE';

class LocalStore {
  setSession(data: string) {
    window.localStorage.setItem(SESSION, data);
  }
  getSession(): string {
    return window.localStorage?.getItem(SESSION) ?? '';
  }
  cleanSession() {
    window.localStorage.setItem(SESSION, '');
  }
  setSign(data: string) {
    window.localStorage.setItem(SIGN, data);
  }
  getSign(): string {
    return window.localStorage?.getItem(SIGN) ?? '';
  }
  cleanSign() {
    window.localStorage.setItem(SIGN, '');
  }
  setApprove(data: { approveAmount: bigint }) {
    window.localStorage.setItem(
      APPROVE,
      JSON.stringify({
        approveAmount: (data?.approveAmount ?? 0n).toString(),
      }),
    );
  }
  getApporve(): { approveAmount: bigint } {
    const res = window.localStorage?.getItem(APPROVE) ?? JSON.stringify({});
    const data = JSON.parse(res);
    return {
      approveAmount: BigInt(data?.approveAmount ?? '0'),
    };
  }
  cleanApporve() {
    window.localStorage.setItem(APPROVE, '');
  }
}

export const localStore = new LocalStore();
