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

			<div v-if="entry.image" class="image">
				<img :src="'portfolio/' + entry.image">
			</div>
			<div v-if="entry.video" class="video" @click="$emit('videoClick', $event)">
				<LazyVideo
					ref="videoPlayer"
					:attrs="{ muted: true, loop: true, autoplay: true, controls: false}"
					:sources="videoSource"
					:poster="'posters/' + entry.poster"
					:pause-on-exit="false"
					load-offset="150%"
					:class="isReady ? 'ready' : ''"
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
				<a v-if="next" :href="`#${next}`" class="next"><ArrowDownSVG /></a>
			</div>
		</footer>
	</section>
</template>
<script>
	export default {
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
			},
			next: {
				type: String,
				default () {
					return ''
				}
			}
		},
		data () {
			return {
				isReady: false
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
			if (this.$refs.videoPlayer) {
				this.$refs.videoPlayer.$el.addEventListener('play', () => {
					this.isReady = true
				})
			} else {
				this.isReady = true
			}
		}
	}
</script>
