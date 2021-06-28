<!-- 课时信息 -->
<template>
  <div class="section-lesson-title">
    <h3>{{course.sectionName}}</h3>
    <van-cell-group class="lessons">
      <van-cell
        v-for="lesson of course.courseLessons"
        :key="lesson.id"
        :title="lesson.theme">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon v-if="lesson.canPlay" name="play" class="play" />
          <van-icon v-else name="lock" class="lock" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
export default {
  name: 'course-lesson',
  props: {
    course: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.van-cell::after,
[class*=van-hairline]::after {
  border: none;
}
.section-lesson-title {
  h3 {
    padding-left: 10px;
    font-weight: normal;
  }
  .van-icon {
    font-size: 20px;
  }
}
</style>
