<template>
	<section id="interests" class="me">
		<div class="grid" :class="aspect">
			<div
				v-for="item in gridContents"
				:key="item.src"
				:style="position(item)"
			>
				<div class="inner">
					<LazyVideo
						v-if="item.src.split('.')[1] == 'mp4'"
						:attrs="{ muted: true, loop: true, autoplay: true, controls: false}"
						:src="'grid/' + item.src"
						:pause-on-exit="false"
						load-offset="150%"
					/>
					<img v-else :src="'grid/' + item.src">
					<div class="back">
						<p>Card back</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		data () {
			return {
				aspect: 'medium',
				gridContents: [
					{
						src: 'flying-2.mp4',
						w: 1,
						h: 1,
						short: [0, 1],
						medium: [0, 0],
						tall: [0, 0]
					},
					{
						src: 'cat-tall.jpg',
						w: 1,
						h: 2,
						short: [1, 0],
						medium: [1, 0],
						tall: [1, 0]
					},
					{
						src: 'quad-1.jpg',
						w: 1,
						h: 1,
						short: [3, 0],
						medium: [0, 1],
						tall: [0, 1]
					},
					{
						src: 'flying-1.mp4',
						w: 1,
						h: 1,
						short: [2, 0],
						medium: [2, 1],
						tall: [1, 2]
					},
					{
						src: 'van.jpg',
						w: 1,
						h: 1,
						short: [2, 1],
						medium: [2, 2],
						tall: [1, 3]
					},
					{
						src: 'quad-leds.jpg',
						w: 1,
						h: 1,
						short: [0, 0],
						medium: [2, 0],
						tall: [2, 0]
					},
					{
						src: 'quad-tall.jpg',
						w: 1,
						h: 2,
						short: [4, 1],
						medium: [3, 1],
						tall: [2, 2]
					},
					{
						src: 'leds.mp4',
						w: 1,
						h: 1,
						short: [4, 0],
						medium: [3, 0],
						tall: [2, 1]
					},
					{
						src: 'bike-leds.mp4',
						w: 1,
						h: 1,
						short: [3, 1],
						medium: [0, 2],
						tall: [0, 3]
					},
					{
						src: 'desert.jpg',
						w: 1,
						h: 1,
						short: [5, 5],
						medium: [1, 2],
						tall: [0, 2]
					},
					{
						src: 'desert-wide.jpg',
						w: 4,
						h: 1,
						short: [0, 2],
						medium: [0, 3],
						tall: [-1, 4]
					}
				]
			}
		},
		mounted () {
			this.timer.observe('resize', this.$el, () => {
				const rect = this.$el.getBoundingClientRect()
				const ratio = rect.width / rect.height
				this.aspect = ratio > 1.3 ? 'short' : ratio > 0.8 ? 'medium' : 'tall'
			})
		},
		methods: {
			position (item) {
				if (this.aspect === 'tall') {
					return `left: ${item.tall[0] * 33.33}%; top: ${item.tall[1] * 20}%; width: ${item.w * 33.33}%; height: ${item.h * 20}%;`
				} else if (this.aspect === 'medium') {
					return `left: ${item.medium[0] * 25}%; top: ${item.medium[1] * 25}%; width: ${item.w * 25}%; height: ${item.h * 25}%;`
				} else {
					return `left: ${item.short[0] * 20}%; top: ${item.short[1] * 33.33}%; width: ${item.w * 20}%; height: ${item.h * 33.33}%;`
				}
			}
		}
	}

</script>

<style lang="scss">
  .me {
    scroll-snap-align: start;
    height: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .grid {
      // background: blue;
      width: calc(100%);
      height: calc(100%);
      position: relative;
      border: 2px solid white;
      box-sizing: border-box;
      overflow: hidden;

      &::after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: none;
        z-index: 5;
        border: 4px solid white;
      }

      & > * {
        position: absolute;
        transition: top 0.3s ease-in-out, left 0.3s ease-in-out;
        perspective: 1000px;

        .inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.4s ease-in-out 0s;
        }

        .back {
          position: absolute;
          top: 4px;
          right: 4px;
          bottom: 4px;
          left: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(180, 240, 248);
          backface-visibility: hidden;
          transform: rotateY(180deg);
          z-index: 1;
        }

        img,
        video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 4px solid white;
          box-sizing: border-box;
          z-index: 2;
          backface-visibility: hidden;
        }
      }
    }
  }
</style>
