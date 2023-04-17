var Exports = {


  get libExports() {
    return bmUtils.Exports
  },

  /**
   * Utils namespace
   * @return {Utils} 
   */
  get Utils() {
    return this.libExports.Utils
  },

  /**
   * @class XmlWrapper
   * @return {XmlWrapper} 
   */
  get XmlWrapper() {
    return XmlWrapper
  },


  /**
   * @implements XmlWrapper
   * @return {XmlWrapper} 
   */
  newXmlWrapper(...args) {
    return this.guard(new this.XmlWrapper(...args))
  },

  /**
   * @implements HtmlEncoder
   * @return {HtmlEncoder} 
   */
  get HtmlEncoder() {
    return this.guard(HtmlEncoder)
  },

  /**
   * @class AnyMl
   * @return {AnyMl} 
   */
  get AnyMl () {
    return AnyMl
  },

  /**
   * @implements AnyMl
   * @return {Proxy} 
   */
  newAnyMl(...args) {
    return this.guard(new this.AnyMl(...args))
  },

  /**
   * Gml Extension namespace example
   * @return {Proxy} 
   */
  get Gml() {
    return this.guard(Gml)
  },

  /**
   * Html Extension namespace example
   * @return {Proxy} 
   */
  get Html() {
    return this.guard(Html)
  },

  /**
   * Gml namespace
   * @return {Proxy} 
   */
  // used to trap access to unknown properties
  guard(target) {
    return new Proxy(target, this.validateProperties)
  },


  /**
   * for validating attempts to access non existent properties
   */
  get validateProperties() {
    return {
      get(target, prop, receiver) {
        if (!Reflect.has(target, prop)) throw `guard detected attempt to get non-existent property ${prop}`
        return Reflect.get(target, prop, receiver)
      },

      set(target, prop, value, receiver) {
        if (!Reflect.has(target, prop)) throw `guard attempt to set non-existent property ${prop}`
        return Reflect.set(target, prop, value, receiver)
      }
    }
  },
}
