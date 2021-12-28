AFRAME.registerComponent('target', {
    init: function () {
        this.el.addEventListener('collidestart', function (evt) {
            console.log(evt)
            const ballEl = evt?.detail?.el
        })
    }
})