import { DragEvent, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  transferData: {
    type: 'column';
    fromColumnIndex: number;
  };
}

const AppDrag = (props: IProps) => {
  const { children, transferData } = props;
  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('payload', JSON.stringify(transferData));
  };

  const prevent = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div
      draggable
      onDragStart={onDrag}
      onDragOver={prevent}
      onDragEnter={prevent}
    >
      {children}
    </div>
  );
};

export default AppDrag;
