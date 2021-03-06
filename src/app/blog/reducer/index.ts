import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import { filter } from 'lodash';

import * as fromBlog from './blog.reducer';

export interface BlogState {
  blogs: fromBlog.State;
}

export interface State {
  blogs: BlogState;
}

export const reducers: ActionReducerMap<BlogState> = {
  blogs: fromBlog.reducer,
};

export const getBlogsState = createFeatureSelector<BlogState>('blogs');

export const getBlogEntitiesState = createSelector(
  getBlogsState,
  state => state.blogs
);

export const {
  selectIds: getBlogIds,
  selectEntities: getBlogEntities,
  selectAll: getAllBlogs,
  selectTotal: getTotalBlogs,
} = fromBlog.adapter.getSelectors(getBlogEntitiesState);

export const getSelectedBlogId = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.selectedBlogId
);

export const getAllBlogCount = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.allBlogCount
);

export const getErrorMessage = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.errorMessage
);

export const getSelectedBlog = createSelector(
  getBlogEntities,
  getSelectedBlogId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getNonDeletedBlogs = createSelector(
  getBlogEntities,
  entities => filter(entities, entity => !entity.deleted)
)

export const getDeletedBlogs = createSelector(
  getBlogEntities,
  entities => filter(entities, entity => entity.deleted === true)
)