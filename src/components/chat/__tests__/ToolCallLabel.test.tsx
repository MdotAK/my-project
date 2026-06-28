import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallLabel } from "../ToolCallLabel";

afterEach(() => {
  cleanup();
});

// str_replace_editor — create
test("str_replace_editor create in-progress", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "create", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("str_replace_editor create complete", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "create", path: "/src/Button.tsx" }} state="result" />);
  expect(screen.getByText("Created Button.tsx")).toBeDefined();
});

// str_replace_editor — str_replace
test("str_replace_editor str_replace in-progress", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "str_replace", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Editing Button.tsx")).toBeDefined();
});

test("str_replace_editor str_replace complete", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "str_replace", path: "/src/Button.tsx" }} state="result" />);
  expect(screen.getByText("Edited Button.tsx")).toBeDefined();
});

// str_replace_editor — insert
test("str_replace_editor insert in-progress", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "insert", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Editing Button.tsx")).toBeDefined();
});

// str_replace_editor — view
test("str_replace_editor view in-progress", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "view", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Reading Button.tsx")).toBeDefined();
});

test("str_replace_editor view complete", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "view", path: "/src/Button.tsx" }} state="result" />);
  expect(screen.getByText("Read Button.tsx")).toBeDefined();
});

// str_replace_editor — undo_edit
test("str_replace_editor undo_edit in-progress", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "undo_edit", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Reverting Button.tsx")).toBeDefined();
});

test("str_replace_editor undo_edit complete", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "undo_edit", path: "/src/Button.tsx" }} state="result" />);
  expect(screen.getByText("Reverted Button.tsx")).toBeDefined();
});

// str_replace_editor — unknown command
test("str_replace_editor unknown command falls back to Editing", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "unknown", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Editing Button.tsx")).toBeDefined();
});

// file_manager — rename
test("file_manager rename in-progress", () => {
  render(<ToolCallLabel toolName="file_manager" args={{ command: "rename", path: "/src/Old.tsx", new_path: "/src/New.tsx" }} state="call" />);
  expect(screen.getByText("Renaming Old.tsx → New.tsx")).toBeDefined();
});

test("file_manager rename complete", () => {
  render(<ToolCallLabel toolName="file_manager" args={{ command: "rename", path: "/src/Old.tsx", new_path: "/src/New.tsx" }} state="result" />);
  expect(screen.getByText("Renamed Old.tsx → New.tsx")).toBeDefined();
});

// file_manager — delete
test("file_manager delete in-progress", () => {
  render(<ToolCallLabel toolName="file_manager" args={{ command: "delete", path: "/src/Button.tsx" }} state="call" />);
  expect(screen.getByText("Deleting Button.tsx")).toBeDefined();
});

test("file_manager delete complete", () => {
  render(<ToolCallLabel toolName="file_manager" args={{ command: "delete", path: "/src/Button.tsx" }} state="result" />);
  expect(screen.getByText("Deleted Button.tsx")).toBeDefined();
});

// unknown tool
test("unknown tool renders raw tool name", () => {
  render(<ToolCallLabel toolName="some_other_tool" args={{}} state="call" />);
  expect(screen.getByText("some_other_tool")).toBeDefined();
});

// empty path — no trailing space
test("empty path falls back to 'file' suffix", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "create" }} state="call" />);
  expect(screen.getByText("Creating file")).toBeDefined();
});

// basename extraction
test("extracts basename from deep path", () => {
  render(<ToolCallLabel toolName="str_replace_editor" args={{ command: "create", path: "/src/components/ui/Button.tsx" }} state="call" />);
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});
