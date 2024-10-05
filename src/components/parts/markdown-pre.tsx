import type { ClassAttributes, HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const MarkdownPre = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> & HTMLAttributes<HTMLPreElement> & ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps;
  const classList = className ? className.split(":") : [];
  const language = classList[0]?.replace("language-", "");
  const fileName = classList[1];

  return (
    <>
      {fileName && (
        <div>
          <span>{fileName}</span>
        </div>
      )}
      <SyntaxHighlighter language={language} style={dracula}>
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </>
  );
};
