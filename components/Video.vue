<template>
	<video
		class="bw-video"
		muted
		loop
		autoplay
		:poster="poster"
		:class="show ? 'show' : ''"
		:src="show ? activeSrc : ''"
	/>
</template>
<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		props: {
			poster: {
				type: String,
				default () {
					return ''
				}
			},
			highSrc: {
				type: String,
				default () {
					return ''
				}
			},
			lowSrc: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data () {
			return {
				activeSrc: '',
				breakpoint: 720,
				isVisible: false,
				playing: false,
				show: false
			}
		},
		watch: {
			activeSrc () {
				this.debounceLoad()
			},
			isVisible (newVal) {
				this.debounceLoad()
			}
		},
		mounted () {
			const onResize = () => {
				this.activeSrc = (document.body.clientWidth <= this.breakpoint) && (this.lowSrc !== '') ? this.lowSrc : this.highSrc
			}
			window.addEventListener('resize', onResize)
			onResize()

			const onScroll = (entries, observer) => {
				this.isVisible = entries[0].isIntersecting
			}
			const observer = new IntersectionObserver(onScroll, {
				root: document.querySelector('#__layout'),
				rootMargin: '0px',
				threshold: 0
			})
			observer.observe(this.$el)
			this.$once('hook:beforeDestroy', () => {
				window.removeEventListener('resize', onResize)
				observer.disconnect()
			})
			this.$el.onplaying = () => {
				this.playing = true
			}
		},
		methods: {
			debounceLoad () {
				this.timer.once('debounceLoad', 100, () => {
					this.playing && this.$el.pause()
					this.$el.load()
					this.playing = false
				})
				this.show = this.show || (this.isVisible && this.activeSrc)
			}
		}
	}
</script>
