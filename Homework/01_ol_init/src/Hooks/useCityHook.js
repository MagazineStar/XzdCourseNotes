const useCityHook = () => {
    const city = ref("武汉");
    const $city = computed(() => {
        return "$" + city.value;
    })
    const changeCity = () => {
        city.value = "苏州"
    }
    return {
        city, $city, changeCity
    }
}
export { useCityHook }