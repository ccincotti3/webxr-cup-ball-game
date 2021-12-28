const getConfig = (totalSegments) => {
    return {
        SEGMENT: {
            idPrefix: "segment",
            radius: "0.03",
            collisionFilterGroup: "2",
            collisionFilterMask: "2",
            getLinearDamping: (segmentNumber) => (totalSegments - segmentNumber) * 0.2
        },
        BALL: {
            idPrefix: "ball",
            radius: "0.05",
            collisionFilterGroup: "1",
            collisionFilterMask: "5",
            getLinearDamping: (_segmentNumber) => 0.2
        }
    }
}
AFRAME.registerComponent('rope', {
    schema: {
        connectTo: { type: 'string', default: '' }
    },
    init: function () {
        console.warn = function () { }
        const N = 5
        const ropeConfig = getConfig(N)
        const ropeContainer = this.el

        let lastId = this.data.connectTo

        // attach rope segments
        for (let i = 0; i < N; i++) {
            const el = this.initRopeEl(i, ropeConfig.SEGMENT)
            this.initRopeElPhysics(el, lastId, ropeConfig.SEGMENT, i)
            ropeContainer.append(el)
            lastId = el.id
        }

        const ballEl = this.initRopeEl(0, ropeConfig.BALL)
        this.initRopeElPhysics(ballEl, lastId, ropeConfig.BALL)
        ropeContainer.append(ballEl)
        this.initRopePosition()
    },

    initRopeEl(i, config) {
        const el = document.createElement("a-sphere")
        el.id = `${config.idPrefix}-${i}`
        el.setAttribute(
            "scale", `${config.radius} ${config.radius} ${config.radius}`
        )
        return el 
    },

    initRopeElPhysics(el, target, config, i=0) {
        const linearDamping = config.getLinearDamping(i)
        const sphereRadius = config.radius
        const collisionFilterGroup = config.collisionFilterGroup
        const collisionFilterMask = config.collisionFilterMask
        el.setAttribute("ammo-constraint", `target: #${target}; type: hinge; pivot: 0 0.15 0`)
        el.setAttribute("ammo-body", `collisionFilterGroup: ${collisionFilterGroup}; collisionFilterMask: ${collisionFilterMask}; linearDamping:  ${linearDamping}; mass: 1; type: dynamic; activationState: disableDeactivation;`)
        el.setAttribute("ammo-shape", `fit: manual; type: sphere; sphereRadius: ${sphereRadius}`)
    },

    initRopePosition() {
        for (const [i, segment] of [...this.el.children].entries()) {
            segment.setAttribute(
                "position", `0 -${0.2 + i * 0.2} 0.0`
            )
        }
    }
})