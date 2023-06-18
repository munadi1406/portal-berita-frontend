
import { Parser } from "html-to-react"

export default function HtmlToText(content) {
  return Parser().parse(content)
}
