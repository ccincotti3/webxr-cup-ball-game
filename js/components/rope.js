AFRAME.registerComponent('rope', {
    schema: {
        connectTo: { type: 'string', default: '' }
    },
    init: function () {
        console.warn = function () { }
        const N = 5
        const chainContainer = this.el
        const collisionGroup = "2";

        let constraintType;
        let lastId = this.data.connectTo

        for (let i = 0; i < N; i++) {
            const childBlock = document.createElement("a-sphere")
            childBlock.id = `segment-${i}`
            childBlock.setAttribute(
                "position", `0 -${0.2 + i * 0.2} 0.0`
            )
            childBlock.setAttribute(
                "scale", `0.03 0.03 0.03`
            )

            if (i < 2) {
                constraintType = "lock"
            } else {
                constraintType = "hinge"
            }
            childBlock.setAttribute("ammo-constraint", `target: #${lastId}; type: ${constraintType}; pivot: 0 0.15 0`)
            childBlock.setAttribute("ammo-body", `collisionFilterGroup: ${collisionGroup}; collisionFilterMask: ${collisionGroup}; linearDamping:  ${(N - i) * 0.2}; mass: 1; type: dynamic; activationState: disableDeactivation;`)
            childBlock.setAttribute("ammo-shape", "fit: manual; type: sphere; sphereRadius: 0.03")

            lastId = childBlock.id
            chainContainer.append(childBlock)
        }
    },
})