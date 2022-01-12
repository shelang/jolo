import React, { useState } from "react";
import KitMenu from "../menu/menu";
import Logo from "../../assets/logo-light-New.png";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import "./layout.scss";

const { Header, Content, Footer, Sider } = Layout;

function AppLayout(props) {
	const [collapsed, setCollapsed] = useState(isMobile);
	return (
		<Layout>
			<Header className="header">
				{isMobile ? (
					<Button
						type="primary"
						onClick={() => setCollapsed(!collapsed)}
						style={{ marginBottom: 16 }}
					>
						{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
					</Button>
				) : null}
				<div className="logo">
					<img src={Logo} alt="logo" width={200} />
				</div>
			</Header>
			<Content className="content">
				<Layout className="site-layout-background">
					<Sider
						trigger={null}
						collapsible
						collapsed={collapsed}
						className="site-layout-background"
						width={200}
					>
						<KitMenu />
					</Sider>
					<Content className="internal_content">{props.children}</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					alignItems: "center",
					height: 50,
					padding: 0,
					display: "flex",
					justifyContent: "center",
				}}
			>
				LinkComposer ©2021 Created by LinkComposer Team
			</Footer>
		</Layout>
	);
}
export default AppLayout;
