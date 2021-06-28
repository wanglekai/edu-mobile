<!-- 课程详情页 -->
<template>
  <div class="course-detail" :class="[{'pt': !course.isBuy}]">
    <van-nav-bar
      title="课程详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back() || $router.push('/')"/>
      <van-cell-group>
        <!-- 顶部图片 -->
        <van-cell class="header">
          <img :src="course.courseImgUrl" alt="">
        </van-cell>
        <!-- 课程信息 -->
        <van-cell class="course-info">
          <h2 class="name">{{course.courseName}}</h2>
          <p class="desc">{{course.brief}}</p>
          <div class="other">
            <span class="price">￥{{course.discounts}}</span>
            <span class="tag">{{course.sales}} 已购</span>
            <span class="tag" v-show="course.discountsTag">{{course.discountsTag}}</span>
          </div>
        </van-cell>
        <!-- 课程详情 内容 -->
        <van-cell class="content">
          <van-tabs sticky scrollspy>
            <van-tab title="详情">
              <div v-html="course.courseDescription"></div>
            </van-tab>
            <van-tab title="章节">
              <course-lesson
                v-for="item of courseSectionList"
                :key="item.id"
                :course="item"/>
            </van-tab>
          </van-tabs>
        </van-cell>
      </van-cell-group>
      <!-- 底部 或购买 -->
      <van-tabbar v-if="!course.isBuy">
        <div class="price">
          <span v-text="course.discountsTag"></span>
          <span class="discounts">￥{{ course.discounts }}</span>
          <span>￥{{ course.price }}</span>
        </div>
        <van-button type="primary" @click="handleBuy">立即购买</van-button>
      </van-tabbar>
  </div>
</template>
<script>
import CourseLesson from './components/course-lesson'
import { getCourseById, getSectionAndLesson } from '@/services/course'

export default {
  name: 'course-detail',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadCourse() // 加载课程详情
    this.loadLesson() // 加载章节信息
  },
  components: { CourseLesson },
  data () {
    return {
      // 课程信息
      course: {},
      // 章节信息
      courseSectionList: []
    }
  },
  methods: {
    async loadCourse () {
      const { data } = await getCourseById({ courseId: this.courseId })
      if (data.state === 1) {
        this.course = data.content
      }
    },
    async loadLesson () {
      const { data } = await getSectionAndLesson({ courseId: this.courseId })
      if (data.state === 1) {
        this.courseSectionList = data.content.courseSectionList
      }
    },
    handleBuy () {
      window.localStorage.setItem('current-course', JSON.stringify(this.course))
      this.$router.push({
        name: 'pay',
        params: {
          courseId: this.courseId
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.course-detail {
  .van-nav-bar {
    position: sticky;
    top: 0;
  }
  .header {
    height: 240px;
    padding: 0;
    img {
      width: 100%;
    }
  }
  .course-info {
    .other {
      display: flex;
      .price {
        flex: 1;
        font-size: 22px;
        color: rgb(243, 145, 17);
      }
      .tag {
        padding: 0 6px;
        margin-left: 10px;
        background-color: rgb(238, 238, 238);
        font-size: 12px;
        color: #666;
        border-radius: 4px;
      }
    }
  }
}
.pt {
  padding-bottom: 50px;
}
// 顶部购买
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
  }
  .discounts {
    font-size: 22px;
    color: rgb(243, 145, 17);
  }
  .van-button {
    width: 50%;
    height: 80%;
  }
}
</style>
