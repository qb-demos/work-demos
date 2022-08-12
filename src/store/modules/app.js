import { useDark, useToggle } from '@vueuse/core'

const useAppStore = defineStore(
  'app',
  {
    state: () => ({
      isDark: false,
      menuCollapse: false
    }),
    actions: {
      setTheme () {
        this.isDark = !this.isDark
        const elementDark = useDark()
        const toggleDark = useToggle(elementDark)

        if (this.isDark) {
          toggleDark(true)
        } else {
          toggleDark(false)
        }
      },
      setMenuCollapse (val) {
        if (val) {
          this.menuCollapse = val
        } else {
          this.menuCollapse = !this.menuCollapse
        }
      }
    }
  })

export default useAppStore
