<template>
	<header class="page-head">
		<div class="inset">
			<p class="label">
				Web Developer
			</p>
			<h1><BenWnukSVG /></h1>
			<p class="links">
				<a href="/resume" class="svg-link" title="Ben Wnuk Resume">
					<mdicon name="file-account" />
				</a>
				<a href="https://www.linkedin.com/in/benwnuk/" class="svg-link" target="_blank" title="Ben Wnuk on LinkedIn">
					<mdicon name="linkedin" />
				</a>
				<a href="https://github.com/benwnuk/" class="svg-link" target="_blank" title="Ben Wnuk on Github">
					<mdicon name="github" />
				</a>
			</p>
		</div>
	</header>
</template>

<style lang="scss">
.page-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10;
  color: #222;
  height: 3.66em;
  padding: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);

  .inset {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  h1,
  p {
    margin: 0;
  }

  h1 {
    color: #444;
  }

  p {
    color: #222;
    font-weight: 600;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  .links {
    line-height: 1em;
    margin-right: -0.33em;
    text-align: right;
  }

  .label,
  .links {
    display: block;
    flex-shrink: 0;
    width: 18%;
    min-width: 140px;
  }

  .benw-tag {
    svg {
      width: auto;
      height: 0.85em;
    }
  }
}

.svg-link {
  display: inline-block;
  margin-left: 0.66em;
  opacity: 0.9;

  svg {
    display: block;
    width: 1.66rem;
    height: 1.66rem;
  }

  &:hover {
    opacity: 1;
  }
}

</style>
