---
title: Using Storybook with Vue
date: 2021-02-18
tags: [Vue, JavaScript]
draft: false
---

[Storybook](https://storybook.js.org/) is a fantastic tool for developing UI components, but there are a few tricks to pairing it with Vue.

Here's a collection of solutions to the issues I ran into while building a small component library with Vue.

> Note this is likely to change after the time of writing: March 2021 / Storybook 6.1.

## Documentation Generation

Storybook's built-in Docs addon can generate documentation from your component's code and comments, but it's not obvious how to document some nvue features like slots or events. Under the hood, Storybook uses [vue-docgen-api](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api) to parse components. You can easily see how to markup your components for Storybook by looking at its [README](https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api#using-jsdoc-tags).

## Parameterizing the Vue Instance via CSF

It's not explicitly said in any of the Storybook documentation, but the Component Story Format's extra properties will become the internals of the Vue instance containing your component. This means it's possible to add data, methods, computed properties, etc. to your component's parent. This can solve some problems with more complex props and interactions. See the next section for specifics.

## Inputs and `v-model`

The above can be used to make inputs and components that make use of v-model behave as expected.

Storybook's controls don't trigger the required events for `v-model` and the controlled value can't be updated by the component. Instead, put the value in the root instance's `data` and disable controls for it.

```javascript
import MyInput from '../src/components/MyInput.vue'

export default {
  title: 'Components/MyInput',
  component: MyInput,
  argTypes: {
    value: {
      table: { disable: true },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  data() {
    return { value: '' }
  },
  components: { MyInput },
  template: `<MyInput v-bind="$props" v-model="value" />`,
})

export const Primary = Template.bind({})
```

## Using Actions

Storybook provides Actions as a way to visualize component events, but the way to use them with Vue [hasn't yet made it into the documentation](https://github.com/storybookjs/storybook/discussions/11372#discussioncomment-32947):

```javascript
import { action } from '@storybook/addon-actions'

import HelloWorld from './hello-world'

export default {
  title: 'Atoms / Hello World',
}

export const Default = () => ({
  components: { HelloWorld },
  template: '<hello-world @click="action"></hello-world>',
  methods: { action: action('clicked') },
})
```
