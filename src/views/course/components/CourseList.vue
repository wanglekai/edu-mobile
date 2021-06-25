<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-cell
        v-for="item of list"
        :key="item.id">
        <div class="course-img">
          <!-- img -->
          <img :src="item.courseImgUrl" :alt="'测试上架课程的时候都不检查一下封面的吗, ' + item.courseName" />
        </div>
        <div class="course-info">
          <h3>{{ item.courseName }}</h3>
          <p>{{ item.brief }}</p>
          <div>
            <span class="discounts">￥ {{ item.discounts }}</span>
            <s v-show="item.price!=null" >￥ {{ item.price }}</s>
          </div>
        </div>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { getQueryCourses } from '@/services/course'

export default {
  name: 'CourseList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      reqData: {
        currentPage: 0,
        pageSize: 10,
        status: 1
      }
    }
  },
  methods: {
    async onLoad () {
      if (this.finished) {
        this.list = []
        this.refreshing = false
      }
      this.reqData.currentPage++
      const { data } = await getQueryCourses(this.reqData)
      if (data.code === '000000') {
        this.list.push(...data.data.records)
      }
      this.loading = false
      if (data.data.records.length < 10) {
        this.finished = true
      }
    },
    async onRefresh () {
      // 清空列表数据
      this.reqData.currentPage = 1

      const { data } = await getQueryCourses(this.reqData)
      if (data.code === '000000' && data.data && data.data.records && data.data.records.length !== 0) {
        this.list = data.data.records
        this.refreshing = false
        this.$toast.success('刷新成功')
      }
      this.finished = false
    }
  }
}
</script>
<style lang="scss" scoped>
h3, p {
  margin: 0;
  padding: 0;
}
.van-cell__value {
  display: flex;
  .course-img {
    width: 20%;
    height: 100px;
    border-radius: 6px;
    overflow: hidden;
    img {
      width: auto;
      height: inherit;
    }
  }
  .course-info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    p {
      margin-top: 2px;
      flex-grow: 1;
    }
    span.discounts {
      color: rgb(255, 104, 34);
    }
    s {
      margin-left: 10px;
    }
  }
}
</style>
