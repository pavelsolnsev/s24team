<template>
  <div
    class="flex flex-col gap-20 w-full bg-gray-10 p-20 max-w-[calc(100dvw-40px)] lg:min-w-500 rounded-20 text-16 lg:text-18"
    data-atom="file"
  >
    <div class="flex items-center gap-30 justify-between">
      <h3 class="font-500 text-24">Загрузить изображение</h3>
      <IconCross class="cursor-pointer size-37.5 text-gray-60" @click="emits('close')" />
    </div>

    <div class="text-gray-60" v-if="maxSize">
      Прикрепите файл размером до
      <span class="text-purple whitespace-nowrap">{{ maxSize }} MB</span>
    </div>

    <div
      class="flex flex-col gap-10 w-full rounded-16 bg-white p-16 text-gray-60"
      v-if="templateValue?.length"
    >
      <div
        class="flex gap-8 w-full justify-between items-center"
        v-for="item in templateValue"
        :key="(item.lastModified || item.id) + item.name"
      >
        <div class="flex items-center gap-10">
          <IconGallery class="size-24 min-w-24" />
          <div class="truncate">{{ item.name }}</div>
        </div>
        <div>{{ (item.size / (1024 * 1024)).toFixed(2) }} MB</div>
      </div>
    </div>

    <div
      class="flex flex-col gap-10"
      :class="[$attrs.fileClass]"
      v-else-if="!$attrs.readonly || templateValue?.length === 0"
    >
      <label
        class="flex transition h-186 rounded-16 bg-white p-16 text-gray-60"
        ref="dropZoneRef"
        :class="[
          error && !$attrs.readonly && 'shadow-border-red',
          $attrs.readonly ? 'cursor-default' : 'cursor-pointer',
        ]"
      >
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          :accept="acceptString"
          :name="$attrs.name"
          :multiple="multiple"
          @change="getFiles"
        />
        <slot v-if="$slots.default" />
        <div class="flex items-center justify-center text-center w-full h-full" v-else>
          Перетащите файл сюда <br />или загрузите с устройства
        </div>
      </label>

      <div class="flex flex-col transition" v-if="!$attrs.readonly">
        <div class="text-red" v-if="error && showError">{{ error }}</div>
      </div>
    </div>

    <AButton
      class="text-18 lg:text-20 w-full rounded-30 h-56 lg:h-48"
      theme="black"
      @click="applyValues"
    >
      Добавить
    </AButton>
  </div>
</template>
<script setup>
import IconGallery from '~/svg/_common/gallery.svg';
import IconCross from '~/svg/_common/cross.svg';
import { useDropZone } from '@vueuse/core';
import { z } from 'zod';
import AButton from '~/components/atoms/AButton.vue';

const { accept, maxSize, multiple } = defineProps({
  label: { type: String, default: '' },
  multiple: { type: Boolean, default: false },
  accept: { type: Array, default: () => ['png', 'jpg', 'jpeg', 'svg', 'webp', 'avif'] },
  maxSize: { type: Number, default: 0 },
  showError: { type: Boolean, default: false },
});

const emits = defineEmits(['close']);

const dropZoneRef = ref(null);
const fileInput = ref(null);
const files = defineModel({ default: [] });
const templateValue = ref([]);

const previews = defineModel('previews', { default: [] });
const error = defineModel('error', { default: '' });

const acceptString = computed(() =>
  accept?.length ? accept.map(ext => `.${ext}`).join(',') : '*',
);

const formatString = computed(() =>
  accept?.length
    ? accept
        .map(ext => ext.toUpperCase())
        .filter(Boolean)
        .join('/')
    : '',
);

const { cloneDeep } = useUtils();

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: droppedFiles => {
    if (!droppedFiles) return;
    processFiles(droppedFiles);
  },
});

const processFiles = incomingFiles => {
  const allfiles = multiple ? [...templateValue.value, ...incomingFiles] : [incomingFiles[0]];
  if (!allfiles?.length) return;
  const validation = validate(allfiles);
  if (!validation.success) {
    error.value = validation.error;
    return (fileInput.value.value = '');
  }
  previews.value = [];
  error.value = '';

  templateValue.value = allfiles;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const getFiles = () => {
  const incomingFiles = Array.from(fileInput.value.files || []);
  processFiles(incomingFiles);
};

watch(
  files,
  newVal => {
    templateValue.value = cloneDeep(files.value);
    if (error.value) validate(newVal);
  },
  { immediate: true },
);

const applyValues = () => {
  const valueToEmit = cloneDeep(templateValue.value);
  files.value = valueToEmit;
  files.value.forEach(file => {
    previews.value.push(URL.createObjectURL(file));
  });
  emits('close');
};

const validate = files => {
  // 1. Схема для одиночного файла (размер и формат)
  const fileSchema = z.instanceof(File).superRefine((file, ctx) => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (accept?.length && accept !== '*' && !accept.includes(ext)) {
      ctx.addIssue({
        code: 'custom',
        message: `Формат .${ext} не поддерживается`,
        fatal: true,
      });
      return z.NEVER;
    }

    if (maxSize && file.size > maxSize * 1024 * 1024) {
      ctx.addIssue({
        code: 'custom',
        message: `Файл слишком большой (макс. ${maxSize} MB)`,
        fatal: true,
      });
      return z.NEVER;
    }
  });

  // 2. Схема для массива (проверка на дубликаты)
  const listSchema = z.array(fileSchema).superRefine((allFiles, ctx) => {
    const names = allFiles.map(f => f.name.toLowerCase());
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);

    if (duplicates?.length) {
      ctx.addIssue({
        code: 'custom',
        message: `Файл "${duplicates[0]}" уже в списке`,
        fatal: true,
      });
      return z.NEVER;
    }
  });

  const result = listSchema.safeParse(files);

  if (!result.success) {
    return {
      success: false,
      error: result.error?.issues?.[0]?.message || '',
    };
  }

  return { success: true };
};

const removeFile = name => {
  const index = files.value.findIndex(i => i.name === name);
  if (index !== -1) {
    URL.revokeObjectURL(previews.value[index]);
    previews.value.splice(index, 1);
    files.value = files.value.filter(i => i.name !== name);
  }
};

onUnmounted(() => {
  if (previews.value?.length) URL.revokeObjectURL(previews.value);
  if (error.value) error.value = '';
});
</script>
