---
home: true
heroImage: /cover.svg
heroImageStyle:
  {
    maxWidth: '600px',
    width: '100%',
    height: '15%',
    display: block,
    margin: '8% auto 8% auto',
  }
heroText: 前端知识点总结
tagline: 往者不谏，来者可追
actionText: 开始 →
actionLink: /HTML/
features:
  - title: 愉悦感
    details: Sense of pleasure
  - title: 成就感
    details: Sense of accomplishment
  - title: 危机感
    details: Sense of crisis
footer: MIT Licensed | Copyright © 2019-present Jeffrey Zhang
---

<Clock/>

<style>
.home .content__default:not(.custom) {
  max-width: 100% !important;
  margin: 0  !important;
  padding: 0 !important;
}
.home .hero h1 {
    display: none;
}
.home img {
   transform: scale(0.8,0.8) !important;
   transition: all 1s!important;
}
.home img:hover {
   transform: scale(1)!important;
   transition:all 2s !important;
}
/* 阻止描述冒泡 */
.home .hero .description{
    pointer-events: none;
    cursor: default;
    opacity: 0.6;
}
.home .feature p {
    color: #476582 !important;
}
.home .hero .description {
    color: #476582 !important;
}
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    min-height: 10vh;
    background: transparent none repeat scroll!important;
    position: fixed;
    top: -120%;
    left: -1%;
}

@media screen and (max-width: 768px){
  .clock {
    margin-top: -35%
  }
}

@media screen and (max-width: 700px){
  .wrap {
    top:-107%;
    transform: scale(0.68,0.58);
  }
  .home img {    
    margin: 24% auto -6% auto !important;
  }
  .home .feature {
    width: 100%;
    text-align: center;
    color: rgb(71, 101, 130) !important;
    padding: 5px !important;
    margin: -12px;
    margin-left: 0px;
  }
  .clock {
    margin-top: 0%;
    background: rgba(0, 0, 0, 0) none repeat scroll !important;
  }
}
.clock {
  transition: all 2s;
}
.wrap {
  transition: all 2s;
}
.clock:hover {
  transform: scale(0.55) !important;
  transition: all 2s;
}
.wrap:hover {
  transform: scale(1.15) !important;
  transition: all 2s;
}

</style>
