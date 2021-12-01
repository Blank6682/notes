import { ref, reactive, onMounted, onUnmounted } from 'vue';

function uesMousePosition () {
    // const x = ref(0)
    // const y = ref(0)

    const position = reactive({
        x: 0,
        y: 0
    })
    //更新响应式数据
    // const update = (e) => {
    //     x.value = e.pageX
    //     y.value = e.pageY
    // }
    const update = (e) => {
        position.x = e.pageX
        position.y = e.pageY
    }
    //自定义事件
    onMounted(() => {
        window.addEventListener("mousemove", update)
    })
    //销毁自定义事件
    onUnmounted(() => {
        window.removeEventListener("mousemove")
    })
    // return { x, y }

    return position
}
export default uesMousePosition