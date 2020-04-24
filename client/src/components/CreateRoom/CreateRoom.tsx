import React from 'react';

import { Input, Icon, Button } from 'antd';

import { CreateRoomProps } from './types';

const CreateRoom = ({ className }: CreateRoomProps): React.ReactElement => {
  return (
    <div className={className}>
      <Input placeholder='Create a room' />
      <Button htmlType='submit' type='default' icon='plus' />
    </div>
  );
};

export default CreateRoom;
