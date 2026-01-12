const crypto = require("crypto");

exports.encrypt = function (plainText, key) {
    const algorithm = "aes-256-gcm";
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

    const authTag = cipher.getAuthTag();
    return iv.toString("hex") + Buffer.concat([encrypted, authTag]).toString("hex");
};

// Decrypt function
exports.decrypt = function (encryptedText, key) {
    const algorithm = "aes-256-gcm";

    const encryptedBuffer = Buffer.from(encryptedText, "hex");

    const iv = encryptedBuffer.slice(0, 12);
    const authTag = encryptedBuffer.slice(-16);
    const ciphertext = encryptedBuffer.slice(12, -16);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return decrypted.toString("utf8");
};
