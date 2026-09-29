#!/usr/bin/env python3
import json
import sys
from collections import Counter
from pathlib import Path


def load_jsonl(path: Path):
    rows = []
    for lineno, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError as exc:
            raise SystemExit(f"invalid JSON at line {lineno}: {exc}") from exc
    if not rows:
        raise SystemExit("no eval cases found")
    return rows


def percent(n, d):
    return "n/a" if d == 0 else f"{(100*n/d):.1f}%"


def main():
    path = Path(sys.argv[1] if len(sys.argv) > 1 else "cases.example.jsonl")
    rows = load_jsonl(path)

    routing_known = [r for r in rows if isinstance(r.get("expected_trigger"), bool) and isinstance(r.get("actual_trigger"), bool)]
    routing_correct = sum(r["expected_trigger"] == r["actual_trigger"] for r in routing_known)

    inv_expected = 0
    inv_met = 0
    unsupported = 0
    outcomes = Counter()

    for row in rows:
        expected = set(row.get("invariants_expected", []))
        met = set(row.get("invariants_met", []))
        inv_expected += len(expected)
        inv_met += len(expected & met)
        unsupported += int(row.get("unsupported_claims", 0))
        outcomes[str(row.get("outcome", "UNKNOWN"))] += 1

    print(f"CASES={len(rows)}")
    print(f"ROUTING_ACCURACY={percent(routing_correct, len(routing_known))}")
    print(f"INVARIANT_COVERAGE={percent(inv_met, inv_expected)}")
    print(f"UNSUPPORTED_CLAIMS={unsupported}")
    print("OUTCOMES=" + ",".join(f"{k}:{v}" for k, v in sorted(outcomes.items())))


if __name__ == "__main__":
    main()
