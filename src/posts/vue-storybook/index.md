---
title: Using Storybook with Vue
date: 2021-02-18
tags: [Vue, JavaScript]
---

#

## Doc gen

https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api

## Story Component

stories csf are mostly defining a vue component's internals

## Inputs and `v-model`

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

## Naming Stories
