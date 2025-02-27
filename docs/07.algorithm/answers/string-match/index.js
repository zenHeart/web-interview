class StringMatch {
  map = {}

  addWord (word) {
    // 重点是按照桶分组
    if (this.map[word.length]) {
      this.map[word.length].push(word)
    } else {
      this.map[word.length] = [word]
    }
  }

  search (match) {
    if (match.includes('.')) {
      const reg = new RegExp(match)
      return this.map[match.length]?.filter?.(word => reg.test(word)) || []
    } else {
      return this.map[match.length]?.filter?.(word => word === match) || []
    }
  }
}

const stringMatch = new StringMatch()
stringMatch.addWord('hello')
stringMatch.addWord('world')
stringMatch.addWord('good')
stringMatch.addWord('morning')
stringMatch.addWord('afternoon')
stringMatch.addWord('night')
console.log(stringMatch.search('h.llo')) // [ 'hello' ]
console.log(stringMatch.search('h.l.')) // [ 'hello' ]
console.log(stringMatch.search('h.l')) // []
console.log(stringMatch.search('h..lo')) // [ 'hello' ]
console.log(stringMatch.search('h..l.')) // [ 'hello' ]
console.log(stringMatch.search('h..l')) // []
console.log(stringMatch.search('night')) // []
