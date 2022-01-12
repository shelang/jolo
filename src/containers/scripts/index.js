import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import { Input, Table, Spin, Divider, Card, Form } from "antd";
import { Modal, Button } from "antd";
import { useQuery } from "../../hooks/queryParams";
import { booleanEnum } from "../../utils/constants";
import { useHistory } from "react-router";

const { TextArea, Search } = Input;

function Scripts() {
	let query = useQuery();

	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isEditModalVisible, setIsEditModalVisible] = useState(false);
	const [linkId, setLinkId] = useState(query.get("id"));
	const [editMode, setEditMode] = useState(booleanEnum[query.get("isEditing")]);
	const [searchValue, setSearchValue] = useState("");

	const [form] = Form.useForm();

	const [{ response, isLoading }, doFetch] = useFetch();

	const fetchScripts = async () => {
		await doFetch({
			url: `script/?page=${currentPage}&name=${searchValue}`,
			method: "GET",
		});
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	const showModal = () => {
		setIsModalVisible(true);
	};
	const searchByName = (value) => {
		setSearchValue(value);
	};
	const showModalEdit = () => {
		window.history.replaceState(
			linkId,
			"Edit Script",
			`/dashboard/edit-script:id${linkId}`,
		);

		setIsEditModalVisible(true);
		editScripts();
	};
	const createNewScripts = async (values) => {
		try {
			await doFetch({
				url: "script",
				method: "POST",
				data: {
					name: values.name, // script name, useful for searching in UI
					timeout: 180000, // timeout that after that user will be redirected to next page
					content: values.content, // js script that should be load on the page
				},
			});
			if (currentPage === 1) {
				fetchScripts();
			} else {
				setCurrentPage(1);
			}
			setIsModalVisible(false);
			form.resetFields();
		} catch (e) {
		} finally {
		}
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const editScripts = async (values) => {
		await doFetch({
			url: "script",
			method: "PUT",
			data: {
				name: "nameVal", // script name, useful for searching in UI
				timeout: 180000, // timeout that after that user will be redirected to next page
				content: "contentVal", // js script that should be load on the page
			},
		});
		form.setFieldsValue();
	};
	const handleCancelEdit = () => {
		setIsEditModalVisible(false);
		window.history.replaceState(null, "Scripts", `/dashboard/scripts`);
	};

	useEffect(() => {
		fetchScripts();
	}, [currentPage]);
	useEffect(() => {
		if (currentPage > 1) {
			setCurrentPage(1);
		} else {
			fetchScripts();
		}
	}, [searchValue]);

	const columns = [
		{
			title: "Script ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Script Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Content",
			dataIndex: "content",
			key: "content",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<a type="primary" onClick={showModalEdit}>
					edit
				</a>
			),
		},
	];

	return (
		<Card>
			<Button type="primary" onClick={showModal}>
				add script
			</Button>
			<Divider />
			<Modal
				title="Edit Script"
				visible={isEditModalVisible}
				onCancel={handleCancelEdit}
				footer={null}
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					onFinish={editScripts}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item label="name" name="name">
						<Input />
					</Form.Item>
					<Form.Item label="content" name="content">
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button loading={isLoading} type="primary" htmlType="submit">
							update
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				title="Create Script"
				visible={isModalVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 20 }}
					onFinish={createNewScripts}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="name"
						name="name"
						rules={[
							{ required: true, message: "Please input your Script Name" },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="content"
						name="content"
						rules={[
							{ required: true, message: "Please input your Script Content" },
						]}
					>
						<TextArea rows={4} />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button loading={isLoading} type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Spin spinning={isLoading}>
				<Search onSearch={searchByName} enterButton="Search" />
				<Divider />

				<Table
					columns={columns}
					dataSource={response ? response.scripts : []}
					pagination={{
						position: ["bottomCenter"],
						size: "small",
						current: currentPage,
						total: currentPage * 4 + 40,
						onChange: (page) => {
							setCurrentPage(page);
						},
					}}
					style={{ width: "100%" }}
				/>
			</Spin>
		</Card>
	);
}

export default Scripts;
