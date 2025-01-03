/* eslint-disable no-extend-native */
/**
 *
 */

Array.prototype.duplicator = function duplicator () {
  return [...this, ...this]
}
