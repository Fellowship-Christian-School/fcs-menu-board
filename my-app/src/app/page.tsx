import { MenuDisplay } from '@/components/MenuDisplay'
import settings from '../settings.json'
import { Settings } from '@/types/menu'

export default function Page() {
  return (
    <div className="w-full max-w-none">
      <MenuDisplay settings={settings as Settings} />
    </div>
  )
}

