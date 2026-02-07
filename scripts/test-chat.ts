
async function testChat() {
    const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: [{ role: "user", content: "Hello" }]
        })
    });

    if (!response.ok) {
        console.error("Chat API failed:", await response.text());
        return;
    }

    const reader = response.body?.getReader();
    if (!reader) {
        console.error("No reader available");
        return;
    }
    const decoder = new TextDecoder();
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        console.log("Chunk:", decoder.decode(value));
    }
}

testChat();
