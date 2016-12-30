import expect from 'expect';
import { createAction } from 'redux-actions';

import postsPayload from './payloads/linked_payload.json';
import authorPayload from './payloads/linked_payload_2.json';

import { reducer } from '../src/jsonapi';

const state = {};
const apiRead = createAction('API_READ');

describe('[State mutation] Insertion of links', () => {
  it('should read and insert links into state', () => {
    const updatedState = reducer(state, apiRead(postsPayload));
    const finalState = reducer(updatedState, apiRead(authorPayload));

    expect(finalState.posts.data.length).toEqual(postsPayload.data.length);
    expect(finalState.comments.data.length).toEqual(postsPayload.included.length);
    expect(finalState.authors.data.length).toEqual(authorPayload.data.length);

    expect(finalState.links.posts.length).toEqual(postsPayload.links.length);
    expect(finalState.links.posts.self).toEqual('http://api-host/api_path/posts?page%5Bnumber%5D=1&page%5Bsize%5D=2');
    expect(finalState.links.posts.next).toEqual('http://api-host/api_path/posts?page%5Bnumber%5D=2&page%5Bsize%5D=2');

    expect(finalState.links.authors.length).toEqual(postsPayload.links.length);
    expect(finalState.links.authors.self).toEqual('http://api-host/api_path/authors?page%5Bnumber%5D=1&page%5Bsize%5D=2');
    expect(finalState.links.authors.next).toEqual('http://api-host/api_path/authors?page%5Bnumber%5D=2&page%5Bsize%5D=2');
  });
});
