import { Fragment, type ReactNode } from "react";
import { Link } from "wouter";

const linkClass = "font-medium text-primary underline-offset-2 hover:underline";
const bodyClass = "text-muted-foreground leading-relaxed";
const h2Class = "text-xl font-semibold text-foreground sm:text-2xl";
function stripMarkdownFormatting(text: string): string {
  return text.replace(/\*\*/g, "").replace(/^\*|\*$/g, "").trim();
}

function parseSectionHeading(line: string): string | null {
  const trimmed = line.trim();
  const numbered = trimmed.match(/^(\d+)\.\s*(?:#+\s*)?(?:\*\*)?(.+?)(?:\*\*)?\s*$/);
  if (numbered && (trimmed.includes("#") || trimmed.includes("**"))) {
    const title = stripMarkdownFormatting(numbered[2] ?? "");
    return `${numbered[1]}. ${title}`;
  }
  const h2 = trimmed.match(/^##\s+(?:\*\*)?(.+?)(?:\*\*)?\s*$/);
  if (h2) {
    return stripMarkdownFormatting(h2[1] ?? "");
  }
  const h3Numbered = trimmed.match(/^(\d+)\.\s*###\s*(.+)$/);
  if (h3Numbered) {
    return `${h3Numbered[1]}. ${stripMarkdownFormatting(h3Numbered[2] ?? "")}`;
  }
  return null;
}

function isTableRow(line: string): boolean {
  return line.trim().startsWith("|");
}

function isTableSeparator(line: string): boolean {
  return /^\|\s*:?-/.test(line.trim());
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isListItem(line: string): boolean {
  const t = line.trim();
  return t.startsWith("* ") || t.startsWith("- ");
}

function listItemText(line: string): string {
  return line.trim().replace(/^[*-]\s+/, "");
}

function isStandaloneBoldHeading(line: string): boolean {
  const t = line.trim();
  return t.startsWith("**") && t.endsWith("**") && !t.slice(2, -2).includes("**");
}

function isItalicOnlyParagraph(line: string): boolean {
  const t = line.trim();
  return t.startsWith("*") && t.endsWith("*") && !t.startsWith("**");
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] };

function parseBlocks(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  const skipMeta = (line: string): boolean => {
    const t = line.trim();
    if (!t || t === "&nbsp;") return true;
    if (/^#\s+\*\*/.test(t) || /^#\s+[A-Z]/.test(t)) return true;
    if (/^(\*?)?Last updated:/i.test(t)) return true;
    if (/^\*{0,2}\s*Dernière mise à jour\s*:/i.test(t)) return true;
    if (/^Effective Date:/i.test(t) && !t.includes("Section")) return true;
    if (/^Date d'entrée en vigueur\s*:/i.test(t) && !/section/i.test(t)) return true;
    if (/^This Affiliate Partner Agreement/i.test(t)) return false;
    if (/^La présente Entente de partenaire affilié/i.test(t)) return false;
    return false;
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw ?? "";

    if (
      skipMeta(line) &&
      (line.trim().startsWith("#") ||
        /Last updated|Dernière mise à jour/i.test(line) ||
        line.trim() === "&nbsp;")
    ) {
      i += 1;
      continue;
    }

    if (isTableRow(line)) {
      const headers = parseTableRow(line);
      i += 1;
      if (i < lines.length && isTableSeparator(lines[i] ?? "")) {
        i += 1;
      }
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i] ?? "")) {
        rows.push(parseTableRow(lines[i] ?? ""));
        i += 1;
      }
      blocks.push({ kind: "table", headers, rows });
      continue;
    }

    const sectionTitle = parseSectionHeading(line);
    if (sectionTitle && (line.includes("#") || /^\d+\./.test(line.trim()))) {
      blocks.push({ kind: "h2", text: sectionTitle });
      i += 1;
      continue;
    }

    if (isListItem(line)) {
      const items: string[] = [];
      while (i < lines.length && isListItem(lines[i] ?? "")) {
        items.push(listItemText(lines[i] ?? ""));
        i += 1;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (isStandaloneBoldHeading(line)) {
      blocks.push({ kind: "h3", text: line.trim().slice(2, -2) });
      i += 1;
      continue;
    }

    if (line.trim()) {
      const paragraphLines: string[] = [line.trim()];
      i += 1;
      while (i < lines.length) {
        const next = lines[i]?.trim() ?? "";
        if (
          !next ||
          next === "&nbsp;" ||
          isListItem(lines[i] ?? "") ||
          isTableRow(lines[i] ?? "") ||
          parseSectionHeading(lines[i] ?? "") ||
          isStandaloneBoldHeading(lines[i] ?? "")
        ) {
          break;
        }
        paragraphLines.push(next);
        i += 1;
      }
      blocks.push({ kind: "p", text: paragraphLines.join(" ") });
      continue;
    }

    i += 1;
  }

  return blocks;
}

function internalPath(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname !== "dermiciq.com" && url.hostname !== "www.dermiciq.com") {
      return null;
    }
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (path === "/privacy" || path === "/terms" || path === "/cookies") {
      return path;
    }
  } catch {
    /* relative or invalid */
  }
  return null;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let partIndex = 0;

  const pushText = (chunk: string) => {
    if (!chunk) return;
    nodes.push(<Fragment key={`${keyPrefix}-t-${partIndex++}`}>{chunk}</Fragment>);
  };

  while ((match = pattern.exec(text)) !== null) {
    pushText(text.slice(lastIndex, match.index));
    const token = match[1] ?? "";
    if (token.startsWith("**")) {
      nodes.push(
        <span key={`${keyPrefix}-b-${partIndex++}`} className="text-foreground font-medium">
          {token.slice(2, -2)}
        </span>,
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1] ?? "";
        const href = linkMatch[2] ?? "";
        const internal = internalPath(href);
        if (internal) {
          nodes.push(
            <Link key={`${keyPrefix}-l-${partIndex++}`} className={linkClass} href={internal}>
              {label}
            </Link>,
          );
        } else if (href.startsWith("mailto:")) {
          nodes.push(
            <a key={`${keyPrefix}-m-${partIndex++}`} className={linkClass} href={href}>
              {label}
            </a>,
          );
        } else {
          nodes.push(
            <a
              key={`${keyPrefix}-e-${partIndex++}`}
              className={linkClass}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>,
          );
        }
      }
    }
    lastIndex = match.index + token.length;
  }
  pushText(text.slice(lastIndex));

  return nodes.length > 0 ? nodes : [text];
}

function renderParagraph(text: string, index: number): ReactNode {
  const italic = isItalicOnlyParagraph(text);
  const cleaned = italic ? text.trim().slice(1, -1) : text;
  return (
    <p
      key={`p-${index}`}
      className={italic ? `${bodyClass} italic` : bodyClass}
    >
      {renderInline(cleaned, `p-${index}`)}
    </p>
  );
}

function renderList(items: string[], index: number): ReactNode {
  return (
    <ul key={`ul-${index}`} className="list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">
      {items.map((item, itemIndex) => (
        <li key={`ul-${index}-${itemIndex}`}>{renderInline(item, `ul-${index}-${itemIndex}`)}</li>
      ))}
    </ul>
  );
}

function renderTable(headers: string[], rows: string[][], index: number): ReactNode {
  return (
    <div key={`table-${index}`} className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {headers.map((header, headerIndex) => (
              <th key={`th-${index}-${headerIndex}`} className="py-2 pr-3 font-semibold text-foreground">
                {stripMarkdownFormatting(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {rows.map((row, rowIndex) => (
            <tr key={`tr-${index}-${rowIndex}`} className="border-b border-border/60 align-top">
              {row.map((cell, cellIndex) => (
                <td key={`td-${index}-${rowIndex}-${cellIndex}`} className="py-2 pr-3">
                  {renderInline(cell, `td-${index}-${rowIndex}-${cellIndex}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function extractLastUpdated(source: string): string | null {
  const patterns = [
    /Last updated:\s*(?:\*\*)?\s*([^\n]+)/i,
    /Dernière mise à jour\s*:\s*(?:\*\*)?\s*([^\n]+)/i,
  ];
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) {
      return match[1].replace(/\*\*/g, "").trim();
    }
  }
  return null;
}

export function renderLegalMarkdown(source: string): ReactNode {
  const blocks = parseBlocks(source);
  const sections: ReactNode[] = [];
  let current: ReactNode[] = [];
  let blockIndex = 0;

  const flush = () => {
    if (current.length === 0) return;
    sections.push(
      <section key={`section-${sections.length}`} className="space-y-3">
        {current}
      </section>,
    );
    current = [];
  };

  for (const block of blocks) {
    if (block.kind === "h2") {
      flush();
      current.push(
        <h2 key={`h2-${blockIndex++}`} className={h2Class}>
          {block.text}
        </h2>,
      );
      continue;
    }

    if (block.kind === "h3") {
      current.push(
        <p key={`h3-${blockIndex++}`} className="text-foreground font-medium">
          {block.text}
        </p>,
      );
      continue;
    }

    if (block.kind === "p") {
      current.push(renderParagraph(block.text, blockIndex++));
      continue;
    }

    if (block.kind === "ul") {
      current.push(renderList(block.items, blockIndex++));
      continue;
    }

    if (block.kind === "table") {
      current.push(renderTable(block.headers, block.rows, blockIndex++));
    }
  }

  flush();
  return <>{sections}</>;
}

export function skipDocumentPreamble(source: string): string {
  const lines = source.split("\n");
  const startIndex = lines.findIndex((line) => {
    const t = line.trim();
    if (/^\d+\.\s*(#+|##|###)/.test(t)) return true;
    if (/^This Affiliate Partner Agreement/i.test(t)) return true;
    if (/^La présente Entente de partenaire affilié/i.test(t)) return true;
    if (/^17576005 CANADA INC/i.test(t)) return true;
    return false;
  });
  if (startIndex <= 0) return source;
  return lines.slice(startIndex).join("\n");
}
