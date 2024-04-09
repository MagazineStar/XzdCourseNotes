export const useCountHook = () => {
    const count = ref(10);
    const double = computed(() => {
        return count.value * 2
    })
    const addCount = () => {
        count.value++;
    }
    return {
        count,
        double,
        addCount
    }
}