<!-- 学习页面 -->
<template>
  <div>
    <van-nav-bar
      title="已购课程" />
    <course-list :fetchData="fetchData"/>
    <layout-footer></layout-footer>
  </div>
</template>
<script>
import CourseList from '@/components/CourseList'
import LayoutFooter from '@/components/LayoutFooter'
import { getPurchaseCourse } from '@/services/course'

export default {
  name: 'LearnIndex',
  components: {
    CourseList,
    LayoutFooter
  },
  methods: {
    fetchData (options) {
      return getPurchaseCourse(options)
    }
  }
}
</script>
<style lang='scss' scoped>
.course-list {
  top: 50px;
  bottom: 60px;
}
</style>
