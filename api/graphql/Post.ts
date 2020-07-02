import { schema } from 'nexus'

schema.objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('drafts', {
      type: 'Post',
      list: true,
      nullable: false,
      resolve() {
        return [{ id: 1, title: 'Nexus', body: '...', published: false }]
      }
    })
  }
})