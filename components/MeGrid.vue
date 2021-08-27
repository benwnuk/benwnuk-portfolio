<template>
	<section id="passion" class="me">
		<div class="grid" :class="aspect">
			<div
				v-for="item in gridContents"
				:key="item.src"
				:style="position(item)"
			>
				<div class="inner">
					<!-- <LazyVideo
						v-if="item.src.split('.')[1] == 'mp4'"
						:attrs="{ muted: true, loop: true, autoplay: true, controls: false}"
						:src="'grid/' + item.src"
						:pause-on-exit="false"
						load-offset="200%"
					/> -->
					<Video
						v-if="item.src.split('.')[1] == 'mp4'"
						ref="videoPlayer"
						:high-src="'grid/' + item.src"
					/>

					<img v-else :src="'grid/' + item.src" :style="item.src == 'cat-tall.jpg' ? 'object-position: center 25%;' : ''">
					<div v-if="item.msg" class="msg" :class="item.showMsg ? 'show' : ''">
						<p v-for="line in item.msg[2].split('|')" :key="line">
							{{ line }}
						</p>
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
						msg: [3, 3000, 'but I really|love to fly'],
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
						src: 'quad-3.jpg',
						w: 1,
						h: 1,
						short: [3, 0],
						medium: [0, 1],
						tall: [0, 1]
					},
					{
						src: 'quad-4.jpg',
						w: 1,
						h: 1,
						short: [5, 5],
						medium: [1, 2],
						tall: [5, 5]
					},
					{
						src: 'flying-1.mp4',
						w: 1,
						h: 1,
						short: [3, 2],
						medium: [3, 3],
						tall: [1, 2]
					},
					{
						src: 'van-2.jpg',
						w: 1,
						h: 1,
						msg: [2, 3000, 'or work on| my camper'],
						showMsg: false,
						short: [3, 1],
						medium: [2, 2],
						tall: [1, 3]
					},
					{
						src: 'quad-leds.jpg',
						w: 1,
						h: 1,
						msg: [5, 4000, 'that can|light up| the world'],
						showMsg: false,
						short: [0, 0],
						medium: [2, 0],
						tall: [2, 0]
					},
					{
						src: 'quad-tall.jpg',
						w: 1,
						h: 2,
						msg: [4, 3000, 'these|drones|I design|and build'],
						showMsg: false,
						short: [4, 1],
						medium: [3, 1],
						tall: [2, 2]
					},
					{
						src: 'leds.mp4',
						w: 1,
						h: 1,
						msg: [5, 5000, 'with just|a bit of|code'],
						showMsg: false,
						short: [4, 0],
						medium: [3, 0],
						tall: [2, 1]
					},
					{
						src: 'bike-leds.mp4',
						w: 1,
						h: 1,
						msg: [1, 3000, 'and go| for a ride'],
						showMsg: false,
						short: [2, 1],
						medium: [0, 2],
						tall: [0, 3]
					},
					{
						src: 'desert.jpg',
						w: 1,
						h: 1,
						short: [2, 0],
						medium: [2, 1],
						tall: [0, 2]
					},
					{
						src: 'mthood.jpg',
						w: 3,
						h: 1,
						msg: [0, 4000, 'occasionally I stop writing code'],
						showMsg: true,
						short: [0, 2],
						medium: [0, 3],
						tall: [0, 4]
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
			let msgIndex = 0
			const msgSlides = this.gridContents.filter(item => !!item.msg)
			msgSlides.sort((a, b) => {
				if (a.msg[0] < b.msg[0]) {
					return -1
				} else if (a.msg[0] > b.msg[0]) {
					return 1
				}
				return 0
			})
			const nextSlide = () => {
				const nextIndex = msgIndex < msgSlides.length - 1 ? msgIndex + 1 : 0
				msgSlides[msgIndex].showMsg = false
				msgSlides[nextIndex].showMsg = true
				msgIndex = nextIndex
				const delay = msgSlides[msgIndex].msg[1]
				this.timer.once('nextSlide', delay, () => {
					nextSlide()
				})
			}
			this.timer.once('nextSlide', msgSlides[msgIndex].msg[1], nextSlide)

			// console.log(msgSlides)
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
    position: relative;
    overflow: hidden;

    .grid {
      width: 100%;
      height: 100%;
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

        .msg {
          position: absolute;
          top: 3px;
          right: 3px;
          bottom: 3px;
          left: 3px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 1);
          color: black;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          will-change: opacity;
          transition: opacity 0.6s ease-in-out;

          &.show {
            opacity: 1;
          }

          p {
            font-size: 3.6vmin;
            line-height: 1em;
            letter-spacing: 0.05em;
            text-align: center;
            font-weight: 400;
            margin: 0.25em;
            text-shadow: 0 0 1em rgba(255, 255, 255, 0.6);
          }
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
