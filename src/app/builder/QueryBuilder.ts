import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const filterField = this.query.filter as string | undefined;

    if (filterField) {
      this.modelQuery = this.modelQuery.find({
        author: filterField,
      } as FilterQuery<T>);
    }
    return this;
  }

  sortBy() {
    const sortBy = this.query.sortBy as string | undefined;
    const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
    const sortField = sortBy ? `${sortOrder}${sortBy}` : '-createdAt';

    this.modelQuery = this.modelQuery.sort(sortField as string);
    return this;
  }
}

export default QueryBuilder;
