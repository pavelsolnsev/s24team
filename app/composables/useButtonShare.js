export default function (options = {}) {
  const copied = ref(false);
  let copiedTimeoutId = null;

  async function copyToClipboard(text) {
    if (!import.meta.client || !navigator?.clipboard?.writeText) return;
    await navigator.clipboard.writeText(text);
  }

  function flashCopied() {
    copied.value = true;
    if (copiedTimeoutId) clearTimeout(copiedTimeoutId);
    copiedTimeoutId = setTimeout(() => {
      copied.value = false;
      copiedTimeoutId = null;
    }, options.timeout || 3000);
  }

  function resolveUrl() {
    const url = toValue(options.url);
    const origin = window.location.origin;

    if (!url) return window.location.href;

    if (typeof url === 'object') {
      const router = useRouter();
      const resolved = router.resolve(url);
      return origin + resolved.href;
    }

    if (/^https?:\/\//i.test(url)) return url;

    return origin + (url.startsWith('/') ? url : '/' + url);
  }

  async function share() {
    if (!import.meta.client || !window?.location?.href) return;
    try {
      await copyToClipboard(resolveUrl());
      flashCopied();
    } catch {
      // игнорируем ошибку: если буфер обмена заблокирован, сохраняем состояние по умолчанию
    }
  }

  onUnmounted(() => {
    if (copiedTimeoutId) {
      clearTimeout(copiedTimeoutId);
      copiedTimeoutId = null;
    }
  });

  return {
    copied,
    share,
  };
}
