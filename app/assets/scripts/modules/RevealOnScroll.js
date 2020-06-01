import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
        this.itemsToReveal = els
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        // if someone is resizing their window after the page is loaded, then our calculation for scrollY + window.innerHeight is incorrect
        // to solve this problem we can add an eventlistener with the event of resize and call debounce asthe callback function and wait 333 miliseconds after the resizing of the browser happened, and then run
        window.addEventListener("resize", debounce(() => {
            console.log("resize ran")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        console.log("scrolled")
        this.itemsToReveal.forEach(el => {
            // only if the items are not revealed we want to call the calculateIfScrolled to method
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
            }
        })
    }

    // Element.getBoundingClientRect().y shows how far the element is from the top of the viewport in pixels

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("element was calculated")
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible")
                // if the items are revealed give them a isRevealed = true property
                el.isRevealed = true
                // if we reached the last item we want to remove the event listener
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item")
            // initially the items are not revealed
            el.isRevealed = false
        })
        // give the last item the isLastItem = true property
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
}

export default RevealOnScroll;