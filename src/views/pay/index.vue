<template>
  <div class="pay-container">
    <van-nav-bar
      title="请支付"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />
    <van-cell-group>
      <van-cell class="course-info">
        <img :src="course.courseImgUrl" alt="'当前课程封面'">
        <div class="price-info">
          <div class="course-name" v-text="course.courseName"></div>
          <div class="discounts">￥ {{course.discounts}}</div>
        </div>
      </van-cell>
      <van-cell class="account-info">
        <div>购买信息</div>
        <div>购买课程后使用此账号登录【拉勾教育】学习课程</div>
        <div class="username">当前账号：{{ account }}</div>
      </van-cell>
    </van-cell-group>
    <van-cell class="pay-channel">
      <div>
        <p>支付方式</p>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell @click="radio = '1'">
              <!-- 将左侧标题设置为插槽，添加对应支付图标 -->
              <template #title>
                <img src="http://www.lgstatic.com/lg-app-fed/pay/images/wechat_b787e2f4.png" alt="">
                <span>微信支付</span>
              </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '2'">
              <template #title>
                <img src="http://www.lgstatic.com/lg-app-fed/pay/images/ali_ed78fdae.png" alt="">
                <span>支付宝支付</span>
              </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <van-button
        :loading="loading"
        @click="handlePay"
        loading-text="请稍后...">￥{{ course.discounts }} 立即支付</van-button>
    </van-cell>
  </div>
</template>
<script>
import {
  saveOrder,
  createOrder,
  getPayResult
} from '@/services/pay'

export default {
  name: 'PayIndex',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loading: false,
      course: {},
      radio: '1', // 支付方式
      orderNo: '' // 订单编号
    }
  },
  computed: {
    account () {
      const user = this.$store.state.user.organization
      return user.replace(/(\d{3})(\d{4})(\d{3})/g, '$1****$3')
    }
  },
  created () {
    this.loadCourse()
    this.loadOrder()
  },
  methods: {
    loadCourse () {
      this.course = JSON.parse(window.localStorage.getItem('current-course') || {})
    },
    async loadOrder () {
      // 创建订单
      const { data } = await saveOrder({ goodsId: this.courseId })
      // console.log(data)
      if (data.state === 1) {
        this.orderNo = data.content.orderNo
      } else {
        this.$toast(data.message)
      }
    },
    async handlePay () {
      this.loading = true
      // 发起支付
      const { data } = await createOrder({
        goodsOrderNo: this.orderNo,
        channel: this.radio === '1' ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.lagou.com/'
      })
      // 接收响应地址，并进行跳转
      window.location.href = data.content.payUrl

      const timer = setInterval(async () => {
        // 发起查询支付结果请求(此处使用)
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderNo
        })
        // 如果支付结果成功，清除定时器，并提示购买成功，跳回到学习页
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          this.loading = false
          this.$toast.success('购买成功！')
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-cell-group {
    background-color: #f8f9fa;
    .course-info {
      height: 170px;
      padding: 40px 20px 0;
      margin-bottom: 10px;
      box-sizing: border-box;
      .van-cell__value {
        display: flex;
      }
      img {
        width: 80px;
        height: 107px;
        border-radius: 10px;
      }
    }
    .price-info {
      height: 107px;
      padding: 5px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .course-name {
        font-size: 16px;
      }
      .discounts {
        font-size: 22px;
        font-weight: 700;
        color: #ff7452;
      }
    }
    .account-info {
      height: 120px;
      margin-bottom: 10px;
      div:nth-child(2) {
        font-size: 12px;
        color: #999;
      }
      .username {
        margin: 20px 0 10px;
        font-size: 16px;
      }
    }
  }
  // 支付方式
  .pay-channel {
    flex: 1;
    .van-cell__value {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .van-cell {
      padding: 20px 10px;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .van-cell__title {
      display: flex;
      align-items: center;
    }
    // 右侧 radio 选中颜色
    ::v-deep .van-radio__icon--checked .van-icon{
      background-color: #fbc546;
      border-color: #fbc546;
    }
    .van-button {
      background: linear-gradient(270deg,#faa83e,#fbc546);
      border-radius: 20px;
      margin-bottom: 5px;
      font-size: 18px;
    }
  }
}
</style>
