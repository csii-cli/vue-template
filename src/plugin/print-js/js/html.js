import { addHeader } from './functions'
import Print from './print'

export default {
  print: (params, printFrame) => {
    // Get the DOM printable element
    const printElement = document.getElementById(params.printable)

    // Check if the element exists
    if (!printElement) {
      window.console.error('Invalid HTML element id: ' + params.printable)
      return
    }

    // Clone the target element including its children (if available)
    params.printableElement = cloneElement(printElement, params)

    // Add header
    if (params.header) {
      addHeader(params.printableElement, params)
    }

    // Print html element contents
    Print.send(params, printFrame)
  }
}

function cloneElement(element, params) {
  // Clone the main node (if not already inside the recursion process)
  const clone = element.cloneNode()

  // Loop over and process the children elements / nodes (including text nodes)
  for (const child of element.childNodes) {
    // Check if we are skiping the current element
    if (params.ignoreElements.indexOf(child.id) !== -1) {
      continue
    }

    // Clone the child element
    const clonedChild = cloneElement(child, params)

    // Attach the cloned child to the cloned parent node
    clone.appendChild(clonedChild)
  }

  // Get all styling for print element (for nodes of type element only)
  if (params.scanStyles && element.nodeType === 1) {
    // change by lss 样式使用@media print控制而不使用行内样式,因为行内样式的优先级高，无法覆盖的去电
    // clone.setAttribute('style', collectStyles(element, params))
  }

  // Check if the element needs any state processing (copy user input data)
  switch (element.tagName) {
    case 'SELECT':
      // Copy the current selection value to its clone
      clone.value = element.value
      break
    case 'CANVAS':
      // Copy the canvas content to its clone
      clone.getContext('2d').drawImage(element, 0, 0)
      break
  }

  return clone
}
