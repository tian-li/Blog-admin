import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Blog } from '../model/blog';
import { BlogActionTypes, BlogActionsUnion } from '../actions/blog.actions';

export interface State extends EntityState<Blog> {
  allBlogCount: number;
  allBlogCreateTimes: number[];
  errorMessage: string;
  selectedBlogId: string;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (blog: Blog) => blog.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  allBlogCount: 0,
  allBlogCreateTimes: [],
  errorMessage: undefined,
  selectedBlogId: undefined,
});


export function reducer(state = initialState, action: BlogActionsUnion): State {
  switch (action.type) {
    case BlogActionTypes.LOAD_ALL_BLOGS:
    case BlogActionTypes.LOAD_ONE_BLOG:
    case BlogActionTypes.ADD_BLOG:
    case BlogActionTypes.EDIT_BLOG: {
      return {
        ...state,
        selectedBlogId: undefined,
        errorMessage: undefined,
      };
    }
    case BlogActionTypes.LOAD_ALL_BLOGS_FAIL:
    case BlogActionTypes.LOAD_ONE_BLOG_FAIL:
    case BlogActionTypes.ADD_BLOG_FAIL:
    case BlogActionTypes.EDIT_BLOG_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case BlogActionTypes.LOAD_ALL_BLOGS_SUCCESS: {
      return adapter.addAll(action.payload, { ...state, errorMessage: 'Success' });
    }
    case BlogActionTypes.LOAD_ONE_BLOG_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedBlogId: action.payload.id,
        errorMessage: 'Success',
      });
    }
    case BlogActionTypes.ADD_BLOG_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        errorMessage: 'Success',
      });
    }
    case BlogActionTypes.EDIT_BLOG_SUCCESS: {
      return adapter.updateOne({ id: action.id, changes: action.changes }, {
        ...state,
        errorMessage: 'Success',
      });
    }
    default: {
      return state;
    }
  }
}

export const getSelectedBlogId = (state: State) => state.selectedBlogId;
export const getAllBlogCount = (state: State) => state.allBlogCount;
export const getAllBlogCreateTimes = (state: State) => state.allBlogCreateTimes;
