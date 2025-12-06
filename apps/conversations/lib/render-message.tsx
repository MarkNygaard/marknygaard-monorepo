import Link from "next/link"

const PUNCTUATION_REGEX = /[).,;:!?]+$/
const DOMAIN_PATTERN = /^https?:\/\/(www\.)?marknygaard\.dk\//

export function renderMessageWithLinks(text: string): React.ReactNode {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match = urlRegex.exec(text)

  while (match !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Remove trailing punctuation from URL
    let url = match[0]
    let trailingPunctuation = ""
    const punctuationMatch = url.match(PUNCTUATION_REGEX)
    if (punctuationMatch) {
      trailingPunctuation = punctuationMatch[0]
      url = url.slice(0, -trailingPunctuation.length)
    }

    // Add the URL as a clickable link
    const domainMatch = url.match(DOMAIN_PATTERN)

    if (domainMatch) {
      // Internal link - use Next.js Link
      const href = url.slice(domainMatch[0].length - 1)
      parts.push(
        <Link className="underline hover:opacity-80" href={href} key={`link-${match.index}`}>
          {url}
        </Link>
      )
    } else {
      // External link - use regular anchor tag
      parts.push(
        <a
          className="underline hover:opacity-80"
          href={url}
          key={`link-${match.index}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {url}
        </a>
      )
    }

    // Add the trailing punctuation as plain text
    if (trailingPunctuation) {
      parts.push(trailingPunctuation)
    }

    lastIndex = match.index + match[0].length
    match = urlRegex.exec(text)
  }

  // Add remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
