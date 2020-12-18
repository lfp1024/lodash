import eq from './eq.js'

/** Used for built-in method references. */
const objectProto = Object.prototype

/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty

/**
 Assigns own and inherited enumerable string keyed properties of source 继承 source object 所有可可枚举的属性
 objects to the destination object for all destination properties that  如果 destination object 的同名属性值为 undefined
 resolve to `undefined`. Source objects are applied from left to right. 则赋值 source object 的属性值。一旦设置则忽略后续 source object
 Once a property is set, additional values of the same property are ignored. 的同名属性值
 * => 属性值以左边的为主，如果为undefined则以继承右边的，否则忽略右边的
 * **Note:** This method mutates `object`.
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaultsDeep
 * @example
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
 * // => { 'a': 1, 'b': 2 }
 */
function defaults(object, ...sources) {
  object = Object(object)
  sources.forEach((source) => {
    if (source != null) {
      source = Object(source)
      for (const key in source) {
        const value = object[key]
        if (value === undefined ||
            (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
          object[key] = source[key]
        }
      }
    }
  })
  return object
}

export default defaults
