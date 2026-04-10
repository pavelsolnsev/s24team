export default function () {
  const router = useRouter();
  const route = useRoute();
  const allRoutes = router.getRoutes();

  const crumbs = computed(() => {
    const breadcrumbs = [];
    const pathSegments = [...new Set(route.matched.map(item => item.path))];

    pathSegments.forEach(item => {
      const matchedRoute = allRoutes.find(i => i.path === item);

      const title = matchedRoute?.meta?.seo?.crumb || '';

      if (title) {
        breadcrumbs.push({ path: item || '/', title });
      }
    });
    return breadcrumbs;
  });

  return {
    crumbs,
  };
}
