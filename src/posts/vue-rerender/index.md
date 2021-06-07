---
title: Forcing Vue Rerender for Faster Tests
date: 2021-06-07
tags: [Vue, JavaScript, Web, Testing]
draft: false
---

I'm becoming a big fan of E2E tests with Cypress, but reloading a web application between each test can be fairly slow. We can avoid a lot of overhead by skipping page reload and instead forcing the root Vue instance to rerender fresh.

> Disclaimer: This can introduce some issues with stale state (like in Vuex) hanging around between tests. Also this is more of a hack than anything else, but it might be useful in some situations.

The best way to do this within the context of a Vue component would be to use a key on the top-level component, but what about in the browser at runtime? Assuming we have a Vue component with the id `app`, we can do the following:

```javascript
async function rerenderVue() {
  const root = document.getElementById('app').__vue__.$root
  const vnode = root._vnode
  vnode.key = vnode.key ? vnode.key + 1 : 1
  root.$forceUpdate()
  await root.$nextTick()
}
```

You might make a Cypress command to call between tests, like this.

```javascript
/** Reload app without page reload by changing the key on the root Vue instance. */
Cypress.Commands.add('reloadVue', () => {
  Cypress.log({
    displayName: 'reload',
    message: 'forcing Vue rerender',
  })
  cy.get('#app', { log: false }).then(async ($app) => {
    const app = $app[0]
    // Changing key forces remount
    const vnode = app.__vue__.$root._vnode
    vnode.key = vnode.key ? vnode.key + 1 : 1
    app.__vue__.$root.$forceUpdate()
    await app.__vue__.$root.$nextTick()
  })
})
```
