
export default {

   linear: (time) => time,

   easeInQuad: (time) => time * time,

   easeOutQuad: (time) => time * (2 - time),

   easeInOutQuad: (time) => time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time,

   easeInCubic: (time) => time * time * time,

   easeOutCubic: (time) => (--time) * time * time + 1,

   easeInOutCubic: (time) => time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1,

   easeInQuart: (time) => time * time * time * time,

   easeOutQuart: (time) => 1 - (--time) * time * time * time,

   easeInOutQuart: (time) => time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time,

   easeInQuint: (time) => time * time * time * time * time,

   easeOutQuint: (time) => 1 + (--time) * time * time * time * time,

   easeInOutQuint: (time) => time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time
}