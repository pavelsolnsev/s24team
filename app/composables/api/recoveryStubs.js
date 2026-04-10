// [BACKEND] заглушки для реальных вызовов API
import { delay } from './_stubs';

const BACKEND_DELAY = 200;

export const sendCode = async ({ email }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const recoveryToken = 'recovery-1234567890';
  console.log(`[BACKEND] Send recovery code to ${email}, got recovery token: ${recoveryToken}`);
  return { recoveryToken };
};

export const verifyCode = async ({ code, recoveryToken }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const success = code === '111111';
  console.log(
    `[BACKEND] Verify recovery code (${recoveryToken}): ${code}, got ${success ? 'success' : 'error'}`,
  );
  if (!success) throw new Error('Неверный код. Попробуйте еще раз.');
};

export const completeRecovery = async ({ email, password, recoveryToken }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  console.log(
    `[BACKEND] Complete recovery (${recoveryToken}) for ${email}/${password}, got success`,
  );
  return { success: true };
};
