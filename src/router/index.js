import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: resolve => require(["../views/home/Home.vue"], resolve)
  },
  {
    path: "/articles/:articleId",
    component: resolve => require(["../views/article/Article.vue"], resolve)
  },
  {
    path: "/archives",
    component: resolve => require(["../views/archive/Archive.vue"], resolve),
    meta: {
      title: "归档"
    }
  },
  {
    path: "/albums",
    component: resolve => require(["../views/album/Album.vue"], resolve),
    meta: {
      title: "相册"
    }
  },
  {
    path: "/talks",
    component: resolve => require(["../views/talk/Talk.vue"], resolve),
    meta: {
      title: "说说"
    }
  },
  {
    path: "/talks/:talkId",
    component: resolve => require(["../views/talk/TalkInfo.vue"], resolve),
    meta: {
      title: "说说"
    }
  },
  {
    path: "/albums/:albumId",
    component: resolve => require(["../views/album/Photo.vue"], resolve)
  },
  {
    path: "/tags",
    component: resolve => require(["../views/tag/Tag.vue"], resolve),
    meta: {
      title: "标签"
    }
  },
  {
    path: "/categories",
    component: resolve => require(["../views/category/Category.vue"], resolve),
    meta: {
      title: "分类"
    }
  },
  {
    path: "/categories/:categoryId",
    component: resolve => require(["../views/article/ArticleList.vue"], resolve)
  },
  {
    path: "/tags/:tagId",
    component: resolve => require(["../views/article/ArticleList.vue"], resolve)
  },
  {
    path: "/friendLinks",
    component: resolve =>
      require(["../views/friendLink/FriendLink.vue"], resolve),
    meta: {
      title: "友链列表"
    }
  },
  {
    path: "/about",
    component: resolve => require(["../views/about/About.vue"], resolve),
    meta: {
      title: "关于我"
    }
  },
  {
    path: "/message",
    component: resolve => require(["../views/message/Message.vue"], resolve),
    meta: {
      title: "留言板"
    }
  },
  {
    path: "/user",
    component: resolve => require(["../views/user/User.vue"], resolve),
    meta: {
      title: "个人中心"
    }
  },
  {
    path: "/social/callback",
    component: () => import("../components/SocialLogin.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
