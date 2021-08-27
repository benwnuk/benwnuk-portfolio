<template>
	<section class="intro" :class="isTall ? 'is-tall' : ''">
		<div class="inset">
			<div class="intro-body">
				<div class="left">
					<p>
						Professional front-end web developer with 15+ years experience and a uniquely broad skillset.
						Tenacious, methodical, and detail-focused, excelling in agile environments.
						Applies the same problem-solving approach to improving user experiences as optimizing code and boosting metrics.
					</p>
					<p>
						Seeking opportunities within the robotics, IOT, drone/UAV, streaming media, transportation, energy, and social networking industries as well as with agencies serving such clients.
					</p>
				</div>
				<div class="right">
					<ul>
						<li>Semantic HTML, Responsive CSS/SASS </li>
						<li>Javascript, ES6, functional and OOP</li>
						<li>Vue/Nuxt, serverless and SSR, routed and SPA</li>
						<li>Progressive Web App Development</li>
						<li>Web workers, media, file system, and high-performance APIs</li>
						<li>Wordpress, theming, plugins, optimization and deployment</li>
						<li>Three.js, Matter.js, canvas 2D / WebGL</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="scroll">
			<button class="next" style="margin: 0;" @click="$emit('scrollNext')">
				<ArrowDownSVG />
			</button>
		</div>
	</section>
</template>

<script>
	export default {
		props: {
			isTall: {
				type: Boolean,
				default: false
			},
			isSmall: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss">
  section.intro {
    scroll-snap-align: start;
    height: 100%;
    padding: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #222;
    color: #fff;

    .inset {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 6rem);
      max-width: 1020px;

      .is-small & {
        height: calc(100% - 4rem);
      }
    }

    .scroll {
      height: 6rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .is-small & {
        height: 4rem;
      }
    }

    .intro-body {
      display: flex;
      justify-content: space-between;
      font-size: 1.2rem;

      .is-small & {
        font-size: 1em;
      }

      p {
        font-size: 1em;
        line-height: 1.5em;
        margin: 0.5em 0;
      }

      .left {
        width: 52%;
      }

      .right {
        width: 42%;
      }

      ul {
        // list-style: none;
        padding: 0.5em 0 0 1em;
        margin: 0;
        font-size: 1em;
      }

      li {
        font-size: 1em;
        line-height: 1.5em;
        // margin: 0.5em 0;
      }
    }

    &.is-tall {
      .inset {
        max-width: 680px;
      }

      .intro-body {
        flex-direction: column;

        .left {
          margin-bottom: 2rem;
        }

        .left,
        .right {
          width: 100%;
        }
      }
    }
  }

</style>
