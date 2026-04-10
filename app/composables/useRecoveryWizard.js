import { useMutation } from '@tanstack/vue-query';
import StepEmail from '~/components/molecules/auth/StepEmail.vue';
import StepCode from '~/components/molecules/auth/StepCode.vue';
import StepPassword from '~/components/molecules/auth/StepPassword.vue';
import * as recoveryApi from '~/composables/api/recoveryStubs.js';

export function useRecoveryWizard() {
  const router = useRouter();

  const currentStep = ref('email');
  const data = ref({});
  const stepError = ref(null);

  const { mutateAsync: sendCode, isPending: isSendingCode } = useMutation({
    mutationFn: recoveryApi.sendCode,
  });

  const { mutateAsync: verifyCode, isPending: isVerifyingCode } = useMutation({
    mutationFn: recoveryApi.verifyCode,
  });

  const { mutateAsync: completeRecovery, isPending: isCompletingRecovery } = useMutation({
    mutationFn: recoveryApi.completeRecovery,
  });

  const isPending = computed(
    () => isSendingCode.value || isVerifyingCode.value || isCompletingRecovery.value,
  );

  const steps = {
    email: {
      component: markRaw(StepEmail),
      next: 'code',
      props: {
        title: 'Восстановление пароля',
        submitLabel: 'Получить код',
      },
      onDone: async ({ email }) => {
        data.value.email = email;
        const { recoveryToken } = await sendCode({ email });
        data.value.recoveryToken = recoveryToken;
      },
    },
    code: {
      component: markRaw(StepCode),
      next: 'password',
      timeOut: 90,
      onDone: async ({ code }) => {
        await verifyCode({ code, recoveryToken: data.value.recoveryToken });
      },
      onResend: async () => {
        const { recoveryToken } = await sendCode({ email: data.value.email });
        data.value.recoveryToken = recoveryToken;
      },
    },
    password: {
      component: markRaw(StepPassword),
      next: null,
      props: {
        title: 'Придумайте новый пароль',
        titleClass: 'lg:max-w-425 mx-auto',
        subtitle: '',
        submitLabel: 'Сохранить',
      },
      onDone: async ({ password }) => {
        await completeRecovery({
          email: data.value.email,
          password,
          recoveryToken: data.value.recoveryToken,
        });
        router.push({ name: 'login' });
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

  return {
    step,
    data,
    stepError,
    isPending,
    handleDone,
    handleResend,
  };
}
