import { DragEvent, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  onDrop: (
    transferData: { type: 'column'; fromColumnIndex: number },
    taskParams?
  ) => void;
}

const AppDrop = (props: IProps) => {
  const { children, onDrop } = props;
  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    console.log('on drop');
    e.stopPropagation();
    const transferData = JSON.parse(e.dataTransfer.getData('payload'));
    onDrop(transferData);
  };

  const prevent = (e: DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div onDrop={onDropHandler} onDragOver={prevent} onDragEnter={prevent}>
      {children}
    </div>
  );
};

export default AppDrop;
