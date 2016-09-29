const fs = require('fs')
const fetch = require('node-fetch')

console.log('Loading atom-thematic…')

const readFile = (filename) => new Promise((resolve, reject) => {
  fs.readFile(filename, (err, data) => {
    if (err) reject(err)
    else resolve(data.toString())
  })
})

const writeFile = (filename, contents) => new Promise((resolve, reject) => {
  fs.writeFile(filename, contents, (err) => {
    if (err) reject(err)
    else resolve()
  })
})

const updateColorFile = (newColors) => {
  const defaultColorsFile = __dirname + '/theme/styles/default-colors.less'
  const colorsFile = __dirname + '/theme/styles/colors.less'
  readFile(defaultColorsFile)
    .then( contents => {
      let newContents = contents
      const keys = Object.keys(newColors)
      keys.forEach( colorName => {
        const pattern = `@${colorName}:\\s+#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?`
        const regex = new RegExp(pattern)
        const replaceWith = `@${colorName}: #${newColors[colorName]}`
        newContents = newContents.replace(regex, replaceWith)
      })
      return newContents
    })
    .then( contents => writeFile(colorsFile, contents) )
}

const activateTheme = () => {
  atom.packages.activatePackage('thematic-syntax')
    .then(_ => atom.config.get('core.themes'))
    .then(curConfig => {
      atom.config.set('core.themes', ['thematic-syntax'])
    })
}

function reload() {
  fetch('http://localhost:3000/theme')
    .then( body => body.json() )
    .then( data => updateColorFile(data.colors) )
    .then( _ => activateTheme() )
    .then( _ => setTimeout(reload, 2000) )
    .catch( _ => setTimeout(reload, 2000) )
}

reload()

console.log('Loaded.')
