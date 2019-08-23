module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "Name of component",
  },
  {
    type: 'select',
    name: 'visibilityPath',
    message: "Private or Public?",
    choices: ['Private', 'Public']
  }
]