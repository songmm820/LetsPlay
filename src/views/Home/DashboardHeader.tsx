/**
 * Views：Home Header
 * @author songmm
 */
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import classNames from 'classnames'
import Logo from '@/components/Logo/Logo.tsx'
import { Input } from '@arco-design/web-react'

const InputSearch = Input.Search

interface ITabItem {
  route: string
  label: string
}

function DashboardHeader() {
  // Hook for navigation
  const navigate = useNavigate()
  const location = useLocation()
  // 头部Tabs
  const tabs: ITabItem[] = []

  useEffect(() => {}, [])

  // 点击tab事件
  const handleClickTab = (tab: ITabItem) => {
    navigate(tab.route)
  }

  // Tabs
  const HeaderTabs = () => {
    return (
      <div className='flex items-center justify-center gap-[32px]'>
        {tabs.map((tab, index) => {
          return <HeaderTabItem tab={tab} key={index} />
        })}
      </div>
    )
  }

  // Tab item
  const HeaderTabItem = ({ tab }: { tab: ITabItem }) => {
    return (
      <div className='text-[#333] text-[15px] cursor-pointer'>
        <span
          className={classNames({
            'text-primary font-bold': location.pathname === tab.route
          })}
          onClick={() => handleClickTab(tab)}
        >
          {tab.label}
        </span>
      </div>
    )
  }

  return (
    <div className='bg-white w-full flex items-center pl-[24px] pr-[24px]'>
      {/* 左侧 */}
      <div className='h-[68px] flex items-center'>
        <div className='mr-[26px] flex items-center cursor-pointer'>
          <Logo size={50} />
          {/* 标题 */}
          <div className='text-[22px] ml-[8px] font-bold'>
            {import.meta.env.VITE_APP_TITLE}
          </div>
        </div>
        <HeaderTabs />
      </div>
      {/* 右侧 */}
      <div className='flex items-center'>
        <div className='w-[320px] mr-[12px]'>
          <InputSearch allowClear />
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
