<template>
  <div>
    <!-- 评论详情信息 -->
    <van-cell :title="review.username" :label="review.content" :icon="review.userAvatar">
      {{ review.createTime }}
    </van-cell>

    <!-- 查看回复按钮 -->
    <van-button type="primary" @click="toggleReplies">
      查看回复 ({{ review.replies.length }})
    </van-button>

    <!-- 回复列表 -->
    <van-collapse v-model="showReplies" accordion>
      <van-collapse-item v-for="(reply, index) in review.replies" :key="index" :title="reply.username"
        @click="goToReplyDetail(reply)"
      >
        {{ reply.content }}
        <div slot="value">{{ reply.createTime }}</div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {}, // 从路由参数中获取评论数据
      showReplies: false, // 控制回复列表的显示与隐藏
    };
  },
  methods: {
    toggleReplies() {
      this.showReplies = !this.showReplies;
    },
    goToReplyDetail(reply) {
      this.$router.push({ path: '/review/:id', name: 'reviewDetail', params: { id: reply.id } });
    },
  },
  mounted() {
    const { reviewId } = this.$route.params;
    this.review = this.fetchReviewDetail(reviewId);
  },
  methods: {
    fetchReviewDetail(reviewId) {
      return {
        username: '评论者',
        content: '评论内容',
        userAvatar: '评论者头像',
        createTime: '评论时间',
        replies: [
          {
            id: 1,
            username: '回复者1',
            content: '回复内容1',
            createTime: '回复时间1',
          },
          {
            id: 2,
            username: '回复者2',
            content: '回复内容2',
            createTime: '回复时间2',
          },
          // 其他回复
        ],
      };
    },
  },
};
</script>
