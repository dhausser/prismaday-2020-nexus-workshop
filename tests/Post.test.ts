import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('ensure that a draft can be created and published', async () => {
  const draftResult = await ctx.client.send(`
    mutation {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `)

  expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
      },
    }
  `)

  const publishResult = await ctx.client.send(
    `
      mutation publishDraft($draftId: Int!) {
        publish(draftId: $draftId) {
          id
          title
          body
          published
        }
      }
    `,
    { draftId: draftResult.createDraft.id },
  )

  expect(publishResult).toMatchInlineSnapshot(`
    Object {
      "publish": Object {
        "body": "...",
        "id": 1,
        "published": true,
        "title": "Nexus",
      },
    }
  `)
})
