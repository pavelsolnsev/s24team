import { useAuthStore } from '~/store/auth.js';

export default defineNuxtRouteMiddleware(to => {
  const { isAuth, user } = storeToRefs(useAuthStore());

  const path = to.path.endsWith('/') ? to.path : to.path + '/';

  // Если пользователь авторизован и пытается попасть на страницу авторизации/регистрации/восстановления пароля, редирект на профиль
  if (path.startsWith('/auth/')) {
    if (isAuth.value) {
      return navigateTo({ name: 'profile' });
    }
    // Если пользователь не авторизован и пытается попасть на страницу авторизации/регистрации/восстановления пароля, разрешаем
    return;
  }

  // Если пользователь не авторизован и пытается попасть на страницу, кроме авторизации/регистрации/восстановления пароля, редирект на страницу авторизации
  if (!isAuth.value) {
    return navigateTo({ name: 'login' });
  }

  // Если пользователь не заполнил профиль и не находится уже на странице настроек, редирект на страницу настроек
  if (!user.value?.is_completed && path !== '/lk/settings/') {
    return navigateTo({ name: 'settings' });
  }
});
