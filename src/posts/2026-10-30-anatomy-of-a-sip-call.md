---
title: "Anatomy of a SIP call, for people who've never seen one"
description: "What actually happens between dialing and hearing a voice: INVITE, SDP, RTP and the NAT problem, explained by someone who debugs it for a living."
date: 2026-10-30
category: rtc
---

Every time you join a call from a phone number, there's a good chance **SIP** (Session Initiation Protocol) set it up. It's 25 years old, text-based, looks a lot like HTTP, and is still the backbone of telephony. Here's a call from start to finish.

## Two protocols, not one

The most important thing to understand first: **SIP doesn't carry your voice.**

- **SIP** is *signaling*. It finds the other party, negotiates the call, and says "hang up."
- **RTP** is *media*. It carries the audio and video packets.

They often take *different network paths*. Most "I can see the call connected but there's no audio" bugs come from exactly that.

## The happy path

```text
Alice                    Proxy                     Bob
  │ ── INVITE (SDP offer) ──▶ │ ── INVITE ──────────▶ │
  │ ◀── 100 Trying ────────── │                       │
  │ ◀── 180 Ringing ───────── │ ◀── 180 Ringing ───── │
  │ ◀── 200 OK (SDP answer) ─ │ ◀── 200 OK ────────── │
  │ ── ACK ─────────────────────────────────────────▶ │
  │ ◀═══════════════ RTP audio ═════════════════════▶ │
  │ ── BYE ─────────────────────────────────────────▶ │
  │ ◀── 200 OK ────────────────────────────────────── │
```

1. **INVITE.** Alice asks to start a session. The body carries an **SDP offer**: "I can receive audio at this IP and port, using these codecs (Opus, G.711…)."
2. **100 Trying.** The proxy says it got the request, so Alice stops retransmitting. (SIP often runs over UDP, so retransmission timers matter.)
3. **180 Ringing.** Bob's phone is ringing. This is where you hear ringback.
4. **200 OK.** Bob answers. The body carries his **SDP answer**: his IP, port and the codec chosen from Alice's list.
5. **ACK.** Alice confirms. That three-way handshake (INVITE / 200 / ACK) is what makes the call established.
6. **RTP flows** directly between the addresses in the two SDPs, or through a media server if one is in the path.
7. **BYE / 200 OK.** Either side hangs up.

Before any of this, Bob's phone sent a **REGISTER** to a *registrar*: "Bob is reachable at this address." That's how the proxy knows where to send the INVITE.

## Where it breaks: NAT

Bob is behind a home router. His SDP says "send audio to `192.168.1.20:4000`", a private address that means nothing on the internet. The signaling works perfectly. The audio goes nowhere.

That's the classic **one-way or no audio** problem. The fixes, roughly in order of how much they cost:

- **Symmetric RTP / latching.** The server ignores the SDP address and sends media back to wherever packets actually come from.
- **STUN.** Learn your public IP and port and advertise those instead.
- **TURN.** Relay all media through a public server. It always works and always costs bandwidth.
- **ICE.** Gather all the candidates above and try them in order until one connects. This is what WebRTC does by default.

## Where WebRTC fits

WebRTC is the same idea with modern defaults: ICE built in, mandatory encryption (DTLS-SRTP), and a browser API. It doesn't define signaling at all, so plenty of WebRTC apps carry their SDP *over* SIP (via WebSockets) or over their own JSON protocol. Bridging the two worlds is a big part of what platforms like the one I work on do every day.

## Where AI comes in

Put an LLM on the other end of that RTP stream and you have a voice agent. The hard part isn't the model. It's latency: jitter buffers, codec transcoding, turn detection and barge-in, all within a few hundred milliseconds so it feels like a conversation. That's a post of its own.

---

*If you want to watch this yourself: run `sngrep` on a SIP server, or open `chrome://webrtc-internals` during a Google Meet call.*
