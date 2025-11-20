"use client"

import { cn } from "@workspace/common/cn"

import { useTheme } from "next-themes"
import { Highlight, type Language } from "prism-react-renderer"
import { useEffect, useMemo, useState } from "react"
import { CopyButton } from "./CopyButton"

function usePrismTheme() {
  const lightCodeTheme = require("prism-react-renderer").themes.nightOwlLight
  const darkCodeTheme = require("prism-react-renderer").themes.nightOwl

  const { theme } = useTheme()
  const lightModeTheme = lightCodeTheme
  const darkModeTheme = darkCodeTheme || lightModeTheme
  const prismTheme = theme === "light" ? lightModeTheme : darkModeTheme

  const [finalTheme, setFinalTheme] = useState<typeof prismTheme | null>(null)

  useEffect(() => {
    setFinalTheme(prismTheme)
  }, [prismTheme])

  return finalTheme
}

export default function SyntaxHighlight({
  code,
  language,
  showLineNumbers,
  highlightLines = [],
}: {
  code: string
  language: Language
  showLineNumbers?: boolean
  highlightLines?: number[]
}) {
  const linesCount = useMemo(() => code.split(/\r\n|\r|\n/).length, [code])

  const currentTheme = usePrismTheme()
  const [hydratedStyle, setHydratedStyle] = useState<React.CSSProperties | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setHydratedStyle(currentTheme?.plain ?? {})
    setIsHydrated(true)
  }, [currentTheme])

  return (
    <Highlight theme={currentTheme || { plain: {}, styles: [] }} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "group relative overflow-hidden whitespace-pre-wrap rounded-sm p-2 text-xs",
            className,
          )}
          style={hydratedStyle ?? {}}
        >
          <CopyButton value={code} className="cursor-pointer" />
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line, key: i })
            return (
              <div
                // biome-ignore lint: react/no-array-index-key: needed here for syntax highlighting
                key={i}
                className={cn(lineProps.className, {
                  "bg-white dark:bg-gray-700": highlightLines?.includes(i),
                })}
              >
                {showLineNumbers && (
                  <span className="select-none pr-3 opacity-20">
                    {`${i + 1}`.padStart(linesCount.toString().length, " ")}
                  </span>
                )}
                {line.map((token, key) => (
                  <span
                    // biome-ignore lint: react/no-array-index-key: needed here for syntax highlighting
                    key={key}
                    {...getTokenProps({ token })}
                    style={isHydrated ? getTokenProps({ token }).style : {}} // Avoid mismatch
                  />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
