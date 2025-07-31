import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-gray-700",
          description: "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white hover:group-[.toast]:bg-blue-700",
          cancelButton:
            "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-800 hover:group-[.toast]:bg-gray-300 dark:group-[.toast]:bg-gray-700 dark:group-[.toast]:text-gray-200",
          closeButton:
            "group-[.toast]:text-gray-500 hover:group-[.toast]:text-gray-700 dark:group-[.toast]:text-gray-400 dark:hover:group-[.toast]:text-gray-200 group-[.toast]:text-lg group-[.toast]:font-bold",
        },
        duration: 3000,
      }}
      closeButton={true}
      {...props}
    />
  )
}

export { Toaster, toast } 