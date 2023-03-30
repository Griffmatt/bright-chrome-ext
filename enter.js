function simulateKey(view, keyCode, key) {
  let event = document.createEvent("Event")
  event.initEvent("keydown", true, true)
  event.keyCode = keyCode
  event.key = event.code = key
  return view.someProp("handleKeyDown", f => f(view, event))
}

simulateKey(view, 13, "Enter")
