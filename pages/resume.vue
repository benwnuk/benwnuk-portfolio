<template>
	<OverlayScale class="resume-page" :x-scale="87" :y-scale="112" :max="100">
		<div class="paper">
			<section class="side-column">
				<div class="logo">
					<BenWnukQR class="qr-code" />

					<div class="title">
						<BenWnukSVG />
						<h3>Web Developer</h3>
					</div>
				</div>

				<div class="details">
					<p><mdicon name="map-marker" />Porland Oregon, Earth</p>
					<p><a href="http://benwnuk.com" target="_blank"><mdicon name="page-next-outline" />benwnuk.com</a></p>
					<p><mdicon name="cellphone-basic" />503-451-3530</p>
					<p><a href="mailto:contact@benwnuk.com" target="_blank"><mdicon name="email-outline" />contact@benwnuk.com</a></p>
					<p><a href="https://linkedin.com/in/benwnuk" target="_blank"><mdicon name="linkedin" />linkedin.com/in/benwnuk</a></p>
					<p><a href="https://github.com/benwnuk" target="_blank"><mdicon name="github" />github.com/benwnuk</a></p>
				</div>
				<hr>
				<p v-for="(tech, key) in techs" :key="key">
					<strong>{{ key }}</strong><br> {{ tech }}
				</p>
				<div class="side-footer">
					<hr>
					<p v-for="(tech, key) in also" :key="key">
						<strong>{{ key }}</strong><br> {{ tech }}
					</p>
				</div>
			</section>
			<section class="main-column">
				<h4 style="margin: 0.5em 0 0.66em;">
					Creative codemonkey seeking opportunities to make cool stuff with good people.
				</h4>
				<p>
					Professional front-end web developer with over 15 years experience and a uniquely broad skillset.
					Tenacious, methodical, and detail-focused, excelling in agile environments. Applies the same
					problem-solving approach to improving user experiences as optimizing code and boosting metrics.
				</p>

				<section
					v-for="(entry) in historyContent"
					:key="entry.slug"
					style="margin-top: 2em;"
				>
					<header>
						<p>
							<strong>{{ entry.title }}</strong></br>
							{{ entry.employer }}
						</p>
						<em>{{ entry.date }}</em>
					</header>
					<nuxt-content :document="entry" />
					<blockquote v-if="entry.quote">
						<p>{{ entry.quote.content }}</p>
						<footer>{{ entry.quote.author }}</footer>
					</blockquote>
				</section>
			</section>
		</div>
	</OverlayScale>
</template>
<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		async asyncData ({ $content }) {
			const entries = ['widefpv', 'mezr', 'consulting', 'sbs']
			const historyContent = []
			const history = await $content('history').fetch()
			entries.forEach((label) => {
				historyContent.push(history.find(entry => entry.slug === label))
			})
			return {
				historyContent
			}
		},
		data () {
			return {
				techs: {
					Javascript: 'ES6, Workers, Webpack, Web Sockets, Message Channels, Streams, Typed Arrays, Shared Arrays',
					Templating: 'Symantic HTML markup, Responsive CSS/SCSS, UI/UX animations',
					Frameworks: 'Vue, Nuxt (static and SSR, routed and SPA), Vuetify, Three.js, jQuery, Jekyll',
					'Media APIs': 'Audio Nodes, User/Device MediaStreams, Canvas 2d/3d/Offscreen, Web Codec, MediaRecorder, WASM muxing',
					'Progressive Web Apps': 'Manifests, Service Workers, Workbox',
					WebRTC: 'Peer Connections, Data Channels, Peer.js',
					Wordpress: 'Custom & child themes, Custom posts/fields, SEO, caching, Divi, Gutenberg, PHP, MySQL'
				},
				also: {
					Extracurricular: 'Freestyle & cinematic FPV drone design construction and flight, cycling, 3D printing/design, carpentry, LED microcontroller art.'
				}
			}
		},
		head: {
			title: 'Ben Wnuk - Resume'
		},
		mounted () {
			this.timer.once('consoleHello', 1000, () => {
				console.log('scoping my code? lets work together!')
				console.log('https://github.com/benwnuk/benwnuk-portfolio')
			})
		},
		methods: {
		}
	}
</script>

<style lang="scss">
body {
  font-family: 'Open Sans', sans-serif;
}

html,
body,
#__nuxt,
#__layout,
.portfolio-page {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

.resume-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media print {
    font-size: 7.1pt !important;
  }

  .logo {
    display: flex;
    align-items: center;
    margin: 1.5em 0 2em;

    svg {
      width: 6.5em;
      margin-right: 1em;
      flex-shrink: 0;
    }

    .title {
      h3 {
        margin-top: 0.33em;
        font-size: 1.5em;
      }

      .benw-tag {
        font-size: 2.4em;

        svg {
          fill: #333;
        }
      }
    }
  }

  p .mdi svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 1em;
    opacity: 0.9;
  }

  .details {
    margin-top: 1.66em;

    p {
      // margin: 0 !important;
    }
  }

  h2,
  h3,
  h4,
  h5,
  p {
    line-height: 1.5em;
    margin-top: 0;
    margin-bottom: 0;

    &:not(:first-child) {
      margin-top: 0.5em;
    }

    &:not(:last-child) {
      margin-bottom: 0.33em;
    }
  }

  hr {
    margin-top: 2em;
    margin-bottom: 2em;
    border: none;
    border-bottom: thin solid #ccc;
  }

  h2 {
    font-size: 3.5em;
    font-weight: 300;
  }

  h3 {
    font-size: 3em;
    font-weight: 300;
  }

  h4 {
    font-size: 2.5em;
    font-weight: 300;
    line-height: 1.45em;
  }

  h5 {
    font-size: 2em;
    font-weight: 500;
    opacity: 0.9;
  }

  p,
  li {
    font-size: 1.33em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  blockquote {
    margin: 1em 1.5em;
    position: relative;

    &::before,
    &::after {
      display: block;
      position: absolute;
      content: '"';
      font-size: 4em;
      opacity: 0.8;
    }

    &::before {
      top: -0.25em;
      left: -0.55em;
      content: "“";
    }

    &::after {
      bottom: -0.6em;
      right: -0.25em;
      content: "”";
    }

    p {
      display: inline;
      font-style: italic;
    }

    footer {
      display: inline;
      float: right;
      font-size: 1.33em;
      margin-right: 1em;
      font-style: italic;

      &::before {
        content: '- ';
      }
    }
  }

  .paper {
    width: 85em;
    height: 110em;
    border: thin solid black;
    display: flex;
    border-radius: 0.5em;
  }

  .side-column {
    width: 33.33%;
    border-right: thin solid #ccc;
    padding: 1em 2em;
    position: relative;
  }

  .side-footer {
    position: absolute;
    bottom: 2em;
    left: 2em;
    right: 2em;
  }

  .main-column {
    width: 66.66%;
    padding: 1em 2em;

    section {
      header {
        display: flex;
        align-items: center;

        & > em {
          text-align: right;
          flex-grow: 1;
          font-size: 2.33em;
          font-style: normal;
          font-weight: 400;
          opacity: 0.6;
        }
      }
    }
  }
}

</style>
