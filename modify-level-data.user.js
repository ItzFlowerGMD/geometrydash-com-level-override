// ==UserScript==
// @name        Modify level data
// @namespace   Violentmonkey Scripts
// @match       https://geometrydash.com/*
// @grant       none
// @version     1.0
// @author      ItzFlowerGMD
// @description Allows you to modify the level data to import your own levels instead of Stereo Madness!
// @run-at      document-start
// ==/UserScript==

let level = {
  settings: "",
  objects: ""
}

let socket = new WebSocket("ws://127.0.0.1:1313")
socket.onopen = () => {
    socket.send(JSON.stringify({
        action: "GET_LEVEL_STRING"
    }))
}
socket.onmessage = e => {
    let str = JSON.parse(e.data).response
    let index = str.indexOf(";")

    level.settings = str.slice(0, index)
    level.objects = str.slice(index + 1)
    socket.close()
}

let decoder = TextDecoder.prototype.decode
TextDecoder.prototype.decode = function(u8) {

  let decoded = decoder.call(this, u8)

  return level.settings + level.objects
}