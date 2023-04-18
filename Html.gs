/**
 * @namespace Html
 * wrapper for Html
 */
const Html = (() => {


  const self = {}

  self.root = {
    tag: 'html'
  }

  self.setRoot = (newRoot) => {
    self.root = newRoot
    return self
  }

  /**
   * this is the parent item for a complete html rendering
   * @param {object} p params
   * @param {XmlItem[]} p.children the content
   * @param {number} [p.indent=2] number of spaces to indent each children content by
   * @return {string} the rendered string
   */
  self.render = ({ children, indent } = {}) => Exports.newAnyMl({ root: self.root }).render({ children, indent })

  return self
})()