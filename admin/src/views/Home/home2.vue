<template>
    <div id="main" ref="mainRef" style="width: 800px; height: 800px">home2</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref } from 'vue';
import echarts from 'echarts';

export default defineComponent({
    name: 'home2',
    setup() {
        const mainRef = ref<HTMLDivElement | null>(null);

        onMounted(() => {
            if (!unref(mainRef)) {
                return;
            }
            const myChart = echarts.init(unref(mainRef) as HTMLDivElement);

            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        });

        return {
            mainRef
        };
    }
});
</script>
