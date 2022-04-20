import React, { useContext } from 'react';
import { myContext } from './ContextPage';

export default function ProfilePage() {
  const ctx = useContext(myContext);

  return (
    <div>
      <h1>{ctx.username} Profile</h1>
    </div>
  );
}
