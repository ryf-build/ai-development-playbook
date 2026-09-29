#!/usr/bin/env python3
"""Create a read-only snapshot for completion verification.

The script intentionally does not run project builds/tests or install dependencies.
It reports repository state and likely verification surfaces so an agent can choose
bounded checks from the repository's own authority.
"""

from __future__ import annotations

import json
import subprocess
from pathlib import Path


MANIFESTS = [
    "package.json", "pnpm-workspace.yaml", "yarn.lock", "package-lock.json",
    "pnpm-lock.yaml", "pyproject.toml", "requirements.txt", "Pipfile",
    "poetry.lock", "go.mod", "Cargo.toml", "pom.xml", "build.gradle",
    "build.gradle.kts", "Gemfile", "composer.json", "Makefile", "Taskfile.yml",
]
CI_DIRS = [".github/workflows", ".gitlab-ci.yml", "azure-pipelines.yml", ".circleci"]
MARKERS = ("TODO", "FIXME", "HACK", "TEMP", "PLACEHOLDER")


def run(*args: str) -> tuple[int, str]:
    p = subprocess.run(args, text=True, capture_output=True, check=False)
    output = (p.stdout or "").strip()
    if p.stderr and not output:
        output = p.stderr.strip()
    return p.returncode, output


def git_text(*args: str) -> str | None:
    code, out = run("git", *args)
    return out if code == 0 else None


def existing(root: Path, values: list[str]) -> list[str]:
    return [v for v in values if (root / v).exists()]


def changed_files() -> list[str]:
    values: set[str] = set()
    for args in [
        ("diff", "--name-only"),
        ("diff", "--cached", "--name-only"),
        ("ls-files", "--others", "--exclude-standard"),
    ]:
        out = git_text(*args)
        if out:
            values.update(line.strip() for line in out.splitlines() if line.strip())
    return sorted(values)


def scan_markers(root: Path, paths: list[str]) -> list[dict[str, object]]:
    findings: list[dict[str, object]] = []
    for rel in paths[:500]:
        p = root / rel
        if not p.is_file() or p.stat().st_size > 1_000_000:
            continue
        try:
            text = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        hits = []
        for i, line in enumerate(text.splitlines(), 1):
            upper = line.upper()
            if any(marker in upper for marker in MARKERS):
                hits.append({"line": i, "text": line.strip()[:200]})
                if len(hits) >= 10:
                    break
        if hits:
            findings.append({"path": rel, "hits": hits})
    return findings


def main() -> int:
    root_text = git_text("rev-parse", "--show-toplevel")
    if not root_text:
        print(json.dumps({"error": "not a git repository"}, ensure_ascii=False, indent=2))
        return 2

    root = Path(root_text).resolve()
    branch = git_text("branch", "--show-current") or "DETACHED_OR_UNKNOWN"
    head = git_text("rev-parse", "HEAD") or "UNKNOWN"
    status = git_text("status", "--short") or ""
    changed = changed_files()

    payload = {
        "repository_root": str(root),
        "branch": branch,
        "head": head,
        "working_tree_status": status.splitlines() if status else [],
        "changed_files": changed,
        "manifests": existing(root, MANIFESTS),
        "ci_surfaces": existing(root, CI_DIRS),
        "changed_file_markers": scan_markers(root, changed),
        "notes": [
            "Read-only snapshot: no build, test, install, migration, or deployment command was run.",
            "Use repository-defined scripts/CI to choose verification commands.",
        ],
    }
    print(json.dumps(payload, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
