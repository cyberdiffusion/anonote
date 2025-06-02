# Anonote

## Type. Share. Disappear.

*Originally created in 2017 by [CyberDiffusion](https://github.com/cyberdiffusion)*

### What Is It?

Anonote is a privacy-first platform that allows users to create encrypted, self-destructing notes without leaving any trace — and without using a physical keyboard. The goal is simple: the message is visible only once, for a limited time, and then permanently deleted.

### How Does It Work?

1. Users type their message using a virtual keyboard only (on-screen keys).
   → This eliminates the risk of keyloggers or physical traceability.

2. Once typed, the message is encrypted directly in the browser and a shareable link is generated.

3. The recipient can view the message for a fixed duration (e.g., 30 seconds).

4. Once the time runs out, the message is automatically destroyed.

5. The system ensures that a message is viewable only once — it cannot be accessed again after being opened.

### Security Features

| Feature | Description |
| --- | --- |
| Virtual Keyboard Only | Users can only type using the on-screen keyboard. |
| Client-side Encryption | AES-256 encryption done entirely in the browser. Server cannot decrypt. |
| Self-destructing Notes | Notes are deleted after they are read or when the timer expires. |
| No Copy / Screenshot | Right-click, Ctrl+C, and screenshot attempts are blocked or discouraged. |
| No Tracking | No IP logging, cookies, or fingerprinting. True anonymity guaranteed. |


### Getting Started

```
npm install
npm start
```

### Building for Production

```
npm run build
```


### License

This project is open source and available under the [MIT License](LICENSE).
