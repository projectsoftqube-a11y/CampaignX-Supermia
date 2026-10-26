/**
 * Injects a JSON-LD graph into the page.
 *
 * `<` is escaped so a value containing `</script>` cannot close the tag
 * early and inject markup. JSON.stringify alone does not do this — it is
 * valid JSON either way, and the browser's HTML parser sees the closing tag
 * before the JSON parser ever runs.
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

function serialize(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from our own config, and `<` is escaped above.
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}
