import { useMutation } from '@tanstack/vue-query';
import StepEmail from '~/components/molecules/auth/StepEmail.vue';
import StepRole from '~/components/molecules/auth/StepRole.vue';
import StepCode from '~/components/molecules/auth/StepCode.vue';
import StepPassword from '~/components/molecules/auth/StepPassword.vue';
import { useAuthStore } from '~/store/auth.js';
import * as registrationApi from '~/composables/api/registrationStubs.js';

export function useRegistrationWizard() {
  const authStore = useAuthStore();
  const router = useRouter();

  const currentStep = ref('role');
  const data = ref({});
  const stepError = ref(null);

  const { mutateAsync: sendCode, isPending: isSendingCode } = useMutation({
    mutationFn: registrationApi.sendCode,
  });

  const { mutateAsync: verifyCode, isPending: isVerifyingCode } = useMutation({
    mutationFn: registrationApi.verifyCode,
  });

  const { mutateAsync: completeRegistration, isPending: isCompletingRegistration } = useMutation({
    mutationFn: registrationApi.completeRegistration,
  });

  const { mutateAsync: oauthRegistration, isPending: isOauthPending } = useMutation({
    mutationFn: registrationApi.oauthRegistration,
  });

  const isPending = computed(
    () =>
      isSendingCode.value ||
      isVerifyingCode.value ||
      isCompletingRegistration.value ||
      isOauthPending.value,
  );

  const steps = {
    role: {
      component: markRaw(StepRole),
      next: 'email',
      onDone: ({ role }) => {
        data.value.role = role;
      },
    },
    email: {
      component: markRaw(StepEmail),
      next: 'code',
      onDone: async ({ email }) => {
        data.value.email = email;
        const { registrationToken } = await sendCode(data.value);
        data.value.registrationToken = registrationToken;
      },
    },
    code: {
      component: markRaw(StepCode),
      next: 'password',
      timeOut: 90,
      onDone: async ({ code }) => {
        await verifyCode({ code, registrationToken: data.value.registrationToken });
      },
      onResend: async () => {
        const { registrationToken } = await sendCode(data.value);
        data.value.registrationToken = registrationToken;
      },
    },
    password: {
      component: markRaw(StepPassword),
      next: null,
      onDone: async ({ password }) => {
        const { user } = await completeRegistration({ ...data.value, password });
        authStore.user = user;
        router.push({ name: 'profile' });
      },
    },
  };

  const step = computed(() => steps[currentStep.value]);

  const handleDone = async payload => {
    stepError.value = null;
    try {
      await step.value.onDone?.(payload);
      if (step.value.next) currentStep.value = step.value.next;
    } catch (e) {
      stepError.value = e?.message || 'Произошла ошибка. Попробуйте еще раз.';
    }
  };

  const handleResend = async onSuccess => {
    stepError.value = null;
    try {
      await step.value.onResend?.();
      onSuccess?.();
    } catch (e) {
      stepError.value = e?.message || 'Не удалось отправить код. Попробуйте еще раз.';
    }
  };

  const handleOAuth = async ({ provider }) => {
    try {
      const { user } = await oauthRegistration({ role: data.value.role, provider });
      authStore.user = user;
      router.push({ name: 'profile' });
    } catch (e) {
      stepError.value = e?.message || 'Не удалось завершить регистрацию. Попробуйте еще раз.';
    }
  };

  return {
    step,
    data,
    stepError,
    isPending,
    handleDone,
    handleResend,
    handleOAuth,
  };
}
