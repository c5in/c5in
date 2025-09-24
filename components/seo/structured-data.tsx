import Script from 'next/script'

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Component to inject JSON-LD structured data into the page head
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  )
}

/**
 * Hook to combine multiple structured data objects
 */
export function combineStructuredData(...dataObjects: Record<string, unknown>[]): Record<string, unknown>[] {
  return dataObjects.filter(Boolean)
}