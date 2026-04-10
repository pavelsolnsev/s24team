<template>
  <StepTemplate title="Введите код" @submit="submit">
    <template #subtitle>
      Мы отправили 6-значный код на почту <span class="text-purple">{{ data.email }}</span>
    </template>
    <div class="flex flex-col gap-10 lg:gap-20">
      <component
        :is="item.component"
        v-for="item in form"
        :key="item.name"
        v-model="item.value"
        v-model:error="item.error"
        v-bind="getFieldProps(item)"
      />
    </div>

    <AButton
      theme="black"
      class="lg:mt-20 w-full h-60 rounded-full text-18 lg:text-20 leading-[1.3] lg:leading-[1.4] -tracking-[0.01em]"
      :disabled="!isPinFilled || props.isPending"
      :loading="props.isPending"
      type="submit"
    >
      Отправить
    </AButton>

    <ACountdown
      v-model="timer"
      class="text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] text-center text-gray-60 transition hover:text-gray-80"
      @click="sendCode"
    >
      <template #timeisup>Отправить код повторно</template>
      Код отправлен, повторное подтверждение возможно через<br />
      <span class="text-purple">{{ timerFormatted }}</span>
    </ACountdown>
  </StepTemplate>
</template>

<script setup>
import { useForm } from '#imports';
import StepTemplate from '~/components/molecules/auth/StepTemplate.vue';
import ACountdown from '~/components/atoms/ACountdown.vue';
import AInputPin from '~/components/atoms/AInputPin.vue';
import AButton from '~/components/atoms/AButton.vue';

const data = defineModel({ type: Object, required: true });
const emit = defineEmits(['done', 'resend']);
const props = defineProps({
  stepError: { type: String, default: null },
  timeOut: { type: Number, default: 30 },
  isPending: { type: Boolean, default: false },
});

const form = ref([
  {
    name: 'code',
    component: markRaw(AInputPin),
    value: '',
    required: true,
    api: 'code',
    showError: true,
    length: 6,
    error: '',
  },
]);

watch(
  () => props.stepError,
  err => {
    form.value[0].error = err ?? '';
  },
);

const { getData, getFieldProps } = useForm(form);

const timer = ref(0);

const timerFormatted = computed(() => {
  const m = Math.floor(timer.value / 60);
  const s = timer.value % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
});

const isPinFilled = computed(() => {
  const field = form.value[0];
  return field?.value?.length === field?.length;
});

const sendCode = () => {
  if (props.isPending || timer.value > 0) return;
  emit('resend', () => {
    form.value[0].value = '';
    form.value[0].error = '';
    timer.value = props.timeOut;
  });
};

onMounted(() => {
  timer.value = props.timeOut;
});

const submit = async () => {
  const formData = await getData();
  if (!formData) return;

  emit('done', { code: formData.code });
};
</script>
