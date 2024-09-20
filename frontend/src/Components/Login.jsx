import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { adminLogin } from "../Services/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLogin({ name, password });
      if (response.data.accessToken) {
        toast.success("Successfully logged");
        localStorage.setItem("token", response.data.accessToken);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Admin Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome back! Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Admin Name
            </Typography>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button onClick={handleSubmit} className="mt-6" fullWidth>
            sign up
          </Button>
        </form>
      </Card>
    </div>
  );
}
