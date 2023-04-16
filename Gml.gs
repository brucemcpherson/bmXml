/**
 * @namespace Gml
 * wrapper for GraphML
 */
const Gml = (() => {


  /**
   * @return {XmlWrapper}and instance of xmlwrapper
   */
  const getRenderer = () => {
    return Exports.newXmlWrapper({
      root: {
        tag: 'graphml',
        attrs: {
          xmlns: "http://graphml.graphdrawing.org/xmlns"
        }
      }
    })

  }

  /**
   * this is the parent item for a complete gml rendering
   * @param {XmlItem[]} children the content
   * @param {number} [indent=2] number of spaces to indent each children content by
   * @return {string} the rendered string
   */
  const render = ({ children, indent } = {}) => {
    return getRenderer().render({ children, indent })
  }

  return {
    render,
    getRenderer
  }
})()
