const tSym = Symbol('gpTimers')

export default {
  created () {
    this[tSym] = {}
    this.timer = {
      interval: (name, ms, cb) => {
        this.addTimer('interval', name, ms, cb)
      },
      once: (name, ms, cb) => {
        this.addTimer('once', name, ms, cb)
      },
      animation: (name, cb) => {
        this.addTimer('animation', name, cb)
      },
      next: (name, cb) => {
        this.addTimer('next', name, cb)
      },
      observe: (name, el, cb) => {
        this.addTimer('observe', name, el, cb)
      }
    }
  },
  beforeDestroy () {
    this.stopAllTimers()
  },
  methods: {
    addTimer (type, name, opt1, opt2) {
      if (!['interval', 'once', 'animation', 'next', 'observe'].includes(type)) {
        console.log('must be interval, once, animation, next, or observe')
        return false
      }
      if (!name) {
        console.log('a unique timer name is required')
        return false
      }
      if (this[tSym][name]) {
        this.stopTimer(name)
      }
      let duration = opt1
      let func = opt2
      if (type === 'animation' || type === 'next') {
        func = opt1
        duration = null
      }
      this[tSym][name] = {
        name,
        type,
        func,
        duration,
        keeper: false
      }
      this.startTimer(name)
    },
    startTimer (name) {
      const obj = this[tSym][name]
      // console.log('start timer', name)
      if (!obj) {
        console.log("timer doesn't exist", name)
      } else if (obj.type === 'interval') {
        obj.keeper = setInterval(obj.func, obj.duration)
      } else if (obj.type === 'once') {
        obj.keeper = setTimeout(obj.func, obj.duration)
      } else if (obj.type === 'animation') {
        obj.keeper = () => {
          obj.func()
          requestAnimationFrame(obj.keeper)
        }
        obj.keeper()
      } else if (obj.type === 'next') {
        obj.keeper = requestAnimationFrame(obj.func)
      } else if (obj.type === 'observe') {
        obj.keeper = new ResizeObserver(obj.func)
        obj.keeper.observe(obj.duration)
      }
    },
    stopTimer (name) {
      const obj = this[tSym][name]
      // console.log('stop timer', name)
      if (!obj) {
        // console.log("timer doesn't exist", name)
      } else if (obj.type === 'interval') {
        clearInterval(obj.keeper)
      } else if (obj.type === 'once') {
        clearTimeout(obj.keeper)
      } else if (obj.type === 'animation') {
        obj.keeper = () => {}
      } else if (obj.type === 'next') {
        cancelAnimationFrame(obj.keeper)
      } else if (obj.type === 'observe') {
        obj.keeper.disconnect()
      }
    },
    stopAllTimers () {
      for (const key in this[tSym]) {
        this.stopTimer(key)
      }
    }
  }
}
