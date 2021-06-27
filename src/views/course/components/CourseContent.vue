<template>
  <div class="course-content">
    <!-- 顶部广告轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img">
      </van-swipe-item>
    </van-swipe>
    <course-list :fetchData="fetchData" />
  </div>
</template>
<script>
import { getAllAds, getQueryCourses } from '@/services/course'
import CourseList from '@/components/CourseList'

export default {
  name: 'CourseContent',
  components: { CourseList },
  data () {
    return {
      // 轮播图图片列表
      adList: [],
      // 获取 轮播图列表的 key 值
      spaceKeys: '999'
    }
  },
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  },
  created () {
    this.loadAds()
  },
  methods: {
    fetchData (options) {
      return getQueryCourses(options)
    },
    async loadAds () {
      const { data } = await getAllAds(this.spaceKeys)
      // 保存广告信息
      this.adList = data.content[0].adDTOList
    }
  }
}
</script>

<style scoped>
.my-swipe {
  width: 100%;
}
.my-swipe .van-swipe-item {
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.my-swipe img {
  height: 170px;
}
.course-list {
  top: 220px;
  bottom: 60px;
}
</style>
