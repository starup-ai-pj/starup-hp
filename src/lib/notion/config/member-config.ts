import { DatabaseConfig } from '../types'

export const memberConfig: DatabaseConfig = {
  database: {
    id: () => {
      const value = process.env.NOTION_MEMBER_DATABASE_ID
      if (!value) {
        throw new Error('NOTION_MEMBER_DATABASE_ID is not defined in environment variables')
      }
      return value
    },
    defaultSorts: [
      {
        property: 'ID',
        direction: 'ascending',
      },
    ],
  },
  properties: {
    id: {
      name: 'ID',
      type: 'unique_id',
    },
    name: {
      name: 'Name',
      type: 'title',
    },
    englishName: {
      name: 'Name(en)',
      type: 'rich_text',
    },
    position: {
      name: 'Position',
      type: 'rich_text',
    },
    description: {
      name: 'Description',
      type: 'rich_text',
    },
    image: {
      name: 'Images',
      type: 'files',
    },
    twitter: {
      name: 'Twitter',
      type: 'url',
    },
    facebook: {
      name: 'Facebook',
      type: 'url',
    },
    linkedin: {
      name: 'Linkedin',
      type: 'url',
    },
  },
}
