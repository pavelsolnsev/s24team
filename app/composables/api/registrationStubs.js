// [BACKEND] заглушки для реальных вызовов API
import { delay } from './_stubs';

const BACKEND_DELAY = 200;

const createUser = ({ role, email }) => ({
  id: '123450',
  is_completed: false,
  email,
  role,
});

export const sendCode = async ({ email, role }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const registrationToken = '1234567890';
  console.log(
    `[BACKEND] Send code to ${role} ${email}, got registration token: ${registrationToken}`,
  );
  return { registrationToken };
};

export const verifyCode = async ({ code, registrationToken }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const success = code === '111111';
  console.log(
    `[BACKEND] Verify code (${registrationToken}): ${code}, got ${success ? 'success' : 'error'}`,
  );
  if (!success) throw new Error('Неверный код. Попробуйте еще раз.');
};

export const completeRegistration = async (
  { email, password, role, registrationToken },
  { signal } = {},
) => {
  await delay(BACKEND_DELAY, signal);
  const user = createUser({ role, email });
  console.log(
    `[BACKEND] Complete registration (${registrationToken}) for '${role}' ${email}/${password}, got user #${user.id}`,
  );
  return { user };
};

export const oauthRegistration = async ({ role, provider }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const host = provider === 'yandex' ? 'oauth-yandex.example' : 'oauth-vk.example';
  const user = createUser({ role, email: `${role}@${host}` });
  console.log(`[BACKEND] OAuth ${provider} registration for '${role}', got user #${user.id}`);
  return { user };
};
