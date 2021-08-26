<template>
	<section
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
						<a :href="entry.url">{{ entry.url.replace('https://', '').replace('http://', '') }}</a>
					</p>

					<nuxt-content class="content-wrapper" :document="entry" />
				</div>
			</div>

			<div v-if="entry.image" class="image">
				<img :src="'portfolio/' + entry.image">
			</div>
			<div v-if="entry.video" class="video" @click="$emit('videoClick', $event)">
				<LazyVideo
					:attrs="{ muted: true, loop: true, autoplay: true, controls: false}"
					:sources="videoSource"
					:poster="'posters/' + entry.poster"
					:pause-on-exit="false"
					load-offset="150%"
				/>
			</div>
		</div>
		<div v-if="entry.tech" class="tags">
			<ul class="inset">
				<li v-for="label in entry.tech.split(',')" :key="label">
					{{ label.trim() }}
				</li>
			</ul>
		</div>
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
		}
	}
</script>
