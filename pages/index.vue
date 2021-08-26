<template>
	<div class="portfolio-page custom-scrollbar" :class="isSmall ? 'is-small' : ''">
		<PageHead />
		<PortfolioEntry
			v-for="(entry, index) in portfolioContent"
			:key="entry.slug"
			:entry="entry"
			:active="fullVideo == entry.slug"
			:is-tall="isTall"
			:is-small="isSmall"
			:next="index < portfolioContent.length - 1 ? portfolioContent[index + 1].slug : 'interests'"
			@videoClick="toggleFullVideo($event, entry.slug)"
		/>
		<MeGrid />
	</div>
</template>
<script>
	import timers from '~/mixins/timers'
	export default {
		mixins: [timers],
		async asyncData ({ $content }) {
			const entries = ['widefpv', 'glowpunk', 'fortis', 'wedgeandlever', 'creminelli', 'tylerengle', 'diller']
			const portfolioContent = []
			const portfolio = await $content('portfolio').fetch()
			entries.forEach((label) => {
				portfolioContent.push(portfolio.find(entry => entry.slug === label))
			})
			return {
				portfolioContent
			}
		},
		data () {
			return {
				fullVideo: false,
				isTall: '',
				isSmall: ''
			}
		},
		mounted () {
			this.timer.observe('resize', this.$el, () => {
				const rect = this.$el.getBoundingClientRect()
				this.isTall = rect.height > rect.width * 0.8
				this.isSmall = rect.height < 500 || rect.width < 900
			})
		},
		methods: {
			toggleFullVideo (event, slug) {
				if (event.target.nodeName === 'VIDEO') {
					this.fullVideo = this.fullVideo === slug ? false : slug
				}
			}
		}
	}
</script>

<style lang="scss">
body {
  font-family: 'Open Sans', sans-serif;
}

.custom-scrollbar {
  width: 100vw;
  scrollbar-gutter: always;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 7px;
    border: 2px solid #fff;
  }
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

p {
  font-size: 1em;
  line-height: 1.5em;
}

.portfolio-page {
  margin-top: 3.66em;
  height: calc(100% - 3.66em);
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  font-size: 16px;

  &::before {
    display: block;
    position: fixed;
    content: '';
    top: 0;
    right: 0;
    width: 1em;
    height: 3.66em;
    background: #fff;
    z-index: 20;
  }

  &::after {
    display: none;
    position: fixed;
    content: '';
    top: 3.66em;
    right: 0;
    bottom: 0;
    width: 1em;
    background: transparent;
    z-index: 0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }
}

.inset {
  margin: 0 auto;
  width: calc(100% - 6em);
  max-width: 1380px;
}

