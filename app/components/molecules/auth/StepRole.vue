<template>
  <StepTemplate title="Регистрация" subtitle="Выберите роль">
    <fieldset
      role="radiogroup"
      aria-label="Выберите роль"
      class="flex flex-col gap-20"
      @keydown="onKeydown"
    >
      <legend class="sr-only">Выберите роль</legend>
      <button
        v-for="(role, idx) in roles"
        :key="role.id"
        type="button"
        role="radio"
        :aria-checked="selectedRole === role.value"
        :tabindex="getTabIndex(role, idx)"
        class="w-full text-left h-156 group relative text-white bg-black rounded-16 p-16 flex flex-col gap-20 justify-between [--icon-bg:var(--color-purple)] [--icon-fg:var(--color-white)] hover:bg-purple hover:text-white hover:[--icon-bg:var(--color-white)] hover:[--icon-fg:var(--color-purple)] transition-colors cursor-pointer"
        @click="selectRole(role, idx)"
      >
        <div class="flex items-center gap-10">
          <div class="text-24 leading-[1.1] lg:leading-[1.3] -tracking-[0.01em] font-medium">
            {{ role.name }}
          </div>
          <component :is="role.icon" class="size-24 lg:size-32" />
        </div>
        <div class="text-16 leading-[1.2] -tracking-[0.01em] font-light lg:max-w-416">
          {{ role.text }}
        </div>
        <IconArrowRight
          class="size-24 lg:size-35 absolute right-16 top-16 lg:top-auto lg:bottom-16 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </button>
    </fieldset>
  </StepTemplate>
</template>

<script setup>
import IconCreator from '~/svg/auth/creator.svg';
import IconExpert from '~/svg/auth/expert.svg';
import IconArrowRight from '~/svg/_common/arrow-right-solid.svg';
import StepTemplate from '~/components/molecules/auth/StepTemplate.vue';

defineModel({ type: Object, required: true });
const emit = defineEmits(['done']);

const selectedRole = ref('');
const focusedIndex = ref(0);

const getTabIndex = (role, idx) => {
  if (selectedRole.value) return selectedRole.value === role.value ? 0 : -1;
  return idx === focusedIndex.value ? 0 : -1;
};

const selectRole = (role, idx) => {
  selectedRole.value = role.value;
  focusedIndex.value = idx;
  emit('done', { role: role.value });
};

const onKeydown = e => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End', ' ', 'Enter'].includes(e.key))
    return;
  e.preventDefault();

  const last = roles.length - 1;

  if (e.key === 'Home') focusedIndex.value = 0;
  else if (e.key === 'End') focusedIndex.value = last;
  else if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
    focusedIndex.value = focusedIndex.value >= last ? 0 : focusedIndex.value + 1;
  else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
    focusedIndex.value = focusedIndex.value <= 0 ? last : focusedIndex.value - 1;
  else if (e.key === ' ' || e.key === 'Enter') {
    selectRole(roles[focusedIndex.value], focusedIndex.value);
    return;
  }

  queueMicrotask(() => {
    const el = e.currentTarget?.querySelector?.(`[role="radio"]:nth-child(${focusedIndex.value + 2})`);
    el?.focus?.();
  });
};

const roles = [
  {
    id: 1,
    value: 'creator',
    name: 'Креатор',
    text: 'Покажи свои идеи миру: публикуй работы, собирай оценки экспертов, чтобы расти и находить новых клиентов.',
    icon: markRaw(IconCreator),
  },
  {
    id: 2,
    value: 'expert',
    name: 'Эксперт',
    text: 'Оценивай работы талантливых креаторов, помогай им расти и формируй культуру качества в творческом сообществе.',
    icon: markRaw(IconExpert),
  },
];
</script>
