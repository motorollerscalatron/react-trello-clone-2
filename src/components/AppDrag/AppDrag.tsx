import { DragEvent, ReactNode, useRef } from 'react';

interface IProps {
  children: ReactNode;
  transferData: {
    type: 'column' | 'task';
    fromColumnIndex: number;
    fromTaskIndex?: number;
  };
}

const AppDrag = (props: IProps) => {
  const { children, transferData } = props;
  const dragRef = useRef<HTMLElement | null>(null);
  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    console.log({ dragRef, target: e.target, e });
    if (dragRef.current !== e.target) return;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('payload', JSON.stringify(transferData));
  };

  const prevent = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div
      ref={(ref) => (dragRef.current = ref)}
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
