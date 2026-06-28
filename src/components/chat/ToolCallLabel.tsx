interface ToolCallLabelProps {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
}

function basename(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

function getLabel({ toolName, args, state }: ToolCallLabelProps): string {
  const path = typeof args.path === "string" ? args.path : "";
  const command = typeof args.command === "string" ? args.command : "";
  const name = basename(path);
  const done = state === "result";
  const suffix = name ? ` ${name}` : " file";

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return done ? `Created${suffix}` : `Creating${suffix}`;
      case "str_replace":
      case "insert":
        return done ? `Edited${suffix}` : `Editing${suffix}`;
      case "view":
        return done ? `Read${suffix}` : `Reading${suffix}`;
      case "undo_edit":
        return done ? `Reverted${suffix}` : `Reverting${suffix}`;
      default:
        return done ? `Edited${suffix}` : `Editing${suffix}`;
    }
  }

  if (toolName === "file_manager") {
    const newPath = typeof args.new_path === "string" ? args.new_path : "";
    const newName = basename(newPath);
    switch (command) {
      case "rename":
        return done
          ? `Renamed ${name} → ${newName}`
          : `Renaming ${name} → ${newName}`;
      case "delete":
        return done ? `Deleted${suffix}` : `Deleting${suffix}`;
      default:
        return name || toolName;
    }
  }

  return toolName;
}

export function ToolCallLabel(props: ToolCallLabelProps) {
  const path = typeof props.args.path === "string" ? props.args.path : undefined;
  return (
    <span className="text-neutral-700" title={path}>
      {getLabel(props)}
    </span>
  );
}
