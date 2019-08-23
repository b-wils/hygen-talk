module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "Name of redux",
  },
  {
    type: 'input',
    name: 'action',
    message: 'Action name'
  },
  {
    type: 'input',
    name: 'path',
    message: 'API Endpoint',
  },
  {
    type: 'select',
    name: 'method',
    message: 'API method type',
    choices: ['GET', 'POST', 'PATCH', 'PUT']
  },
]