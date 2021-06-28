<template>
  <div>
    <van-nav-bar
      title="课时内容"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />
    <div id="player-con" class="prism-player">{{ lessonId }}</div>
  </div>
</template>
<script>
import { videoPlayInfo } from '@/services/course'

export default {
  name: 'CourseVideo',
  props: {
    lessonId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadLesson()
  },
  methods: {
    async loadLesson () {
      const { data } = await videoPlayInfo({ lessonId: this.lessonId })
      // console.log(data)
      const player = new window.Aliplayer({
        id: 'player-con',
        qualitySort: 'asc',
        vid: data.content.fileId,
        playauth: data.content.playAuth,
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created', player)
      })
      console.log(player)
    }
  }
}
</script>
<style>
.prism-player {
  height: 500px;
}
</style>
