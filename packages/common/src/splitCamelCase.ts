export function splitCamelCase(name: string): string {
  const titleTemp = name.replace(/([A-Z])/g, " $1")
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1)
}
