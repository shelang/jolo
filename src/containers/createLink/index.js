import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/asyncAction";
import readXlsxFile from "read-excel-file";
import { UploadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  Modal,
  message,
  Divider,
  Card,
  Space,
  Upload,
  Tooltip,
  Spin,
  AutoComplete,
  Slider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  redirectModes,
  linkStatus,
  tooltips,
  os,
  devices,
  booleanEnum,
} from "../../utils/constants";
import { toast } from "react-toastify";
import { useQuery } from "../../hooks/queryParams";
import "./style.scss";

const { Title, Link } = Typography;
const { TextArea, Search } = Input;
const keysTemplate = ["title", "url"];
const marks = {
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "11",
  12: "12",
};
function CreateLink() {
  let query = useQuery();
  const [hash, setHash] = useState(false);
  const [iframe, setIframe] = useState(false);
  const [scriptContent, setScriptContent] = useState("");
  const [scriptName, setScriptName] = useState("");
  const [webhookName, setWebhookName] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scriptModalVisible, setScriptModalVisible] = useState(false);
  const [webhookModalVisible, setWebhookModalVisible] = useState(false);

  const [massCreateResponses, setMassCreateResponses] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState({});
  const [selectedOs, setSelectedOs] = useState({});
  const [scripts, setScripts] = useState([]);
  const [webhooks, setWebhooks] = useState([]);

  const [selectedScript, setSelectedScript] = useState();
  const [selectedWebhook, setSelectedWebhook] = useState();

  const [editMode, setEditMode] = useState(booleanEnum[query.get("isEditing")]);
  const [linkId, setLinkId] = useState(query.get("id"));
  const [massCreateErrorCount, setMassCreateErrorCount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [normalizedLinks, setNormalizedLinks] = useState([]);
  const [isCreateLinkModalVisible, setIsCreateLinkModalVisible] =
    useState(false);
  const [operationSystems, setOperationSystems] = useState(os);
  const [targetDevices, setTargetDevices] = useState(devices);
  const [{ response, isLoading, error }, doFetch] = useFetch({
    onError: () => {
      setMassCreateErrorCount(massCreateErrorCount + 1);
    },
  });
  const [linkData, fetchLinkData] = useFetch();
  const [scriptData, fetchScripts] = useFetch();
  const [webhookData, fetchWebhooks] = useFetch();
  const [createScriptData, createScripts] = useFetch();
  const [createWebhookData, createWebhook] = useFetch();

  const [form] = Form.useForm();

  const onFinish = async ({ iframe, ...values }) => {
    if (editMode) {
      const id = (response && response.id) || linkId;
      await doFetch({
        url: `links/${id}`,
        method: "PUT",
        data: {
          ...values,
          scriptId: selectedScript && selectedScript.value,
          type: iframe
            ? "IFRAME"
            : selectedScript && selectedScript.value
            ? "SCRIPT"
            : "REDIRECT",
          scriptId: selectedScript && selectedScript.value,
          webhookId: selectedWebhook && selectedWebhook.value,
        },
      });
    } else {
      await doFetch({
        url: "links",
        method: "POST",
        data: {
          ...values,
          type: iframe
            ? "IFRAME"
            : selectedScript && selectedScript.value
            ? "SCRIPT"
            : "REDIRECT",
          scriptId: selectedScript && selectedScript.value,
          webhookId: selectedWebhook && selectedWebhook.value,
        },
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFieldsChange = (changedFields) => {
    if (changedFields[0].name[0] + changedFields[0].name[2] === "devicestype") {
      setSelectedDevices({
        ...selectedDevices,
        [changedFields[0].name[1]]: changedFields[0].value,
      });
    }
    if (changedFields[0].name[0] + changedFields[0].name[2] === "ostype") {
      setSelectedOs({
        ...selectedOs,
        [changedFields[0].name[1]]: changedFields[0].value,
      });
    }
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response.redirectTo);
    message.success("Copied to Your Clipboard");
  };
  const createNewLink = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  const createNewLinks = () => {
    normalizedLinks.forEach(async (normalizedLink) => {
      try {
        await doFetch({
          url: "links",
          method: "POST",
          data: {
            ...normalizedLink,
          },
        });
      } catch (e) {}
    });

    if (massCreateErrorCount) {
      toast.error("Creation Failed");
    } else {
      toast.success("Links Successfully Created");
      setIsCreateLinkModalVisible(false);
    }
  };
  const onFetchLinkData = async () => {
    await fetchLinkData({
      url: `links/${linkId}`,
      method: "GET",
    });
  };
  const searchScript = async (searchText, initialId) => {
    let query = "";
    if (searchText) {
      query = `name=${searchText}`;
    } else {
      query = `id=${initialId}`;
    }
    try {
      await fetchScripts({
        url: `script/?${query}`,
        method: "GET",
      });
    } catch (e) {}
  };
  const searchWebhook = async (searchText, initialId) => {
    let query = "";
    if (searchText) {
      query = `name=${searchText}`;
    } else {
      query = `id=${initialId}`;
    }
    try {
      await fetchWebhooks({
        url: `webhook/?${query}`,
        method: "GET",
      });
    } catch (e) {}
  };
  const onSearch = async (searchText, type) => {
    switch (type) {
      case "script": {
        searchScript(searchText);
      }
      case "webhook": {
        searchWebhook(searchText);
      }
      default: {
        return;
      }
    }
  };
  const createNewScript = async () => {
    try {
      await createScripts({
        url: "script",
        method: "POST",
        data: {
          name: scriptName, // script name, useful for searching in UI
          timeout: 180000, // timeout that after that user will be redirected to next page
          content: scriptContent, // js script that should be load on the page
        },
      });
      setScriptModalVisible(false);
    } catch (e) {
    } finally {
    }
  };
  const createNewWebhook = async () => {
    try {
      await createWebhook({
        url: "webhook",
        method: "POST",
        data: {
          name: webhookName,
          url: webhookUrl,
        },
      });
      setWebhookModalVisible(false);
    } catch (e) {
    } finally {
    }
  };
  const onSelect = (data) => {
    console.log("onSelect", data);
    setSelectedScript(scripts.filter((script) => script.value === data)[0]);
    setSelectedWebhook(webhooks.filter((webhook) => webhook.value === data)[0]);
  };
  const deleteObjectKey = (obj, key) => {
    return Object.keys(obj).reduce((total, acc) => {
      if (Number(acc) !== key) {
        total[acc] = obj[acc];
      }
      return total;
    }, {});
  };
  const reorderObjectKeys = (obj) => {
    return Object.keys(obj).reduce((total, acc, index) => {
      if (index !== acc) {
        total[index] = obj[acc];
      }
      return total;
    }, {});
  };

  useEffect(() => {
    if (response) {
      if (editMode) {
        setMassCreateResponses([response]);
      } else {
        setMassCreateResponses([...massCreateResponses, response]);
      }
      setIsModalVisible(true);
    }
  }, [response]);
  useEffect(() => {
    readXlsxFile(fileList[0]).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      const normalizedRows = rows.reduce((total, row, index) => {
        if (index === 0) {
          return total;
        } else {
          total.push({});
          keysTemplate.map((key, keyIndex) => {
            if (row[keyIndex]) {
              return (total[index - 1][key] = row[keyIndex]);
            } else {
              toast.error(`${key} Is Required`);
            }
          });
          return total;
        }
      }, []);

      console.log(normalizedRows, "normalizedRows");
      setNormalizedLinks(normalizedRows);
    });
  }, [fileList]);
  useEffect(() => {
    if (linkId) {
      onFetchLinkData();
    }
  }, [linkId]);
  useEffect(() => {
    if (linkData.response) {
      if (linkData.response.scriptId) {
        searchScript(null, linkData.response.scriptId);
      }
      if (linkData.response.webhookId) {
        searchWebhook(null, linkData.response.webhookId);
      }

      const newValues = {
        ...linkData.response,
        status: linkData.response === 0 ? "INACTIVE" : "ACTIVE",
      };
      form.setFieldsValue(newValues);
    }
  }, [linkData.response]);
  useEffect(() => {
    if (scriptData.response) {
      const normalizedScripts = scriptData.response.scripts.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          });
          return total;
        },
        []
      );
      setScripts(normalizedScripts);
    }
    if (webhookData.response) {
      const normalizedScripts = webhookData.response.webhooks.reduce(
        (total, acc) => {
          total.push({
            label: acc.name,
            value: acc.id,
          });
          return total;
        },
        []
      );
      setWebhooks(normalizedScripts);
    }
  }, [scriptData.response]);

  const labelCol = {
    lg: { span: 4 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };
  const wrapperCol = {
    lg: { span: 12 },
    md: { span: 12 },
    sm: { span: 24 },
    xs: { span: 24 },
  };
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  console.log(editMode, "editMode");
  return (
    <Card>
      <Modal
        title="Created Link(s) Successfully"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          if (massCreateResponses.length === 1) {
            setEditMode(true);
            // query.set("isEditing", true);
          }
        }}
        onOk={createNewLink}
        cancelText={massCreateResponses.length > 1 ? "Cancel" : "Edit"}
        okText="Create New Link"
      >
        <p>Here is Your Link(s), Enjoy</p>

        <Row className="links">
          {massCreateResponses.map((res, index) => {
            return (
              <>
                <Col span={24}>
                  <Col span={17}>
                    <Search
                      value={res && res.redirectTo}
                      onSearch={copyToClipboard}
                      enterButton="Copy"
                    />
                    <span className="linksFrom">Created from: {res.url}</span>
                  </Col>
                  <Col span={1}>
                    <Divider type="vertical" />
                  </Col>
                  <Col span={6}>
                    <Button
                      type="dashed"
                      block
                      onClick={() => res && window.open(res.redirectTo)}
                    >
                      Test Link
                    </Button>
                  </Col>
                </Col>
                {massCreateResponses.length > 1 &&
                  index !== massCreateResponses.length - 1 && <Divider />}
              </>
            );
          })}
        </Row>
      </Modal>
      <Modal
        title="Create Links From File"
        visible={isCreateLinkModalVisible}
        onCancel={() => setIsCreateLinkModalVisible(false)}
        onOk={createNewLinks}
        okText="Create Links"
      >
        <p>Please Add Your File</p>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Modal>
      <Modal
        title="Create Webhook"
        visible={webhookModalVisible}
        onCancel={() => setWebhookModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Webhook Name"
            style={{ width: "100%" }}
            value={webhookName}
            onChange={(e) => {
              setWebhookName(e.target.value);
            }}
          />
          <TextArea
            placeholder="Webhook URL"
            style={{ width: "100%" }}
            rows={4}
            value={webhookUrl}
            onChange={(e) => {
              setWebhookUrl(e.target.value);
            }}
          />
          <Button loading={isLoading} type="primary" onClick={createNewWebhook}>
            {editMode ? "Update" : "Submit"}
          </Button>
        </Space>
      </Modal>
      <Modal
        title="Create Script"
        visible={scriptModalVisible}
        onCancel={() => setScriptModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input
            placeholder="Script Name"
            style={{ width: "100%" }}
            value={scriptName}
            onChange={(e) => {
              setScriptName(e.target.value);
            }}
          />
          <TextArea
            placeholder="Script Content"
            style={{ width: "100%" }}
            rows={4}
            value={scriptContent}
            onChange={(e) => {
              setScriptContent(e.target.value);
            }}
          />
          <Button loading={isLoading} type="primary" onClick={createNewScript}>
            {editMode ? "Update" : "Submit"}
          </Button>
        </Space>
      </Modal>
      <Row>
        <Col md={20} xs={24}>
          <Title>Creating Link</Title>
        </Col>
        <Col md={4} xs={24}>
          <Link level={5} onClick={() => setIsCreateLinkModalVisible(true)}>
            Creating Link From File
          </Link>
        </Col>
      </Row>
      <Spin spinning={linkData.isLoading}>
        <Form
          form={form}
          scrollToFirstError
          labelAlign="left"
          name="create link"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={onFieldsChange}
          initialValues={
            linkData.response
              ? linkData.response
              : { status: "ACTIVE", redirectCode: 301, hashLength: 6 }
          }
        >
          <Form.Item
            label="Friendly Name:"
            name="title"
            tooltip={tooltips.friendlyName}
            rules={[
              {
                required: true,
                message: "Please input your Title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Destination URL:"
            name="url"
            tooltip={tooltips.destinationUrl}
            rules={[
              {
                required: true,
                message: "Please input your URL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: false,
                message: "Please input your Status!",
              },
            ]}
          >
            <Select>
              {Object.keys(linkStatus).map((key) => {
                return (
                  <Select.Option value={linkStatus[key]}>{key}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Redirect Mode:"
            name="redirectCode"
            tooltip={tooltips.redirectMode}
            rules={[
              {
                required: false,
                message: "Please input your Redirect Mode!",
              },
            ]}
          >
            <Select>
              {redirectModes.map((redirectMode) => {
                return (
                  <Select.Option value={redirectMode}>
                    {redirectMode}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Expiration Date:"
            name="expireAt"
            tooltip={tooltips.expirationDate}
            rules={[
              {
                required: false,
                message: "Please input your Expire Date!",
              },
            ]}
          >
            <DatePicker showTime={{ format: "HH:mm" }} showNow={false} />
          </Form.Item>
          <Form.Item
            label="Note:"
            name="description"
            tooltip={tooltips.note}
            rules={[
              {
                required: false,
                message: "Please input your Description!",
              },
            ]}
          >
            <TextArea maxLength={255} autoSize={{ minRows: 3, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            label="Hash URL:"
            name={hash ? "hash" : "hashLength"}
            tooltip={tooltips.hashUrl}
          >
            <Row align="middle">
              <Col span={4}>
                <Switch checked={hash} onChange={setHash} />
              </Col>
              <Col span={20}>
                {hash ? (
                  <Input placeholder="Hash URL" />
                ) : (
                  <Slider
                    defaultValue={6}
                    min={5}
                    max={12}
                    marks={marks}
                    step={1}
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Forward Parameters:"
            name="forwardParameter"
            tooltip={tooltips.forwardParameters}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Row>
            <Col md={16} xs={24}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Card>
                  <Title level={3}>
                    Device Targeting:
                    <Tooltip
                      className={"customTooltip"}
                      placement="top"
                      title={tooltips.textTargeting}
                    >
                      <Button>?</Button>
                    </Tooltip>
                  </Title>
                  <Form.List name="devices">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space
                            key={key}
                            size={0}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, "type"]}
                              fieldKey={[fieldKey, "type"]}
                              rules={[
                                { required: true, message: "Missing type" },
                              ]}
                            >
                              <Select
                                style={{ width: 200 }}
                                placeholder="Device"
                              >
                                {targetDevices.map((targetDevice) => {
                                  if (
                                    Object.values(selectedDevices).includes(
                                      targetDevice.toLowerCase()
                                    )
                                  ) {
                                    return null;
                                  } else {
                                    return (
                                      <Select.Option
                                        value={targetDevice.toLowerCase()}
                                      >
                                        {targetDevice}
                                      </Select.Option>
                                    );
                                  }
                                })}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              wrapperCol={{ span: 24 }}
                              name={[name, "url"]}
                              fieldKey={[fieldKey, "url"]}
                              rules={[
                                { required: true, message: "Missing URL" },
                              ]}
                            >
                              <Input placeholder="url" style={{ width: 300 }} />
                            </Form.Item>
                            <MinusCircleOutlined
                              style={{ marginLeft: 10 }}
                              onClick={() => {
                                const newSelectedDevices = reorderObjectKeys(
                                  deleteObjectKey(selectedDevices, name)
                                );
                                setSelectedDevices(newSelectedDevices);
                                remove(name);
                              }}
                            />
                          </Space>
                        ))}
                        <Form.Item>
                          {fields.length < 2 && (
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Device
                            </Button>
                          )}
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Card>
                <Card>
                  <Title level={3}>
                    Operation System Targeting:
                    <Tooltip
                      className={"customTooltip"}
                      placement="top"
                      title={tooltips.textTargeting}
                    >
                      <Button>?</Button>
                    </Tooltip>
                  </Title>
                  <Form.List name="os">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(
                          ({
                            key,
                            name,
                            fieldKey,
                            labelCol,
                            wrapperCol,
                            ...restField
                          }) => (
                            <Space
                              key={key}
                              size={0}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                wrapperCol={{ span: 24 }}
                                name={[name, "type"]}
                                fieldKey={[fieldKey, "type"]}
                                rules={[
                                  { required: true, message: "Missing type" },
                                ]}
                              >
                                <Select
                                  style={{ width: 200 }}
                                  placeholder="Operation System"
                                >
                                  {operationSystems.map((operationSystem) => {
                                    if (
                                      Object.values(selectedOs).includes(
                                        operationSystem.toLowerCase()
                                      )
                                    ) {
                                      return null;
                                    } else {
                                      return (
                                        <Select.Option
                                          value={operationSystem.toLowerCase()}
                                        >
                                          {operationSystem}
                                        </Select.Option>
                                      );
                                    }
                                  })}
                                </Select>
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                wrapperCol={{ span: 24 }}
                                name={[name, "url"]}
                                fieldKey={[fieldKey, "url"]}
                                rules={[
                                  { required: true, message: "Missing URL" },
                                ]}
                              >
                                <Input
                                  placeholder="url"
                                  style={{ width: 300 }}
                                />
                              </Form.Item>
                              <MinusCircleOutlined
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                  const newSelectedOs = reorderObjectKeys(
                                    deleteObjectKey(selectedOs, name)
                                  );
                                  setSelectedOs(newSelectedOs);
                                  remove(name);
                                }}
                              />
                            </Space>
                          )
                        )}
                        <Form.Item>
                          {fields.length < 2 && (
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Operation System
                            </Button>
                          )}
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Card>
              </Space>
            </Col>
          </Row>
          <Card>
            <Form.Item
              label="URL Masking:"
              name="iframe"
              valuePropName="checked"
              className="urlMasking"
            >
              <Tooltip
                className={"customTooltip"}
                placement="top"
                title={tooltips.urlMask}
              >
                <Button>?</Button>
              </Tooltip>
              <Switch checked={iframe} onChange={setIframe} />
            </Form.Item>
            {!iframe && (
              <>
                <Title level={3}>
                  Retargeting codes
                  <Tooltip
                    className={"customTooltip"}
                    placement="top"
                    title={tooltips.textTargeting}
                  >
                    <Button>?</Button>
                  </Tooltip>
                </Title>
                <AutoComplete
                  dropdownMatchSelectWidth={252}
                  style={{ width: 300 }}
                  options={scripts}
                  onSelect={onSelect}
                  onSearch={(value) => onSearch(value, "script")}
                  placeholder="Search Scripts"
                  value={selectedScript ? selectedScript.label : undefined}
                />
                <Divider />
                <Space direction="vertical">
                  <Button
                    type="primary"
                    onClick={() => setScriptModalVisible(true)}
                  >
                    add script
                  </Button>
                </Space>
              </>
            )}
          </Card>

          <Card>
            {!iframe && (
              <>
                <Title level={3}>
                  Retargeting codes
                  <Tooltip
                    className={"customTooltip"}
                    placement="top"
                    title={tooltips.textTargeting}
                  >
                    <Button>?</Button>
                  </Tooltip>
                </Title>
                <AutoComplete
                  dropdownMatchSelectWidth={252}
                  style={{ width: 300 }}
                  options={webhooks}
                  onSelect={onSelect}
                  onSearch={(value) => onSearch(value, "webhook")}
                  placeholder="Search Webhook"
                  value={selectedWebhook ? selectedWebhook.label : undefined}
                />
                <Divider />
                <Space direction="vertical">
                  <Button
                    type="primary"
                    onClick={() => setWebhookModalVisible(true)}
                  >
                    Add WebHook
                  </Button>
                </Space>
              </>
            )}
          </Card>

          <br />
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              {editMode ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
}

export default CreateLink;
