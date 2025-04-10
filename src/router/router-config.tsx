/**
 * Router List Config
 * @author songmm
 */

// createBrowserRouter 暂时不支持 hash 模式，所以使用 createHashRouter
import { createHashRouter, Navigate } from 'react-router-dom'
import { LazyImportComponent } from './router-load'
import { lazy } from 'react'

const HomeView = lazy(() => import('@/views/Home/HomeView'))
const NotFoundView = lazy(() => import('@/views/Error/NotFoundView'))
const SignView = lazy(() => import('@/views/Sign/SignView.tsx'))

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' replace />
  },
  // dashboard
  {
    path: '/dashboard',
    element: (
      <LazyImportComponent lazyChildren={HomeView} isRequiredAuth={false} />
    ),
    loader: () => {
      return Promise.resolve(true)
    }
  },
  // Sign
  {
    path: '/sign',
    element: (
      <LazyImportComponent
        lazyChildren={SignView}
        isRequiredAuth={false}
        title='登录'
      />
    )
  },
  // 404 Not Found
  {
    path: '*',
    element: (
      <LazyImportComponent
        lazyChildren={NotFoundView}
        isRequiredAuth={false}
        title='404'
      />
    )
  }
])

export default router
