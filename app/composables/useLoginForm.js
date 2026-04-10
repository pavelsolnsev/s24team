import { useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '~/store/auth.js';
import * as loginApi from '~/composables/api/loginStubs.js';

export function useLoginForm() {
  const authStore = useAuthStore();
  const router = useRouter();
  const formError = ref(null);

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi.login,
  });

  const { mutateAsync: oauthLogin, isPending: isOauthPending } = useMutation({
    mutationFn: loginApi.oauthLogin,
  });

  const isPending = computed(() => isLoggingIn.value || isOauthPending.value);

  const handleSubmit = async ({ email, password }) => {
    try {
      const { user } = await login({ email, password });
      formError.value = null;
      authStore.user = user;
      router.push({ name: 'profile' });
    } catch (e) {
      formError.value = e?.message || 'Произошла ошибка. Попробуйте еще раз.';
    }
  };

  const handleOAuth = async ({ provider }) => {
    try {
      const { user } = await oauthLogin({ provider });
      formError.value = null;
      authStore.user = user;
      router.push({ name: 'profile' });
    } catch (e) {
      formError.value = e?.message || 'Не удалось войти. Попробуйте еще раз.';
    }
  };

  return {
    formError,
    isPending,
    handleSubmit,
    handleOAuth,
  };
}
