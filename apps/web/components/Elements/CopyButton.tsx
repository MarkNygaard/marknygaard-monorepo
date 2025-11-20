import { cn } from "@workspace/common/cn"
import { Button } from "@workspace/ui/components/button"
import { CheckIcon, CopyIcon } from "lucide-react"
import type { ComponentProps } from "react"
import useClipboard from "@/hooks/useClipboard"

interface CopyButtonProps extends Omit<ComponentProps<typeof Button>, "onClick"> {
  value: string
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { copy, copied } = useClipboard()

  const handleCopy = () => {
    copy(value)
  }

  return (
    <Button
      className={cn(
        "group absolute top-0 right-0 m-2 rounded-sm hover:border-2 group-hover:border-zinc-500 dark:border-zinc-500 dark:group-hover:border-zinc-400",
        className,
      )}
      size="icon"
      variant="outline"
      onClick={handleCopy}
    >
      <CheckIcon
        className="absolute scale-50 text-zinc-300 opacity-0 transition-transform-opacity data-[visible=true]:scale-100 data-[visible=true]:opacity-100 dark:text-zinc-500"
        data-visible={copied}
        size={16}
      />
      <CopyIcon
        className="absolute scale-50 text-zinc-300 opacity-0 transition-transform-opacity group-hover:text-zinc-500 data-[visible=true]:scale-100 data-[visible=true]:opacity-100 dark:text-zinc-500 dark:group-hover:text-zinc-400"
        data-visible={!copied}
        size={16}
      />
    </Button>
  )
}
