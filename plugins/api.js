export default (context, inject) => {
  const api = {
    // Config host url
    host: () => {
      return process.env.API_HOST
    },
    version: () => {
      return '/v1/'
    },
    fullUrl: () => {
      return api.host() + api.version()
    },
    // List Notes
    listNotes: () => {
      return api.fullUrl() + 'list-notes'
    },
    addListNotes: () => {
      return api.fullUrl() + 'list-notes/add'
    },
    deleteListNotes: () => {
      return api.fullUrl() + 'list-notes/delete'
    },
    updateListNotes: () => {
      return api.fullUrl() + 'list-notes/update'
    },
  }
  // Inject $hello(msg) in Vue, context and store.
  inject('api', api)
  // For Nuxt <= 2.12, also add 👇
  context.$api = api
}