.portfolio-entry {
  scroll-snap-align: start;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  overflow: hidden;

  &.full-video:not(.is-tall) {
    .head {
      width: 0 !important;
      margin-right: 0 !important;
      margin-left: 0 !important;

      .inner {
        opacity: 0;
        transform: scale(0.7);
        pointer-events: none;
      }
    }
  }

  .main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 5;
    flex-shrink: 5;
    position: relative;
    margin-top: 1.33em;
    margin-bottom: 1em;
    height: calc(100% - 7em);
  }

  .head {
    flex-grow: 0;
    flex-shrink: 0;
    width: 24em;
    max-width: 30vw;
    margin-right: 3%;
    transition: width 0.3s ease-in-out, margin-right 0.3s ease-in-out, margin-left 0.3s ease-in-out;

    .inner {
      width: 24em;
      max-width: 30vw;
      opacity: 1;
      transform: scale(1);
      transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }

    h2 {
      font-size: 2.33em;
      font-weight: 300;
      opacity: 0.95;
    }

    h2,
    p {
      margin-top: 0;
      margin-bottom: 0.5em;
    }

    .tagline {
      font-weight: 500;
      letter-spacing: 0.04em;
      opacity: 0.8;
      margin-bottom: 1em;
    }

    a {
      color: currentColor;
      text-decoration: none;
      display: inline-block;
      position: relative;
      white-space: nowrap;

      &::after {
        display: block;
        position: absolute;
        content: '';
        top: calc(100% + 0.1em);
        left: 0.2em;
        right: 0.2em;
        height: 1px;
        background: currentColor;
        opacity: 0;
        transition: opacity 0.15s ease-in-out;
      }

      &:hover::after {
        opacity: 1;
      }
    }
  }

  .content-wrapper {
    position: relative;
    margin: 1.33em 0 0;

    h2,
    h3,
    h4,
    p {
      line-height: 1.5em;
      margin: 0;

      &:not(:first-child) {
        margin-top: 1em;
      }

      &:not(:last-child) {
        margin-bottom: 1em;
      }
    }
  }

  .image,
  .video {
    position: relative;
    // flex-grow: 1;
    flex-shrink: 1;
    align-self: center;
    max-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    & > video {
      display: block;
      max-height: 100%;
      max-width: 100%;
      border-radius: 0.33em;
      box-shadow: 0 0.5em 2em rgba(0, 0, 0, 0.6);
      transition: box-shadow 0.3s ease-in-out, opacity 0.2s ease-in-out;
      cursor: pointer;
      opacity: 0;

      &:hover {
        box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.8);
      }

      &.ready {
        opacity: 1;
      }
    }

    & > img {
      border-radius: 0.33em;
      box-shadow: 0 0.5em 1.5em rgba(0, 0, 0, 0.4);
    }
  }

  .image {
    img {
      display: block;
      max-height: 100%;
      max-width: 100%;
    }
  }

  .tags {
    position: relative;
    margin: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    border-top: 0.33em solid currentColor;
    height: 4.33em;
    flex-shrink: 0;

    .inset {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      height: 100%;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      list-style: none;
      flex-grow: 1;
      margin: 0;
      padding: 0;
    }

    li {
      //font-weight: bold;
      display: block;
      padding: 5px 15px;
      text-transform: uppercase;
      font-size: 0.8em;
      text-align: center;
      font-weight: 400;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .next {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2em;
      height: 2em;
      margin: 0 0 0 1em;
      padding: 0;
      border: 1px solid currentColor;
      flex-grow: 0;
      flex-shrink: 0;
      color: currentColor;
      border-radius: 50%;

      svg {
        display: block;
        width: 1.5em;
        height: 1.5em;
      }
    }
  }

  &.widefpv,
  &.fortis {
    .head {
      margin-right: 0;
      margin-left: 3em;
    }

    .main {
      flex-direction: row-reverse;
    }
  }

  &.widefpv {
    .tags {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  &.diller {
    .tags {
      color: white;
    }
  }

  &.tylerengle {
    .tags {
      color: #a39586;
    }
  }

  &.is-tall {
    .main {
      flex-direction: column !important;
    }

    .head,
    .inner {
      margin: 0 !important;
      width: 100%;
      max-width: 100%;
    }

    .head {
      h2 {
        margin-bottom: 0;
      }

      p {
        margin-bottom: 0.25em;
      }
    }

    .video {
      height: auto !important;
      margin-top: 3em;
      pointer-events: none;
    }

    .tags {
      height: 6em;
    }
  }
}

.is-small {
  .portfolio-entry {
    font-size: 14px;

    .head {
      h2 {
        margin-bottom: 0;
      }

      p {
        margin-bottom: 0.25em;
      }

      .content-wrapper {
        margin-top: 0.5em;

        p:not(:first-child) {
          margin-top: 0.5em;
        }
      }
    }

    &:not(.is-tall) {
      .head,
      .head .inner {
        width: 32em;
        max-width: 50vw;
      }
    }

    &.is-tall {
      .tags {
        height: 9em;
      }
    }
  }

  .inset {
    width: calc(100% - 3em);
  }

  .page-head .inset p:first-child {
    display: none;
  }

  .page-head .inset .benw-tag {
    width: 16rem;
    max-width: 36vw;
  }
}

</style>
