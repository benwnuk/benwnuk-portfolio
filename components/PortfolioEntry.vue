<template>
	<section
		:id="entry.slug"
		class="portfolio-entry"
		:class="entry.slug + (active ? ' full-video' : '') + (isTall ? ' is-tall' : '')"
		:style="`color: ${entry.color ? entry.color : 'black'}; background: ${entry.background ? entry.background : 'white'}`"
	>
		<div class="main inset">
			<div class="head">
				<div class="inner">
					<h2>{{ entry.title }}</h2>
					<p class="tagline">
						{{ entry.tagline }}
					</p>
					<p>
						<a :href="entry.url" target="_blank">{{ entry.url.replace('https://', '').replace('http://', '') }}</a>
					</p>

					<nuxt-content class="content-wrapper" :document="entry" />
				</div>
			</div>

			<div v-if="entry.image && loadVideo" class="image">
				<img :src="'portfolio/' + entry.image">
			</div>
			<div v-if="entry.video && loadVideo" class="video" @click="$emit('videoClick', $event)">
				<!-- <LazyVideo
					ref="videoPlayer"
					:attrs="{ muted: true, loop: true, autoplay: true, controls: false}"
					:sources="videoSource"
					:poster="'posters/' + entry.poster"
					:pause-on-exit="false"
					load-offset="100%"
					:class="isReady ? 'ready' : ''"
				/> -->
				<Video
					ref="videoPlayer"
					class="ready"
					:poster="'posters/' + entry.poster"
					:low-src="'mobile-videos/' + entry.video"
					:high-src="'videos/' + entry.video"
				/>
			</div>
		</div>
		<footer class="tags">
			<div class="inset">
				<ul>
					<li v-for="label in entry.tech.split(',')" :key="label">
						{{ label.trim() }}
					</li>
				</ul>
				<button class="next" @click="$emit('scrollNext')">
					<ArrowDownSVG />
				</button>
			</div>
		</footer>
	</section>
</template>
<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		props: {
			entry: {
				type: Object,
				default () {
					return {}
				}
			},
			active: {
				type: Boolean,
				default: false
			},
			isTall: {
				type: Boolean,
				default: false
			},
			isSmall: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				isReady: false,
				loadVideo: false
			}
		},
		computed: {
			videoSource () {
				if (this.isSmall) {
					return ['mobile-videos/' + this.entry.video]
				} else {
					return ['videos/' + this.entry.video]
				}
			}
		},
		mounted () {
			this.timer.once('delayVideo', 100, () => {
				this.loadVideo = true
			})
			this.timer.once('delayReady', 200, () => {
				if (this.$refs.videoPlayer) {
					this.$refs.videoPlayer.$el.addEventListener('playing', () => {
						this.isReady = true
					})
				} else {
					this.isReady = true
				}
			})
		}
	}
</script>
