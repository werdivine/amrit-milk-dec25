# Development Container Setup for Antigravity IDE

This document explains how to set up a development container for your project and optimize the Antigravity IDE performance.

## Running VSCode/Antigravity-like IDE in Docker (code-server)

Since Antigravity is a VSCode fork, you can run a VSCode-like IDE in Docker using code-server, which provides a web-based VSCode experience:

### Prerequisites
- Docker Desktop installed and running

### Setup Instructions for code-server

1. **Build and Run the IDE Container**:
   ```bash
   docker-compose -f docker-compose.ide.yaml up -d --build
   ```

2. **Access the IDE**:
   - Open your browser and navigate to `http://localhost:8080`
   - Use the default password `amrit123` (change this in docker-compose.ide.yaml for security)

3. **The IDE will have**:
   - All project dependencies pre-installed
   - Playwright for browser automation
   - Node.js and npm
   - Prisma CLI with generated client

### Alternative: Quick Run Command
```bash
# Run code-server directly with your project mounted
docker run -it \
  -p 8080:8080 \
  -v "$(pwd)":/home/coder/project \
  -w /home/coder/project \
  --name antigravity-codeserver \
  codercom/code-server:latest
```

## Using the Development Container (Traditional Approach)

### Prerequisites
- Docker Desktop installed and running
- Antigravity IDE (or VSCode) with the "Remote - Containers" extension installed

### Setup Instructions

1. **Install the Remote Development Extension**:
   - In Antigravity IDE, go to Extensions (Ctrl+Shift+X)
   - Search for and install "Remote - Containers" extension

2. **Open the Project in a Container**:
   - Open this project in Antigravity IDE
   - Press `Ctrl+Shift+P` to open the command palette
   - Type "Dev Containers: Reopen in Container" and select it
   - The IDE will build the container and reopen the project inside it

3. **Alternative Method**:
   - If prompted with a notification about opening in a container, click "Reopen in Container"
   - Or use the green icon in the bottom-left corner of the status bar and select "Reopen in Container"

## Optimizing Antigravity IDE Performance

### 1. Language Server Resource Management
The language servers can consume significant resources. To optimize:

- Open Process Explorer: `Ctrl+Shift+P` → "Developer: Open Process Explorer"
- Identify processes consuming excessive memory, particularly language servers
- Configure language server limits in settings:

```json
{
  "typescript.tsserver.maxMemory": 2048,
  "typescript.suggest.enabled": false,
  "python.analysis.diagnosticMode": "openFilesOnly",
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true,
    "**/build/**": true,
    "**/.next/**": true,
    "**/.git/**": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/.next": true,
    "dist/**": true,
    "build/**": true
  }
}
```

### 2. Manage Active AI Agents
- Open Agent Manager (`Ctrl+```)
- Stop any agents you're not actively using
- Limit the number of concurrent agents running

### 3. Adjust AI Model Selection
- Switch to less resource-intensive models like Gemini 3 Flash instead of Gemini 3 Pro High
- Limit the number of simultaneous AI requests

### 4. Windows Defender Exclusions
Add these paths to Windows Defender exclusions:
- Your project directory: `c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\`
- Your Antigravity IDE installation directory

### 5. Resource Limits in Docker
If using Docker for your project, limit resources:
```bash
docker run --memory="4g" --cpus="2.0" your-project-image
```

## Benefits of Using Development Containers

1. **Consistent Environment**: All dependencies are contained in the image
2. **Reduced Local Resource Load**: Heavy processes run in isolated container
3. **Security**: Isolated environment protects your host system
4. **Easy Setup**: New team members can get started quickly

## Troubleshooting

### High Resource Usage
- Check if the dev container is consuming resources: `docker stats`
- Use the Process Explorer in Antigravity IDE to identify high-usage processes
- Consider using Docker Desktop to limit resources allocated to containers

### Extension Issues
- Some extensions may need to be installed in the container context
- Extensions that run locally vs. in the container behave differently
- Check the Extensions panel to see which extensions are enabled in the container

### File Access Performance
- Large projects may experience slower file access in containers
- Use the mounts configuration in devcontainer.json to optimize access
- Consider excluding unnecessary directories from file watching

## Performance Tips

1. **Restart the Extension Host Periodically**: `Ctrl+Shift+P` → "Developer: Restart Extension Host"
2. **Disable Unused Extensions**: Only keep extensions you actively use
3. **Use Workspaces**: Limit the scope of file watching to specific directories
4. **Monitor Docker Resources**: Use Docker Desktop dashboard to track resource usage
5. **Clear Cache Periodically**: Close and reopen the container to reset the environment