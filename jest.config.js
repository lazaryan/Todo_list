module.exports = {
	rootDir: "./app",
    setupFiles: ["./setupTests.js"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    moduleNameMapper: {
    	"^theme(.*)$": "<rootDir>/ui/themes/main/index.js",
    	"^ui(.*)$": "<rootDir>/ui/index.js",
    	"^utils(.*)$": "<rootDir>/utils.js",
    	"\\.(s?css|less)$": "identity-obj-proxy"
    }
}