import { ColumnType } from 'antd/lib/table';

import {
  renderFlag,
  renderTagsWithClickHandler,
  renderActionsAsColumn,
  TagClickHandler,
} from './mappers';

export type ColumnConfiguration<RecordType> = {
  title: string,
  dataIndex: string,
  key?: string,
  configuration?: ColumnType<RecordType>,
};

export function addColumn<RecordType>({
  title, dataIndex, key, configuration,
}: ColumnConfiguration<RecordType>): ColumnType<RecordType> {
  return {
    title,
    dataIndex,
    key,
    ellipsis: true,
    ...configuration,
  };
}

export function addFlagColumn<RecordType>(configuration: ColumnConfiguration<RecordType>) {
  return {
    ...addColumn(configuration),
    ...{
      render: renderFlag,
    },
  };
}

export function addTagsColumn<RecordType>(
  configuration: ColumnConfiguration<RecordType>,
  onActionClick: TagClickHandler,
) {
  return {
    ...addColumn(configuration),
    ...{
      className: 'tags',
      render: renderTagsWithClickHandler(onActionClick),
    },
  };
}

export function addActionsColumn<RecordType>(
  configuration: ColumnConfiguration<RecordType>,
  {
    width,
    getComponent,
  }: {
    width: number,
    getComponent: (item: RecordType) => JSX.Element,
  },
) {
  return {
    ...addColumn(configuration),
    ...renderActionsAsColumn<RecordType>(width)(getComponent),
  };
}
