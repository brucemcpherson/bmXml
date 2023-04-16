/**
 * @typedef XmlItem
 * @property {string} tag the xml tag to wrap the content in
 * @property {object} attrs the attributes to apply as in <tag attr1="a" attr2="b" /> in format {attr1: "a", attr2: "b"}
 * @property {Gml[] || string[]} [children] tree of child GmlItems
 */

/**
 * @class XmlWrapper
 * for rendering xml content
 *  wrap function can be used to render any XML type content
 * input should look like this
 * {
 *   tag: 'thexmltag',
 *   attrs: {
 *    some attr:
 *   },
 *   children: [XmlItem || string]
 * }
 */
class XmlWrapper {

  /**
   * @constructor
   * @param {XmlItem} root the root of the xml tree
   * @return {XmlWrapper}
   */
  constructor({ root }) {
    this.root = root
  }

  /**
   * this is the parent item for a complete xml rendering
   * @param {object} p params obect
   * @param {XmlItem[]} p.children the content
   * @param {number} [p.indent=2] number of spaces to indent each children content by
   * @return {string} the rendered string
   */
  render({ children, indent = 2 } = {}) {
    return this.wrap({
      item: {
        ...this.root,
        children
      },
      indent
    })
  }

  /** 
   * dont allow attrs that are null or undefined
   * @param {object} ob the object to check 
   */
  checkAttr(ob, k) {
    const u = Exports.Utils
    if (u.isNU(ob[k])) throw `value for attr ${k} cannot be ${ob[k]}`
    return ob[k]
  }

  /**
    * wrap an element
    * @param {object} p params
    * @param {string} p.tag the element tag
    * @param {object} p.item the item
    * @param {string} p.item.tag the tag
    * @param {object} [p.item.attrs] the attributes
    * @param {object[]} [p.items.children] any children
    * @param {number} [p.indent = 2] indentation
    * @param {number} [p.tab = 0] indentation so far
    * @return {string} the completed tag wrapped content 
    */

  wrap({ item, tab = 0, indent = 2 }) {
    const u = Exports.Utils
    const encoder = Exports.HtmlEncoder.encode
    const { tag, attrs, children } = item

    if (attrs && (!u.isObject(attrs) || u.isArray(attrs))) throw `attrs for ${tag} must be a non array object`
    if (children && !u.isArray(children)) throw `children for ${tag} must be an array`
    const kids = children && children.length

    if (!tag) throw 'missing tag property in item'
    const spaces = " ".repeat(tab)

    // add the attrs to the tag
    const openTag = `\n${spaces}<${tag}` + (
      attrs
        ? Reflect.ownKeys(attrs).map(k => ` ${k}="${this.checkAttr(attrs, k)}"`).join("")
        : ''
    ) + `${kids ? '>' : '/>'}`


    // self close if there are no children
    // if just 1 child and its just text then dont space it
    const closeTag = kids
      ? `${children.length > 1 || u.isObject(children[0]) ? '\n' + spaces : ''}</${tag}>`
      : ''

    // absorb all the children
    const childContent = (children || []).map(child => u.isObject(child)
      ? this.wrap({ item: child, tab: tab + indent, indent })
      : encoder(child)
    ).join('')

    // wrap it up
    return openTag + childContent + closeTag

  }
}



