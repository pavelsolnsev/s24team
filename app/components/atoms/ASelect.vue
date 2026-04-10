<template>
  <div class="relative" data-atom="select" ref="closeTarget">
    <div
      class="flex h-full w-full items-center rounded-16 bg-gray-10 py-16 px-24 cursor-pointer min-w-0"
      :class="[
        error && showError && !$attrs.readonly && 'shadow-border-red',
        $attrs.readonly && 'cursor-default!',
      ]"
      ref="reference"
      @click.stop="toggle"
    >
      <div class="flex flex-col gap-2 flex-1 truncate">
        <div class="text-12 font-normal text-gray-40 truncate" v-if="label">
          {{ label }}
        </div>
        <div class="truncate" :class="[!selectValue && 'text-gray-40']">{{ selectName }}</div>
      </div>
      <IconArrow
        class="text-gray-40 transition size-24"
        :class="[isOpen && 'rotate-180']"
        v-if="!$attrs.readonly"
      />
    </div>

    <Teleport to="body">
      <div
        ref="floating"
        :style="floatingStyles"
        class="rounded-20 bg-gray-10 shadow-select w-full z-5 overflow-hidden"
        :class="[position === 'top' && 'bottom-bottom top-auto!']"
        v-if="isOpen && !$attrs.readonly && options?.length"
      >
        <OverlayScrollbars
          element="div"
          :options="{
            scrollbars: { autoHide: 'scroll', visibility: 'auto' },
            overflow: { x: 'hidden' },
          }"
          class="overflow-y-auto max-h-268 os-scroll"
        >
          <div
            class="px-24 py-13 lg:py-16 cursor-pointer flex justify-between items-center hover:bg-gray-20 transition"
            :class="[(selectValue === item.id || selectValue === item) && 'cursor-default!']"
            @click="select(item)"
            v-for="item in options"
            :key="item.id || item"
          >
            <div>{{ item.item || item.name || item }}</div>
          </div>
        </OverlayScrollbars>
      </div>
    </Teleport>

    <div class="transition text-red mt-10" v-if="error && showError && !$attrs.readonly">
      {{ error }}
    </div>
  </div>
</template>
<script setup>
import IconArrow from '~/svg/_common/arrow-down.svg';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { z } from 'zod';
import { useFloating, offset, flip, shift, autoUpdate, size } from '@floating-ui/vue';

const { options, placeholder, validator } = defineProps({
  options: { type: Array, default: () => [], required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  position: { type: String, default: 'bottom', validator: v => ['top', 'bottom'].includes(v) },
  showError: { type: Boolean, default: false },
  validator: { type: Object, default: null },
});

const error = defineModel('error', { default: '' });

const selectValue = defineModel();

const closeTarget = ref(null);
const isOpen = ref(false);
const reference = ref(null);
const floating = ref(null);

const close = () => {
  isOpen.value = false;
};
onClickOutside(closeTarget, close, { ignore: [floating] });
useEventListener(window, 'resize', close);
useEventListener(window, 'orientationchange', close);

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(5),
    flip(),
    shift(),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
});

const emits = defineEmits(['active']);

const attrs = useAttrs();

const toggle = () => {
  if (!options?.length) return;
  isOpen.value = !isOpen.value;
};

const select = item => {
  if (attrs.readonly) return;
  selectValue.value = item.id || item;
  isOpen.value = false;
  emits('active', item);
};

const validate = newVal => {
  const val = newVal !== undefined ? newVal : selectValue.value;
  const isEmpty = !val;

  let schema = z.any().refine(() => !attrs.required || !isEmpty, {
    message: 'Обязательное поле',
  });

  if (validator) {
    schema = schema.and(validator);
  }

  const result = schema.safeParse(val);

  if (!result.success) {
    return (error.value = result.error?.issues?.[0]?.message || 'Ошибка');
  }
  return (error.value = '');
};

const selectName = computed(
  () =>
    options?.find(i => selectValue.value === i.id)?.item ||
    options?.find(i => selectValue.value === i.id)?.name ||
    options?.find(i => selectValue.value === i) ||
    placeholder,
);

watch(selectValue, newVal => {
  if (error.value) validate(newVal);
});

defineExpose({
  validate,
});

onUnmounted(() => {
  if (error.value) error.value = '';
});
</script>
