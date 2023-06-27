"use client"
import React from 'react'
import '../dash.css'
import DashHeader from "../../components/dashHeader/b"
import DashSideMenu from "../../components/dashSideMenu/d";
import DashPage from "../../components/dashPageContent/c";
import DashFooter from "../../components/dashFooter/a";
import { Space } from "antd";

function Carrousel() {
  return (
    <div className="app">
    <DashHeader />
    <Space className="SideMenuAndPageContent">
      <DashSideMenu />
      <DashPage render={"carrousel"}/>
    </Space>
    <DashFooter />
  </div>
  )
}

export default Carrousel