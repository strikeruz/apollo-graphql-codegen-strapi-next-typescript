import * as Types from '../../../generated/global/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export const GetPagesDocument = gql`
    query getPages($locale: I18NLocaleCode) {
  pages(locale: $locale) {
    data {
      id
      attributes {
        locale
        title
        slug
        description
        content
        dynamicZone {
          ... on ComponentSharedTitle {
            __typename
            id
            title
            content
          }
        }
      }
    }
  }
}
    `;
export type GetPagesQueryResult = Apollo.QueryResult<GetPagesQuery, GetPagesQueryVariables>;
export type GetPagesQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars['I18NLocaleCode']>;
}>;


export type GetPagesQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', locale?: string | null, title?: string | null, slug?: string | null, description?: string | null, content?: string | null, dynamicZone?: Array<{ __typename: 'ComponentSharedTitle', id: string, title?: string | null, content?: string | null } | { __typename?: 'Error' } | null> | null } | null }> } | null };
