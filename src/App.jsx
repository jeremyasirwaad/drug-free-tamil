import { useState } from "react";
import "./App.css";
import {
	Divider,
	Form,
	Row,
	Col,
	Select,
	Input,
	Button,
	DatePicker,
	Upload,
	Alert
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { Space, Table, Tag } from "antd";
import axios from "axios";

function App() {
	const [form] = Form.useForm();
	const { TextArea } = Input;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [address, setaddress] = useState("");
	const [typeOfTip, setTypeOfTip] = useState("");
	const [landmark, setlandmark] = useState("");
	const [yourMessage, setYourMessage] = useState("");
	const [pdfFile, setPdfFile] = useState(null);

	function validateEmail(email) {
		// Define the regular expression pattern for a valid email address
		var pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

		// Use the test() method to check if the email matches the pattern
		return pattern.test(email);
	}

	const submitOnClick = async () => {
		if (
			address == "" ||
			typeOfTip == "" ||
			yourMessage == "" ||
			landmark == "" ||
			pdfFile == null
		) {
			toast.error("Enter all mandatory Fields");
		} else {
			if (!validateEmail(email)) {
				toast.error("Invalid Email!");
				return;
			}
			try {
				// Send a POST request to the backend
				const response = await axios.post("http://localhost:8080/submit-tip", {
					name,
					email,
					mobileNumber,
					address,
					typeOfTip,
					landmark,
					yourMessage
				});

				console.log(response.data); // Log the response from the backend
				if (response.data.success == true) {
					toast.success("Tip Submitted");
					form.resetFields();
				}
			} catch (error) {
				console.error("Error submitting form:", error);
			}
		}
	};

	return (
		<div className="form">
			<Toaster></Toaster>
			<div style={{ marginTop: "40px" }}></div>
			<Divider orientation="center">
				<span className="dividertext">
					Voice Against Drugs <br /> போதைப்பொருளுக்கு எதிரான குரல்
				</span>{" "}
			</Divider>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Alert
					message="Note"
					type="info"
					description="Portal for empowering citizens to anonymously report drug sale, trafficking, abuse, and illicit cultivation. The user-friendly interface ensures a seamless and confidential reporting process, contributing to a safer and healthier society. Together, we can make a difference in the fight against substance abuse. போதைப்பொருள் விற்பனை, கடத்தல், துஷ்பிரயோகம் மற்றும் சட்டவிரோத சாகுபடி குறித்து அநாமதேயமாக இந்த போர்டல் வாயிலாக புகாரளிக்கலாம். இதன்முலமாக பாதுகாப்பான மற்றும் ஆரோக்கியமான சமூகத்திற்கு பங்களித்து போதைப்பொருள் துஸ்பிரயோகத்திற்கு எதிராக குரல்கொடுக்கலாம்."
					showIcon
					style={{ width: "90%" }}
				/>
			</div>

			<Divider orientation="center">
				<span className="dividertext">Submit a Tip</span>{" "}
			</Divider>
			<div style={{ marginTop: "10px" }}></div>
			<div className="doc-input">
				<div className="addinuser">
					<div className="inputele">
						<Form
							form={form}
							layout="vertical"
							onFinish={null}
							autoComplete="off"
						>
							<Row gutter={[32, 16]}>
								<Col md={12} xs={24}>
									<Form.Item label={"Name/பெயர் (optional)"} name={"Name"}>
										<Input
											onChange={(e) => {
												setName(e.target.value);
											}}
											size="large"
											style={{ width: "100%" }}
											placeholder="Name"
											onKeyPress={(event) => {
												if (!/[a-zA-Z\s]/.test(event.key)) {
													event.preventDefault();
												}
											}}
										></Input>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Email Id/மின்னஞ்சல் முகவரி (optional)"}
										name={"Email_id"}
									>
										<Input
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											size="large"
											style={{ width: "100%" }}
											placeholder="Email Id"
										></Input>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Mobile Number/கைபேசி எண் (optional)"}
										name={"Mobile_number"}
									>
										<Space.Compact style={{ width: "100%" }}>
											<Input
												onKeyPress={(event) => {
													if (!/[0-9]/.test(event.key)) {
														event.preventDefault();
													}
												}}
												onChange={(e) => {
													setMobileNumber(e.target.value);
												}}
												prefix="+91"
												size="large"
												style={{ width: "100%" }}
												placeholder="10-digit mobile Number"
												maxLength={10}
											></Input>
										</Space.Compact>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Address of the Incident/சம்பவத்தின் முகவரி"}
										name={"address"}
										rules={[{ required: true }]}
									>
										<Space.Compact style={{ width: "100%" }}>
											<Input
												onChange={(e) => {
													setaddress(e.target.value);
												}}
												style={{ width: "100%" }}
												placeholder="Complete Address"
												size="large"
											></Input>
										</Space.Compact>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Type of Tip/குறிப்பு வகை"}
										name={"Type of Tip"}
										rules={[{ required: true }]}
									>
										<Select
											size="large"
											onChange={(e) => {
												// setCourse(e);
												setTypeOfTip(e);
											}}
											placeholder="Choose a type"
										>
											<Select.Option value={"Drug Sale/Trafficking/Peddling"}>
												Drug Sale/Trafficking/Peddling
											</Select.Option>
											<Select.Option value={"Drugs Abuse/Consumption"}>
												Drugs Abuse/Consumption
											</Select.Option>
											<Select.Option value={"Ilicit Cultivation"}>
												Ilicit Cultivation
											</Select.Option>
										</Select>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Landmark of the Incident/சம்பவ இட அடையாளம்"}
										name={"landmark"}
										rules={[{ required: true }]}
									>
										<Space.Compact style={{ width: "100%" }}>
											<Input
												onChange={(e) => {
													setlandmark(e.target.value);
													// setDocphone(e.target.value);
												}}
												style={{ width: "100%" }}
												placeholder="Landmark"
												size="large"
											></Input>
										</Space.Compact>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={"Your Message/உங்கள் தகவல்"}
										name={"Your Message"}
										required
									>
										<TextArea
											onChange={(e) => {
												// setSummary(e.target.value);
												setYourMessage(e.target.value);
											}}
											placeholder="Your Message"
											autoSize={{ minRows: 3, maxRows: 5 }}
											size="large"
										/>
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label={
											<p>
												<span style={{ color: "red" }}> *</span> Upload Any
												Supporting Document/ துணை ஆவணங்களைப் பதிவேற்றவும்
											</p>
										}
										valuePropName="Upload Any Supporting Document"
										name={"Certicate File"}
									>
										<Upload
											maxCount={2}
											beforeUpload={(file) => {
												const selectedFile = file;
												setPdfFile(selectedFile);
												return false;
											}}
											accept="application/pdf"
											listType="picture-card"
										>
											<div>
												<PlusOutlined />
												<div
													style={{
														marginTop: 8
													}}
												>
													Upload
												</div>
											</div>
										</Upload>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item>
								<div className="addindibtn">
									<Button
										htmlType="reset"
										onClick={() => {
											setPdfFile(null);
										}}
									>
										Reset
									</Button>
									<div style={{ width: "10px" }}></div>
									<Button
										htmlType="submit"
										type="primary"
										onClick={() => {
											submitOnClick();
										}}
									>
										Submit Tip
									</Button>
								</div>
							</Form.Item>
						</Form>
					</div>
				</div>
			</div>
			<div style={{ marginTop: "30px" }}></div>
		</div>
	);
}

export default App;