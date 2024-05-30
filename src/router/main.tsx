import React, { useEffect } from 'react';
import { Header } from '@src/component/header';
import { Footer } from '@src/component/footer';
import { starsBackground } from '@src/component/starBackground';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@src/router/home';
import { RedPacketDetail } from '@src/router/activity/redPacket/redPacketDetail';
import { RedPacketList } from '@src/router/activity/redPacket/redPacketList';
import { CreateRedPacket } from '@src/router/activity/redPacket/create';
import { User } from '@src/router/user';
import { TaskList, TaskDetail } from '@src/router/activity/task';

export function Main() {
  useEffect(() => {
    starsBackground();
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/activity/redPacketdetail" element={<RedPacketDetail />}></Route>
        <Route path="/activity/redPacketlist" element={<RedPacketList />}></Route>
        <Route path="/activity/createRedPacket" element={<CreateRedPacket />}></Route>
        <Route path="/activity/tasklist" element={<TaskList />}></Route>
        <Route path="/activity/taskdetail" element={<TaskDetail />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/" element={<Navigate to="/home" replace />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}
