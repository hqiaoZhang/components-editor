<template>
  <div class="radio-group">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :class="{ active: valueFormat.includes(item.value) }"
        :title="item.label"
        @click="select(item)"
      >
        <slot :name="item.value">
          <i class="iconfont" v-if="item.icon" v-html="item.icon"></i> 
          <span v-else>{{ item.label }}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    list: {
      type: Array,
      default() {
        return [] // [{label:'',value:''}]
      }
    },
    value: {
      type: [String, Array],
      default: ''
    }
  },
  computed: {
    valueFormat() {
      return Array.isArray(this.value) ? this.value : [this.value]
    }
  },
  methods: {
    select(item) {
      let finalValue
      if (typeof this.value === 'string') {
        finalValue = this.value === item.value ? '' : item.value
        this.$emit('change', finalValue)
      } else if (Array.isArray(this.value)) {
        let operation = ''
        const value = item.value
        if (this.value.includes(item.value)) {
          operation = 'remove'
          finalValue = this.value.filter((i) => i !== item.value)
        } else {
          operation = 'add'
          finalValue = [...this.value, item.value]
        }
        finalValue._operation = operation
        finalValue._value = value
        this.$emit('change', finalValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.radio-group {
  width: 100%;
  ul {
    width: 100%; 
    display: flex;
    justify-content: space-between; 
    li {  
      i {
        font-size: 22px;
        color: #999;
      } 
      cursor: pointer;
      color: $colorText; 
    }
  }
}
</style>
