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
	Upload,
	Alert,
	Modal
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import {
	GoogleMap,
	MarkerF,
	useLoadScript,
	useJsApiLoader,
	Autocomplete
} from "@react-google-maps/api";
import ReCAPTCHA from "react-google-recaptcha";

const libraries = ["places"];

function App() {
	const [form] = Form.useForm();
	const { TextArea } = Input;
	const BASE_URL = import.meta.env.VITE_BASE_URL;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [address, setaddress] = useState("");
	const [typeOfTip, setTypeOfTip] = useState("");
	const [landmark, setlandmark] = useState("");
	const [yourMessage, setYourMessage] = useState("");
	const [pdfFile, setPdfFile] = useState(null);
	const [position, setPosition] = useState({ lat: 13.067439, lng: 80.237617 });
	const [autocomplete, setAutocomplete] = useState(null);
	const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
	const [captchaValue, setcaptchaValue] = useState("");
	const [submitButtonLoading, setSubmitButtonLoading] = useState(false);

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
			if (email && !validateEmail(email)) {
				toast.error("Invalid Email!");
				return;
			}
			if (position.lat == 13.067439 && position.lng == 80.237617) {
				toast.error("Mark the Coordinates");
				return;
			}
			if (!isCaptchaVerified) {
				toast.error("Please Verify Captcha");
				return;
			}

			setSubmitButtonLoading(true);

			// const fileLink = await S3FileUploader();

			try {
				const formData = new FormData();
				formData.append("file", pdfFile);
				formData.append("name", name);
				formData.append("email", email);
				formData.append("mobileNumber", mobileNumber);
				formData.append("address", address);
				formData.append("typeOfTip", typeOfTip);
				formData.append("landmark", landmark);
				formData.append("yourMessage", yourMessage);
				formData.append("captchaValue", captchaValue);
				formData.append("lat", position.lat);
				formData.append("lng", position.lng);

				// console.log(position);
				// return;
				// Send a POST request to the backend
				const response = await axios.post(`${BASE_URL}/submit-tip`, formData);

				console.log(response.data); // Log the response from the backend
				if (response.data.success == true) {
					setSubmitButtonLoading(false);
					successModel(response.data.ref_no);
					form.resetFields();
				}
			} catch (error) {
				console.error("Error submitting form:", error);
			}
		}
	};

	const handleDragEnd = (e) => {
		const { latLng } = e;
		setPosition({
			lat: latLng.lat(),
			lng: latLng.lng()
		});
		console.log(position);
	};

	const handlePlaceSelect = (e) => {
		console.log(e);
		if (autocomplete !== null) {
			const place = autocomplete.getPlace();
			setaddress(place.name + place.formatted_address);
			const { geometry } = place;

			if (geometry && geometry.location) {
				const { lat, lng } = geometry.location.toJSON();
				console.log("Latitude:", lat);
				console.log("Longitude:", lng);
				setPosition({
					lat: lat,
					lng: lng
				});
				// Do something with lat and lng, like updating state or making an API call
			}
		}
	};

	const handleCaptchaChange = (value) => {
		// This callback will be called when the user completes the reCAPTCHA challenge
		// console.log("Captcha value:", value);
		setcaptchaValue(value);
		setIsCaptchaVerified(true);
	};

	const successModel = (ref_no) => {
		Modal.success({
			title: "Tip has been Recorded",
			content: <span>Thank you for submitting the tip. Ref id: {ref_no}</span>
		});
	};

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
		libraries
	});

	if (loadError) {
		return <div>Error loading maps</div>;
	}

	if (!isLoaded) {
		return <div>Loading maps</div>;
	}

	return (
		<div className="form">
			<Toaster></Toaster>
			<div style={{ marginTop: "20px" }}></div>
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
										label={
											<p>
												<span style={{ color: "red" }}> *</span> Address of the
												Incident/சம்பவத்தின் முகவரி
											</p>
										}
										// label={"Address of the Incident/சம்பவத்தின் முகவரி"}
										name={"address"}
										// rules={[{ required: true }]}
									>
										<Autocomplete
											onLoad={(autocomplete) => setAutocomplete(autocomplete)}
											onPlaceChanged={handlePlaceSelect}
										>
											<input
												type="text"
												placeholder="Complete Address"
												className="ant-input-custom"
												style={{ width: "100%" }}
												onChange={(e) => {
													console.log(e);
													setaddress(e.target.value);
												}}
												// value={address}
												// onBlur={() => {
												// 	console.log(autocomplete.getPlace());
												// 	// If the user didn't select from the autocomplete dropdown, clear the address
												// 	// if (!autocomplete.getPlace().formatted_address) {
												// 	// 	setaddress("");
												// 	// }
												// }}
											/>
										</Autocomplete>
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
											maxCount={1}
											beforeUpload={(file) => {
												const selectedFile = file;
												console.log(file);
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
								<Col md={12} xs={24}>
									<p style={{ marginBottom: "10px" }}>
										<span style={{ color: "red" }}> *</span> Mark Coordinates of
										the incident(Drag the Pin to mark)/சம்பவத்தின் ஆயங்களைக்
										குறிக்கவும்(குறியிட பின்னை இழுக்கவும்)
									</p>

									<GoogleMap
										mapContainerStyle={{ width: "100%", height: "300px" }}
										center={position}
										zoom={18}
									>
										{" "}
										<MarkerF
											draggable={true}
											onDragEnd={handleDragEnd}
											position={position}
										/>
									</GoogleMap>
								</Col>
								<Col md={12} xs={24}>
									<div
										style={{
											display: "flex",
											alignItems: "flex-end",
											justifyContent: "center",
											height: "100%"
										}}
									>
										<ReCAPTCHA
											sitekey="6LcpSj8pAAAAAEHX5mgsbOzhpSrDxQ6kIf1Yg8YU"
											onChange={handleCaptchaChange}
										/>
									</div>
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
										loading={submitButtonLoading}
										onClick={() => {
											submitOnClick();
											// setPosition({ lat: 11.026844, lng: 76.954833 });
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
