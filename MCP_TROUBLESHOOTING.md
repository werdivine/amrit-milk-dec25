# MCP Server Troubleshooting Guide

This document provides solutions for common issues encountered with Model Context Protocol (MCP) servers, particularly the fetch server.

## Common Issues and Solutions

### Issue: "context deadline exceeded" Error
**Error Message:** `failed to initialize MCP client for @modelcontextprotocol/fetch: transport error: context deadline exceeded`

#### Solution 1: Update MCP Configuration
The issue may be caused by timeout issues. We've added a timeout parameter to the fetch server configuration:

```json
"fetch": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch@latest", "--timeout", "30000"],
  "type": "stdio"
}
```

#### Solution 2: Check uvx Installation
Try installing and running the server with a different approach:

```bash
# Clear uv cache first
uv cache clean

# Try running the server directly
npx @modelcontextprotocol/server-fetch@latest
```

#### Solution 3: Alternative Installation Methods
If the `uvx` command fails, try using npx instead:

```bash
npx @modelcontextprotocol/server-fetch@latest
```

#### Solution 4: Network and Path Issues
The error may be related to path resolution issues. If using Windows, try:

1. Run as Administrator
2. Check if antivirus software is blocking temporary paths
3. Ensure your temp directory has sufficient space and permissions

### Issue: Dependency Installation Problems
**Error:** `Failed to install: httpcore-1.0.9-py3-none-any.whl (httpcore==1.0.9)`

#### Solution:
1. Update uv to the latest version:
```bash
uv self update
```

2. Clean the cache:
```bash
uv cache clean
```

3. Try with explicit versions:
```bash
uvx --refresh mcp-server-fetch==2025.4.7
```

## Additional Steps

### 1. Verify Your Setup
Check that you have the latest version of uv installed:
```bash
uv --version
```

### 2. Check Environment Variables
Ensure your PATH includes necessary tools:
- Node.js and npm
- uv (if using uvx)
- Python (for some MCP servers)

### 3. Verify MCP Configuration
Make sure your [mcp.json](file:///c:/IDE-PROJECTS/ANTIGRAVITY/PATHAK/projects/amrit-wp-nextjs/mcp.json) file is properly formatted and accessible.

## Prevention Tips

1. **Regular Updates:** Keep your MCP packages updated to avoid compatibility issues.
2. **Network Stability:** Ensure stable internet connection during installation.
3. **Permissions:** Run with appropriate permissions when needed.
4. **Disk Space:** Ensure sufficient disk space in temp/cache directories.

## Further Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.dev/)
- [Troubleshooting Official Guide](https://help.aliyun.com/document_detail/2922563.html)

## Support

If the issue persists, consider:
1. Checking the official MCP documentation
2. Creating an issue in the respective GitHub repository
3. Consulting with your development team for project-specific configurations