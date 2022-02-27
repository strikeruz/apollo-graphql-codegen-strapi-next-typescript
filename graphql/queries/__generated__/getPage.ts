import * as Types from '../../../generated/global/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export const GetPageDocument = gql`
    query getPage($locale: I18NLocaleCode, $slug: String) {
  pages(locale: $locale, filters: {slug: {eq: $slug}}) {
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
export type GetPageQueryResult = Apollo.QueryResult<GetPageQuery, GetPageQueryVariables>;
export type GetPageQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars['I18NLocaleCode']>;
  slug?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPageQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', locale?: string | null, title?: string | null, slug?: string | null, description?: string | null, content?: string | null, dynamicZone?: Array<{ __typename: 'ComponentSharedTitle', id: string, title?: string | null, content?: string | null } | { __typename?: 'Error' } | null> | null } | null }> } | null };
