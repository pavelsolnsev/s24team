<template>
  <AInput ref="inputRef" v-bind="$attrs" :type="inputType" v-model="value" v-model:error="error" :inputWrapperClass="['pr-46', $attrs.inputWrapperClass]">
    <template #next>
      <div
        class="absolute inset-y-0 right-0 flex items-center justify-center px-16 cursor-pointer text-gray-60"
        @click="toggleType"
      >
        <IconEye class="size-20" v-if="inputType === 'password'" />
        <IconEyeSlash class="size-20" v-else />
      </div>
    </template>
  </AInput>
</template>

<script setup>
import AInput from '~/components/atoms/AInput.vue';
import IconEye from '~/svg/_common/eye.svg';
import IconEyeSlash from '~/svg/_common/eye-slash.svg';

defineOptions({ inheritAttrs: false });

const value = defineModel({ default: '' });
const error = defineModel('error', { default: '' });

const inputRef = ref(null);
const inputType = ref('password');

const toggleType = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

defineExpose({
  validate: (...args) => inputRef.value?.validate(...args),
  focusInput: () => inputRef.value?.focusInput(),
  blurInput: () => inputRef.value?.blurInput(),
});
</script>
