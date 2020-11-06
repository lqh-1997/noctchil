<template>
    <div style="height: 100%">
        <canvas
            ref="myCanvas"
            class="canvas"
            width="1280"
            height="720"
            @dragover="drag"
            @dragleave="dragleave"
        ></canvas>
        <!-- <img src="/@/assets/timg.jpg" /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    name: 'workbench',
    setup() {
        const myCanvas = ref<HTMLCanvasElement | null>(null);
        let canvas: HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D;

        const drag = function (e: DragEvent) {
            console.log(e);
        };

        const dragleave = function (e: DragEvent) {
            console.log('dragleave \n', e);
        };

        onMounted(() => {
            canvas = myCanvas.value!;
            canvas.draggable = true;
            ctx = canvas.getContext('2d')!;
            // const img = new Image();
            // img.src = '/@/assets/timg.jpg';
            // img.draggable = true;
            // img.onload = () => {
            //     ctx.drawImage(img, 0, 0, 1280, 720);
            // };
            // img.ondrag = (e) => {
            //     console.log(e);
            // };
            // draw();

            var sun = new Image();
            var moon = new Image();
            var earth = new Image();
            function init() {
                sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
                moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
                earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
                window.requestAnimationFrame(draw);
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-over';
                ctx.clearRect(0, 0, 300, 300); // clear canvas

                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.strokeStyle = 'rgba(0,153,255,0.4)';
                ctx.save();
                ctx.translate(150, 150);

                // Earth
                var time = new Date();
                ctx.rotate(
                    ((2 * Math.PI) / 60) * time.getSeconds() +
                        ((2 * Math.PI) / 60000) * time.getMilliseconds()
                );
                ctx.translate(105, 0);
                ctx.fillRect(0, -12, 50, 24); // Shadow
                ctx.drawImage(earth, -12, -12);

                // Moon
                ctx.save();
                ctx.rotate(
                    ((2 * Math.PI) / 6) * time.getSeconds() +
                        ((2 * Math.PI) / 6000) * time.getMilliseconds()
                );
                ctx.translate(0, 28.5);
                ctx.drawImage(moon, -3.5, -3.5);
                ctx.restore();

                ctx.restore();

                ctx.beginPath();
                ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
                ctx.stroke();

                ctx.drawImage(sun, 0, 0, 300, 300);

                window.requestAnimationFrame(draw);
            }

            init();
        });

        return {
            myCanvas,
            drag,
            dragleave
        };
    }
});
</script>

<style lang="scss" scoped>
.canvas {
    border: 1px solid black;
    position: absolute;
    padding: 0;
    margin: auto;
    display: block;
    top: 0;
    right: 0;
    left: 0;
    transform: scale(1.2);
    bottom: 0;
}
</style>
