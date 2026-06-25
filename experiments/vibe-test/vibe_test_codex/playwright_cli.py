from __future__ import annotations

import asyncio
import json
import os
import re
import shutil
import time
from pathlib import Path


class PlaywrightCLIError(RuntimeError):
    pass


class PlaywrightCLI:
    def __init__(self, session: str, artifacts_dir: Path, executable: str | None = None) -> None:
        self.session = session
        self.artifacts_dir = artifacts_dir
        default_executable = "npx.cmd" if os.name == "nt" else "npx"
        self.executable = executable or os.getenv("VIBE_TEST_PLAYWRIGHT_BIN", default_executable)

    async def _run(self, *args: str) -> dict:
        executable_name = Path(self.executable).name.lower()
        if executable_name in {"npx", "npx.cmd"}:
            cmd = [self.executable, "@playwright/cli", f"-s={self.session}", *args, "--json"]
        else:
            cmd = [self.executable, f"-s={self.session}", *args, "--json"]

        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, stderr = await proc.communicate()
        stdout_text = stdout.decode("utf-8", errors="replace").strip()
        stderr_text = stderr.decode("utf-8", errors="replace").strip()

        if proc.returncode != 0:
            try:
                payload = json.loads(stdout_text)
                message = payload.get("error", stdout_text)
            except Exception:
                message = stdout_text or stderr_text or f"Playwright CLI failed: {' '.join(cmd)}"
            raise PlaywrightCLIError(message)

        try:
            return json.loads(stdout_text)
        except json.JSONDecodeError as exc:
            raise PlaywrightCLIError(f"Invalid Playwright CLI JSON output: {stdout_text}") from exc

    async def open(self, url: str) -> dict:
        return await self._run("open", url)

    async def goto(self, url: str) -> dict:
        return await self._run("goto", url)

    async def snapshot(self) -> str:
        payload = await self._run("snapshot")
        return payload.get("snapshot", "")

    async def click(self, ref: str) -> dict:
        return await self._run("click", ref)

    async def fill(self, ref: str, text: str) -> dict:
        return await self._run("fill", ref, text)

    async def press(self, key: str) -> dict:
        return await self._run("press", key)

    async def console(self) -> str:
        payload = await self._run("console")
        return payload.get("result", "")

    async def requests(self) -> str:
        payload = await self._run("requests")
        return payload.get("result", "")

    async def resize(self, width: int, height: int) -> dict:
        return await self._run("resize", str(width), str(height))

    async def screenshot(self) -> str:
        payload = await self._run("screenshot")
        result = payload.get("result", "")
        match = re.search(r"\((?P<path>[^)]+\.png)\)", result)
        if not match:
            raise PlaywrightCLIError(f"Could not parse screenshot path from: {result}")
        file_path = Path(match.group("path"))
        if not file_path.is_absolute():
            file_path = Path.cwd() / file_path
        if not file_path.exists() or file_path.stat().st_size == 0:
            raise PlaywrightCLIError(f"Screenshot file missing or empty: {file_path}")
        self.artifacts_dir.mkdir(parents=True, exist_ok=True)
        copied_path = self.artifacts_dir / f"{self.session}-{int(time.time() * 1000)}.png"
        shutil.copy2(file_path, copied_path)
        return str(copied_path)

    async def close(self) -> None:
        try:
            await self._run("close")
        except PlaywrightCLIError:
            pass
