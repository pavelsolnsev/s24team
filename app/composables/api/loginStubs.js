// [BACKEND] заглушки для реальных вызовов API
import { delay } from './_stubs';
import profiles from '#shared/mocks/profiles.json';

const BACKEND_DELAY = 200;

export const login = async ({ email, password }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const user = profiles.find(p => p.email === email);
  const success = !!user && password === '111111';
  console.log(`[BACKEND] Login ${email}, got ${success ? `user #${user.id}` : 'error'}`);
  if (!success) throw new Error('Неверный email или пароль (111111).');
  return { user };
};

const oauthDemoEmail = {
  yandex: 'demo.user3@example.com',
  vk: 'demo.user2@example.com',
};

export const oauthLogin = async ({ provider }, { signal } = {}) => {
  await delay(BACKEND_DELAY, signal);
  const email = oauthDemoEmail[provider] || oauthDemoEmail.vk;
  const user = profiles.find(p => p.email === email);
  const success = !!user;
  console.log(`[BACKEND] OAuth ${provider} login, got ${success ? `user #${user.id}` : 'error'}`);
  if (!success)
    throw new Error(`Не удалось войти через OAuth (демо-профиль для ${provider} не найден).`);
  return { user };
};
