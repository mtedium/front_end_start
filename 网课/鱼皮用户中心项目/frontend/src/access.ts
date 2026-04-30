import router from '@/router'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { message } from 'ant-design-vue'

/**
 * 全局路由守卫，用于控制访问权限
 */
router.beforeEach((to, from, next) => {
  const loginUserStore = useLoginUserStore()
  const loginUser = loginUserStore.loginUser
  const toUrl = to.fullPath
  // console.log('全局路由守卫：', loginUser)
  if (toUrl.startsWith('/admin')) {
    if (!loginUser || loginUser.userRole !== 1) {
      message.error('您没有访问权限')
      next(`/user/login?redirect=${to.fullPath}`)
      return
    }
  }
  next()
})
