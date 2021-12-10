<template>
	<div class="overlay-scale" :style="`font-size: ${fontSize}px;`">
		<slot />
	</div>
</template>

<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		props: {
			xScale: {
				type: Number,
				default: 42
			},
			yScale: {
				type: Number,
				default: 30
			},
			max: {
				type: Number,
				default: 30
			}
		},
		data () {
			return {
				fontSize: 12,
				rect: false
			}
		},
		computed: {
		},
		watch: {
			xScale () {
				this.update()
			},
			yScale () {
				this.update()
			}
		},
		mounted () {
			this.timer.observe('intro-resize', this.$el, (size) => {
				this.rect = size
				this.update()
			})
		},
		methods: {
			update () {
				const size = this.rect
				const fromHeight = size[0].contentRect.height / this.yScale
				const fromWidth = size[0].contentRect.width / this.xScale
				this.fontSize = Math.min(fromHeight, fromWidth, this.max)
			}
		}
	}
</script>
