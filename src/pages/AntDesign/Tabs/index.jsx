import React from 'react';
import {Tabs} from 'antd';


export default () => {
  const onChange = (key) => {
    console.log(key);
  };

  const firstPanel = (
    <div>
      firstPanel
    </div>
  )

  const items = [
    {
      key: '1',
      label: 'Tab 1',
      children: (
        <div>
          firstPanel
        </div>
      ),
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
  )
};