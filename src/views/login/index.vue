<!-- 登录页 -->
<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="goBack" />
    <van-form @submit="onLogin">
      <van-field
        v-model="phone"
        name="phone"
        label="手机号名"
        placeholder="请输入手机号"
        :rules="phonerules"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="pswRules"
      />
      <div style="margin: 16px;">
        <van-button
          round block
          type="info"
          :loading="loading"
          size="small"
          loading-text="正在登录"
          native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { login } from '@/services/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      loading: false,
      phone: '18201288771',
      password: '111111',
      phonerules: [
        { required: true, message: '请输入手机号码' },
        { pattern: /^1\d{10}$/, message: '手机号码格式错误' }
      ],
      pswRules: [
        { required: true, message: '请填写密码' },
        {
          validator (value) {
            return /^[a-zA-Z0-9_]{6,12}$/.test(value)
          },
          message: '密码格式错误, 格式为：6-12 位，字母数字或下划线'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async onLogin (values) {
      this.loading = true
      const { data } = await login(values)
      switch (data.state) {
        case 1:
          this.$store.commit('setUser', data.content)
          this.$toast.success('登录成功')
          // 登录成功后 跳转到 之前需要鉴权的页面，没有直接到 首页
          this.$router.push(this.$route.query.redirect || '/')
          break
        case 201:
          this.$toast.fail('非法的手机号')
          break
        case 202:
          this.$toast.fail('非法的手机号')
          break
        case 203:
          this.$toast.fail('密码或者验证码为空')
          break
        case 204:
          this.$toast.fail('验证码过期')
          break
        case 205:
          this.$toast.fail('手机号或者密码错误')
          break
        case 206:
          this.$toast.fail('登录失败')
          break
        case 207:
          this.$toast.fail('验证码错误')
          break
        default:
          this.$toast.fail(data.message)
      }
      this.loading = false
    }
  }
}
</script>
<style lang='scss' scoped>
.login {
  height: 100vh;
}
</style>
